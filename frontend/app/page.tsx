"use client";

import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Source = {
  id: number;
  title: string;
  source: string;
  distance: number;
};

type AskResponse = {
  question: string;
  answer: string;
  sources: Source[];
};

const quickQuestions = [
  "How do I troubleshoot a Kubernetes deployment?",
  "How do I troubleshoot a PostgreSQL database connection?",
  "What should I check when a deployment is unhealthy?",
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function askQuestion(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    setLoading(true);
    setAnswer("");
    setSources([]);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedQuestion,
        }),
      });

      if (!response.ok) {
        let message = `API request failed: ${response.status}`;

        try {
          const errorData = await response.json();

          if (errorData?.detail) {
            message = String(errorData.detail);
          }
        } catch {
          // Keep default error message.
        }

        throw new Error(message);
      }

      const data: AskResponse = await response.json();

      setAnswer(data.answer || "No answer was returned.");
      setSources(Array.isArray(data.sources) ? data.sources : []);
    } catch (err) {
      console.error("Ask request failed:", err);

      if (err instanceof TypeError) {
        setError(
          "Could not connect to the AI Operations API. Make sure FastAPI is running on port 8000."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while asking the assistant.");
      }
    } finally {
      setLoading(false);
    }
  }

  function useQuickQuestion(value: string) {
    setQuestion(value);
    setAnswer("");
    setSources([]);
    setError("");
  }

  function clearAll() {
    if (loading) {
      return;
    }

    setQuestion("");
    setAnswer("");
    setSources([]);
    setError("");
  }

  return (
    <main className="page">
      {/* Ambient background effects */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      <div className="container">
        {/* HEADER */}
        <header className="header">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div>
              <p className="eyebrow">AI OPERATIONS</p>
              <p className="brand-name">Knowledge Assistant</p>
            </div>
          </div>

          <div className="status">
            <span className="status-dot" />
            <span>Systems online</span>
          </div>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-label">
              <span>✦</span>
              Operational intelligence
            </div>

            <h1>
              Solve incidents
              <br />
              <span>with context.</span>
            </h1>

            <p className="subtitle">
              Ask questions about your operational knowledge base and get
              grounded answers from your internal runbooks.
            </p>

            <div className="hero-stats">
              <div>
                <strong>RAG</strong>
                <span>Grounded answers</span>
              </div>

              <div>
                <strong>LOCAL</strong>
                <span>AI infrastructure</span>
              </div>

              <div>
                <strong>FAST</strong>
                <span>Operational search</span>
              </div>
            </div>
          </div>

          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            <div className="orbit-core">
              <span>AI</span>
            </div>

            <span className="orbit-particle particle-one" />
            <span className="orbit-particle particle-two" />
            <span className="orbit-particle particle-three" />
          </div>
        </section>

        {/* ASK CARD */}
        <section className="card ask-card">
          <div className="card-topline">
            <div>
              <p className="section-label">ASK ASSISTANT</p>
              <h2>What are you troubleshooting?</h2>
            </div>

            <span className="rag-badge">
              <span className="badge-dot" />
              RAG ENABLED
            </span>
          </div>

          <form onSubmit={askQuestion}>
            <div className="input-shell">
              <textarea
                id="question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="e.g. How do I troubleshoot a Kubernetes deployment?"
                rows={5}
                disabled={loading}
              />

              <div className="input-footer">
                <span className="character-count">
                  {question.length > 0
                    ? `${question.length} characters`
                    : "Ask about Kubernetes, PostgreSQL, deployments..."}
                </span>

                <div className="input-actions">
                  {question && !loading && (
                    <button
                      type="button"
                      className="clear-button"
                      onClick={clearAll}
                    >
                      Clear
                    </button>
                  )}

                  <button
                    type="submit"
                    className="ask-button"
                    disabled={loading || !question.trim()}
                  >
                    {loading ? (
                      <>
                        <span className="spinner" />
                        Thinking
                      </>
                    ) : (
                      <>
                        Ask Assistant
                        <span className="arrow">→</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {loading && (
              <div className="loading-message">
                <span className="loading-pulse" />
                <span>
                  Searching the knowledge base and generating a grounded
                  answer...
                </span>
              </div>
            )}
          </form>

          {/* QUICK QUESTIONS */}
          <div className="quick-section">
            <span className="quick-label">TRY A QUESTION</span>

            <div className="quick-list">
              {quickQuestions.map((item) => (
                <button
                  type="button"
                  className="quick-button"
                  key={item}
                  onClick={() => useQuickQuestion(item)}
                  disabled={loading}
                >
                  <span>{item}</span>
                  <span className="quick-arrow">↗</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ERROR */}
        {error && (
          <section className="card error-card">
            <div className="answer-header">
              <div>
                <p className="section-label">SYSTEM MESSAGE</p>
                <h2>Something went wrong</h2>
              </div>

              <span className="badge error-badge">ERROR</span>
            </div>

            <p className="error-text">{error}</p>

            <button
              type="button"
              className="secondary-button"
              onClick={() => setError("")}
            >
              Dismiss
            </button>
          </section>
        )}

        {/* EMPTY STATE */}
        {!answer && !error && !loading && (
          <section className="empty-state">
            <div className="empty-icon">✦</div>

            <div>
              <p className="section-label">READY WHEN YOU ARE</p>

              <h2>Your operational knowledge, one question away.</h2>

              <p>
                The assistant searches your indexed knowledge base before
                generating an answer, helping keep responses grounded in your
                documented procedures.
              </p>
            </div>
          </section>
        )}

        {/* ANSWER */}
        {answer && (
          <section className="card answer-card">
            <div className="answer-header">
              <div>
                <p className="section-label">ASSISTANT RESPONSE</p>
                <h2>Recommended approach</h2>
              </div>

              <span className="badge">RAG</span>
            </div>

            <div className="answer markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {answer}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* SOURCES */}
        {sources.length > 0 && (
          <section className="sources-section">
            <div className="sources-heading">
              <div>
                <p className="section-label">KNOWLEDGE SOURCES</p>
                <h2>Grounded in your runbooks</h2>
              </div>

              <span className="source-count">
                {sources.length} source
                {sources.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="sources-list">
              {sources.map((source, index) => (
                <article
                  className="source-item"
                  key={`${source.id}-${source.title}`}
                >
                  <div className="source-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="source-content">
                    <h3>{source.title}</h3>
                    <p>{source.source}</p>
                  </div>

                  <div className="distance">
                    <span>Similarity</span>
                    <strong>{source.distance.toFixed(3)}</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer>
          <div className="tech-stack">
            <span>Next.js</span>
            <i>•</i>
            <span>FastAPI</span>
            <i>•</i>
            <span>PostgreSQL + pgvector</span>
            <i>•</i>
            <span>Ollama</span>
          </div>

          <span className="footer-status">
            <span className="status-dot" />
            Local AI infrastructure
          </span>
        </footer>
      </div>
    </main>
  );
}