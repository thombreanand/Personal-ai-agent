"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Operation = "greeting" | "calculator" | "datetime";

const operations: {
  id: Operation;
  name: string;
  description: string;
  icon: string;
  action: string;
}[] = [
  {
    id: "greeting",
    name: "Greeting",
    description: "Get a friendly welcome",
    icon: "✳",
    action: "SAY HELLO",
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Solve a quick calculation",
    icon: "＋",
    action: "DO THE MATH",
  },
  {
    id: "datetime",
    name: "Date & time",
    description: "Check your local date and time",
    icon: "◷",
    action: "CHECK THE CLOCK",
  },
];

export default function Home() {
  const [activeOperation, setActiveOperation] =
    useState<Operation>("greeting");
  const [firstNumber, setFirstNumber] = useState("");
  const [operator, setOperator] = useState("+");
  const [secondNumber, setSecondNumber] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  function chooseOperation(operation: Operation) {
    setActiveOperation(operation);
    setResult("");
    setError("");
  }

  function runOperation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (activeOperation === "greeting") {
      setResult("Hello! Welcome to your Personal AI Assistant.");
      return;
    }

    if (activeOperation === "datetime") {
      const now = new Date();
      const date = `${String(now.getDate()).padStart(2, "0")}-${String(
        now.getMonth() + 1,
      ).padStart(2, "0")}-${now.getFullYear()}`;
      const time = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(now);
      setResult(`${date} ${time}`);
      return;
    }

    const first = Number(firstNumber);
    const second = Number(secondNumber);
    if (
      firstNumber.trim() === "" ||
      secondNumber.trim() === "" ||
      !Number.isFinite(first) ||
      !Number.isFinite(second)
    ) {
      setError("Enter a valid number in both fields.");
      return;
    }
    if (operator === "/" && second === 0) {
      setError("Cannot divide by zero.");
      return;
    }

    const answer =
      operator === "+"
        ? first + second
        : operator === "-"
          ? first - second
          : operator === "*"
            ? first * second
            : first / second;
    setResult(String(answer));
  }

  const selectedOperation = operations.find(
    (operation) => operation.id === activeOperation,
  );

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Personal AI home">
          <span className="brand-mark">✳</span>
          <span>
            <strong>pocket</strong>
            <span className="brand-subtitle">PERSONAL AI</span>
          </span>
        </a>

        <div className="sidebar-label">WORKSPACE</div>
        <button className="workspace-button" type="button">
          <span className="workspace-icon">P</span>
          <span className="workspace-name">My assistant</span>
          <span className="workspace-chevron">⌄</span>
        </button>

        <div className="sidebar-label tools-label">YOUR TOOLS</div>
        <nav className="operation-nav" aria-label="Assistant operations">
          {operations.map((operation) => (
            <button
              className={`nav-item ${activeOperation === operation.id ? "active" : ""}`}
              key={operation.id}
              onClick={() => chooseOperation(operation.id)}
              type="button"
              aria-current={
                activeOperation === operation.id ? "page" : undefined
              }
            >
              <span className="nav-icon">{operation.icon}</span>
              <span>{operation.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="status-dot" />
          <span>All systems ready</span>
          <span className="status-indicator" />
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-divider">/</span>
            <strong>{selectedOperation?.name}</strong>
          </div>
          <div className="profile">
            <span className="profile-greeting">Your personal workspace</span>
            <span className="profile-avatar">P</span>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              A LITTLE HELP, RIGHT WHEN YOU NEED IT
            </div>
            <h1>
              Your day,
              <br />
              <span>made simpler.</span>
            </h1>
            <p className="intro">
              Small, useful tools for the little things. What can I help you
              with?
            </p>
          </div>

          <section className="tools-section" aria-labelledby="tools-heading">
            <div className="section-heading">
              <div>
                <h2 id="tools-heading">Your tools</h2>
                <p>Pick a tool and let&apos;s get it done.</p>
              </div>
              <span className="tool-count">03 AVAILABLE</span>
            </div>

            <div className="tool-grid">
              {operations.map((operation) => (
                <button
                  className={`tool-card ${activeOperation === operation.id ? "selected" : ""}`}
                  key={operation.id}
                  onClick={() => chooseOperation(operation.id)}
                  type="button"
                  aria-pressed={activeOperation === operation.id}
                >
                  <span className={`tool-icon icon-${operation.id}`}>
                    {operation.icon}
                  </span>
                  <span className="tool-card-title">{operation.name}</span>
                  <span className="tool-card-description">
                    {operation.description}
                  </span>
                  <span className="tool-card-bottom">
                    <span>{operation.action}</span>
                    <span className="card-arrow">↗</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="action-panel" aria-labelledby="action-heading">
            <div className="action-copy">
              <span className="action-kicker">READY WHEN YOU ARE</span>
              <h2 id="action-heading">
                {activeOperation === "greeting"
                  ? "Let’s start with a hello."
                  : activeOperation === "calculator"
                    ? "What are we calculating?"
                    : "A moment, right now."}
              </h2>
              <p>
                {activeOperation === "greeting"
                  ? "One click is all it takes. Your assistant is right here."
                  : activeOperation === "calculator"
                    ? "Enter two numbers and choose how you’d like to combine them."
                    : "Get the current date and time in your local timezone."}
              </p>
            </div>

            <form className="operation-form" onSubmit={runOperation}>
              {activeOperation === "calculator" ? (
                <div className="calculator-fields">
                  <label>
                    <span>FIRST NUMBER</span>
                    <input
                      aria-label="First number"
                      inputMode="decimal"
                      onChange={(event) => setFirstNumber(event.target.value)}
                      placeholder="e.g. 24"
                      type="number"
                      value={firstNumber}
                    />
                  </label>
                  <label className="operator-field">
                    <span>OPERATION</span>
                    <select
                      aria-label="Operation"
                      onChange={(event) => setOperator(event.target.value)}
                      value={operator}
                    >
                      <option value="+">＋ Add</option>
                      <option value="-">− Subtract</option>
                      <option value="*">× Multiply</option>
                      <option value="/">÷ Divide</option>
                    </select>
                  </label>
                  <label>
                    <span>SECOND NUMBER</span>
                    <input
                      aria-label="Second number"
                      inputMode="decimal"
                      onChange={(event) => setSecondNumber(event.target.value)}
                      placeholder="e.g. 8"
                      type="number"
                      value={secondNumber}
                    />
                  </label>
                </div>
              ) : null}
              <button className="run-button" type="submit">
                {activeOperation === "greeting"
                  ? "Say hello"
                  : activeOperation === "calculator"
                    ? "Calculate"
                    : "Get date & time"}
                <span aria-hidden="true">→</span>
              </button>
              {error ? (
                <p className="form-message error-message" role="alert">
                  {error}
                </p>
              ) : null}
              {result ? (
                <div className="result-box" aria-live="polite">
                  <span className="result-check">✓</span>
                  <div>
                    <span className="result-label">YOUR RESULT</span>
                    <p>{result}</p>
                  </div>
                </div>
              ) : null}
            </form>
          </section>

          <footer className="page-footer">
            <span>MADE FOR THE MOMENTS IN BETWEEN.</span>
            <span>
              SIMPLE TOOLS <span className="footer-spark">✳</span> A CALMER DAY
            </span>
          </footer>
        </div>
      </section>
    </main>
  );
}
