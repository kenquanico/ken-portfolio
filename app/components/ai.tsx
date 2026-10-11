"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string; error?: boolean };

const MESSAGE_LIMIT = 3;
const MAX_CHARS = 300;
const STORAGE_KEY = "quanai-chat-v2"; // bumped so old saved chats (no date) are discarded
const GREETING =
    "Hi, I'm QuanAI, Ken's portfolio assistant. Ask me about his projects, stack, or experience. You have 3 questions per day.";
const SUGGESTIONS = ["What's Ken's tech stack?", "Show me his best projects", "Is Ken available for hire?"];

// Dev switch: set NEXT_PUBLIC_QUANAI_DEV=true in .env.local to remove the limit.
const DEV = process.env.NEXT_PUBLIC_QUANAI_DEV === "true";

const ICONS = {
    light: "/images/KENAI%20-%20LIGHT.png",
    dark: "/images/KENAI%20-%20DARK.png",
};

// Visitor's LOCAL calendar day, e.g. "2026-10-11". Changes at their local 12:00 AM.
function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function msUntilLocalMidnight() {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    return next.getTime() - now.getTime();
}

export default function QuanAIChat() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: GREETING }]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [used, setUsed] = useState(0);
    const [ready, setReady] = useState(false);
    const endRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dayRef = useRef<string>("");

    const left = DEV ? Infinity : MESSAGE_LIMIT - used;
    const icon = ICONS[theme];

    function resetChat() {
        setMessages([{ role: "assistant", content: GREETING }]);
        setUsed(0);
        setInput("");
    }

    useEffect(() => {
        const root = document.documentElement;
        const read = () => setTheme(root.dataset.theme === "dark" ? "dark" : "light");
        read();
        const observer = new MutationObserver(read);
        observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    // Restore saved chat ONLY if it was saved today (visitor's local date).
    useEffect(() => {
        dayRef.current = todayKey();
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const saved = JSON.parse(raw) as { day?: string; messages?: ChatMessage[]; used?: number };
                if (saved.day === dayRef.current) {
                    if (Array.isArray(saved.messages) && saved.messages.length) setMessages(saved.messages);
                    if (typeof saved.used === "number") setUsed(Math.min(Math.max(saved.used, 0), MESSAGE_LIMIT));
                } else {
                    window.localStorage.removeItem(STORAGE_KEY);
                }
            }
        } catch {
            /* ignore */
        }
        setReady(true);
    }, []);

    // Reset at the visitor's local midnight (even if the tab stays open),
    // and re-check when they return to the tab (timers pause when asleep/backgrounded).
    useEffect(() => {
        if (!ready) return;
        let timer: number;

        const check = () => {
            const today = todayKey();
            if (today !== dayRef.current) {
                dayRef.current = today;
                resetChat();
            }
        };
        const arm = () => {
            timer = window.setTimeout(() => {
                check();
                arm();
            }, msUntilLocalMidnight() + 1000);
        };
        const onVisible = () => {
            if (document.visibilityState === "visible") check();
        };

        arm();
        document.addEventListener("visibilitychange", onVisible);
        window.addEventListener("focus", check);
        return () => {
            window.clearTimeout(timer);
            document.removeEventListener("visibilitychange", onVisible);
            window.removeEventListener("focus", check);
        };
    }, [ready]);

    useEffect(() => {
        if (!ready) return;
        try {
            window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ day: dayRef.current, messages: messages.filter((m) => !m.error), used }),
            );
        } catch {
            /* ignore */
        }
    }, [messages, used, ready]);

    useEffect(() => {
        if (open) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, loading, open]);

    useEffect(() => {
        if (!open) return;
        const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => {
            window.clearTimeout(timer);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    async function send(text: string) {
        const content = text.trim().slice(0, MAX_CHARS);
        if (!content || loading || (!DEV && used >= MESSAGE_LIMIT)) return;

        const before = messages;
        const history: ChatMessage[] = [...before, { role: "user", content }];
        setMessages(history);
        setInput("");
        setLoading(true);
        setUsed((n) => n + 1);

        const fail = (message: string, limitReached = false) => {
            setUsed(limitReached ? MESSAGE_LIMIT : (n) => Math.max(0, n - 1));
            setMessages([...before, { role: "assistant", content: message, error: true }]);
            setInput(content);
        };

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: history
                        .filter((m) => !m.error && m.content !== GREETING)
                        .map(({ role, content: c }) => ({ role, content: c })),
                }),
            });
            const data = await res.json().catch(() => ({}));

            if (res.status === 429) {
                fail("The chat limit has been reached. Please email Ken directly.", true);
            } else if (!res.ok || !data.reply) {
                fail("Something went wrong on my end. Please try again in a moment.");
            } else {
                setMessages([...history, { role: "assistant", content: data.reply }]);
            }
        } catch {
            fail("I couldn't connect. Check your internet and try again.");
        } finally {
            setLoading(false);
        }
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        void send(input);
    }
    return (
        <div className={`quanai${open ? " is-open" : ""}`}>
            {open && (
                <section className="quanai-panel" role="dialog" aria-label="Chat with QuanAI">
                    <header className="quanai-head">
                        <img className="quanai-avatar" src={icon} alt="" />
                        <div className="quanai-head-copy">
                            <p>QuanAI</p>
                        </div>
                        <span className="quanai-counter" title="Questions remaining">
    {DEV ? "DEV ∞" : `${Math.max(left, 0)}/${MESSAGE_LIMIT} left`}
</span>
                        {DEV && (
                            <button type="button" className="quanai-close" aria-label="Reset chat (dev)" onClick={resetChat} title="Reset chat (dev)">
                                ↺
                            </button>
                        )}
                        <button className="quanai-close" type="button" aria-label="Close chat" onClick={() => setOpen(false)}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 6l12 12M18 6 6 18" />
                            </svg>
                        </button>
                    </header>

                    <div className="quanai-body" aria-live="polite">
                        {messages.map((message, index) => (
                            <div
                                className={`quanai-msg is-${message.role}${message.error ? " is-error" : ""}`}
                                key={`${index}-${message.role}`}
                            >
                                {message.content}
                            </div>
                        ))}

                        {loading && (
                            <div className="quanai-msg is-assistant quanai-typing" aria-label="QuanAI is typing">
                                <span />
                                <span />
                                <span />
                            </div>
                        )}

                        {messages.length === 1 && left > 0 && !loading && (
                            <div className="quanai-suggestions">
                                {SUGGESTIONS.map((suggestion) => (
                                    <button type="button" key={suggestion} onClick={() => void send(suggestion)}>
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>

                    {left <= 0 ? (
                        <div className="quanai-limit">
                            <p>You&apos;ve used all {MESSAGE_LIMIT} questions for today.</p>
                            <a href="mailto:nekquanico@gmail.com">Email Ken instead ↗</a>
                        </div>
                    ) : (
                        <form className="quanai-form" onSubmit={onSubmit}>
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                maxLength={MAX_CHARS}
                                placeholder={"Ask about Ken's work…"}
                                aria-label="Type your question"
                                autoComplete="off"
                                disabled={loading}
                            />
                            <button type="submit" aria-label="Send message" disabled={!input.trim() || loading}>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </button>
                        </form>
                    )}
                    <p className="quanai-foot">
                        AI can make mistakes. {DEV ? "Dev mode: no limit." : `Limited to ${MESSAGE_LIMIT} questions per day.`}
                    </p>                </section>
            )}

            <button
                className="quanai-launcher"
                type="button"
                aria-label={open ? "Close QuanAI chat" : "Open QuanAI chat"}
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
            >
                {open ? (
                    <svg className="quanai-launcher-x" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                ) : (
                    <>
                        <img src={icon} alt="" />
                        <span className="quanai-tip">Ask QuanAI</span>
                    </>
                )}
            </button>
        </div>
    );
}