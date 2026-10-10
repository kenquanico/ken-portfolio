"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string; error?: boolean };

const MESSAGE_LIMIT = 3;
const MAX_CHARS = 300;
const STORAGE_KEY = "quanai-chat-v1";
const GREETING =
    "Hi, I'm QuanAI, Ken's portfolio assistant. Ask me about his projects, stack, or experience. You have 3 questions.";
const SUGGESTIONS = ["What's Ken's tech stack?", "Show me his best projects", "Is Ken available for hire?"];

// Icon follows the site's light/dark MODE (not the icon's own colors).
const ICONS = {
    light: "/images/KENAI%20-%20LIGHT.png",
    dark: "/images/KENAI%20-%20DARK.png",
};

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

    const left = MESSAGE_LIMIT - used;
    const icon = ICONS[theme];

    // Follow the site's theme (your page sets data-theme on <html>).
    useEffect(() => {
        const root = document.documentElement;
        const read = () => setTheme(root.dataset.theme === "dark" ? "dark" : "light");
        read();
        const observer = new MutationObserver(read);
        observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    // Restore the saved chat so a refresh does not reset the 3-message limit.
    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const saved = JSON.parse(raw) as { messages?: ChatMessage[]; used?: number };
                if (Array.isArray(saved.messages) && saved.messages.length) setMessages(saved.messages);
                if (typeof saved.used === "number") setUsed(Math.min(Math.max(saved.used, 0), MESSAGE_LIMIT));
            }
        } catch {
            /* ignore */
        }
        setReady(true);
    }, []);

    useEffect(() => {
        if (!ready) return;
        try {
            window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ messages: messages.filter((m) => !m.error), used }),
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
        if (!content || loading || used >= MESSAGE_LIMIT) return;

        const before = messages;
        const history: ChatMessage[] = [...before, { role: "user", content }];
        setMessages(history);
        setInput("");
        setLoading(true);
        setUsed((n) => n + 1);

        const fail = (message: string, limitReached = false) => {
            // Failed requests do not count against the user's 3 messages.
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
                            <span>Ken&apos;s portfolio assistant</span>
                        </div>
                        <span className="quanai-counter" title="Questions remaining">
              {Math.max(left, 0)}/{MESSAGE_LIMIT} left
            </span>
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
                            <p>You&apos;ve used all {MESSAGE_LIMIT} questions.</p>
                            <a href="mailto:nekquanico@gmail.com">Email Ken instead ↗</a>
                        </div>
                    ) : (
                        <form className="quanai-form" onSubmit={onSubmit}>
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                maxLength={MAX_CHARS}
                                placeholder="Ask about Ken's work…"
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
                    <p className="quanai-foot">AI can make mistakes. Limited to {MESSAGE_LIMIT} questions.</p>
                </section>
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