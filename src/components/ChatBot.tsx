import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatBot.scss';
import { useTrackEvent } from '@/hooks/useApi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'What stack do you work with?',
  'Are you open to remote roles?',
  'What did you build at Cisco?',
  'What is your notice period?',
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm Dipanshu's portfolio assistant. Ask me anything about his experience, skills, or availability.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: trackEvent } = useTrackEvent();

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: text.trim() };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput('');
    setLoading(true);
    trackEvent({
      eventType: 'chatbot_question',
      payload: { question: text.trim() },
    });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            data.reply ?? 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Network error — please check your connection and try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const showSuggestions = messages.length === 1; // only after the initial greeting

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        className={`chatbot__trigger ${open ? 'chatbot__trigger--open' : ''}`}
        onClick={() => {
          setOpen((v) => !v);
          if (!open) trackEvent({ eventType: 'chatbot_open' });
        }}
        aria-label={open ? 'Close chat' : 'Ask me anything'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 4a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H6l-4 3V4z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 7h8M6 10.5h5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="chatbot__trigger-label">Ask me anything</span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot__panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* Header */}
            <div className="chatbot__header">
              <div className="chatbot__header-info">
                <span className="chatbot__header-led" aria-hidden />
                <div>
                  <div className="chatbot__header-name">
                    Portfolio Assistant
                  </div>
                  <div className="chatbot__header-sub">
                    Powered by Llama 3 · Groq
                  </div>
                </div>
              </div>
              <button
                className="chatbot__close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 2l10 10M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot__messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chatbot__msg chatbot__msg--${msg.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {msg.role === 'assistant' && (
                    <span className="chatbot__msg-avatar" aria-hidden>
                      Ds
                    </span>
                  )}
                  <div className="chatbot__msg-bubble">{msg.content}</div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  className="chatbot__msg chatbot__msg--assistant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="chatbot__msg-avatar" aria-hidden>
                    Ds
                  </span>
                  <div className="chatbot__msg-bubble chatbot__msg-bubble--typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </motion.div>
              )}

              {/* Suggested questions — only on first load */}
              {showSuggestions && !loading && (
                <div className="chatbot__suggestions">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      className="chatbot__suggestion"
                      onClick={() => sendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="chatbot__input-row">
              <input
                ref={inputRef}
                className="chatbot__input"
                type="text"
                placeholder="Ask about experience, skills, availability…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                maxLength={400}
              />
              <button
                className="chatbot__send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                aria-label="Send"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 8h12M10 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
