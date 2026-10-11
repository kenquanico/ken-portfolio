// Shared click-sound helper.
// Files live in /public/sounds and are served from /sounds/...
// Uses Web Audio (low latency) and falls back to a plain <audio> element if decoding fails.

export type SoundName = "general" | "aiOpen" | "aiClose";

const SOUND_FILES: Record<SoundName, string> = {
    general: "/sounds/general-click.mp4",
    aiOpen: "/sounds/ai-open-click.mp4",
    aiClose: "/sounds/ai-close-click.mp4",
};

const SOUND_KEY = "ken-portfolio-sound"; // same key the sound toggle already writes
const VOLUME = 0.8;

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

let context: AudioContext | null = null;
const buffers: Partial<Record<SoundName, AudioBuffer>> = {};
const pending: Partial<Record<SoundName, Promise<AudioBuffer | null>>> = {};

export function isSoundEnabled() {
    if (typeof window === "undefined") return false;
    try {
        return window.localStorage.getItem(SOUND_KEY) !== "off";
    } catch {
        return true;
    }
}

function getContext() {
    if (typeof window === "undefined") return null;
    if (context && context.state !== "closed") return context;

    const AudioContextClass = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AudioContextClass) return null;

    context = new AudioContextClass();
    return context;
}

function decode(ctx: AudioContext, data: ArrayBuffer) {
    return new Promise<AudioBuffer>((resolve, reject) => {
        // Callback form works on older Safari too.
        const result = ctx.decodeAudioData(data, resolve, reject);
        void result?.catch(() => undefined);
    });
}

function loadSound(name: SoundName): Promise<AudioBuffer | null> {
    const ctx = getContext();
    if (!ctx) return Promise.resolve(null);

    const cached = buffers[name];
    if (cached) return Promise.resolve(cached);

    const inFlight = pending[name];
    if (inFlight) return inFlight;

    const request = fetch(SOUND_FILES[name])
        .then((response) => {
            if (!response.ok) throw new Error(`Failed to load ${SOUND_FILES[name]}`);
            return response.arrayBuffer();
        })
        .then((data) => decode(ctx, data))
        .then((buffer) => {
            buffers[name] = buffer;
            return buffer;
        })
        .catch(() => {
            delete pending[name];
            return null;
        });

    pending[name] = request;
    return request;
}

function startBuffer(ctx: AudioContext, buffer: AudioBuffer) {
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.value = VOLUME;
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);
}

function playFallback(name: SoundName) {
    try {
        const audio = new Audio(SOUND_FILES[name]);
        audio.volume = VOLUME;
        void audio.play().catch(() => undefined);
    } catch {
        /* ignore */
    }
}

// Call on the first user gesture (needed by iOS / Safari / Chrome autoplay rules).
export function unlockSounds() {
    const ctx = getContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);
    (Object.keys(SOUND_FILES) as SoundName[]).forEach((name) => void loadSound(name));
}

export function playSound(name: SoundName) {
    if (!isSoundEnabled()) return;

    const ctx = getContext();
    if (!ctx) {
        playFallback(name);
        return;
    }

    if (ctx.state === "suspended") void ctx.resume().catch(() => undefined);

    const buffer = buffers[name];
    if (buffer) {
        startBuffer(ctx, buffer);
        return;
    }

    void loadSound(name).then((loaded) => {
        if (loaded) startBuffer(ctx, loaded);
        else playFallback(name);
    });
}