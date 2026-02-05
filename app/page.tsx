"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { problems } from "@/lib/problems"

export default function Home() {
  const [code, setCode] = useState("")
  const [explanation, setExplanation] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [loadingStage, setLoadingStage] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [selectedProblemId, setSelectedProblemId] = useState(problems[0].id)

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "csharp", label: "C#" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
  ]

  const evaluate = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    const stages = [
      "Reviewing correctness…",
      "Checking time complexity…",
      "Evaluating explanation…",
      "Finalizing decision…",
    ]

    let stageIndex = 0
    setLoadingStage(stages[stageIndex])

    const interval = setInterval(() => {
      stageIndex++
      if (stageIndex < stages.length) {
        setLoadingStage(stages[stageIndex])
      }
    }, 900)

    try {
      const selectedProblem = problems.find((p) => p.id === selectedProblemId)
      if (!selectedProblem) throw new Error("Problem not found")

      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: selectedProblem.description,
          code,
          explanation,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")

      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      clearInterval(interval)
      setLoading(false)
      setLoadingStage("")
    }
  }

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "40px 20px",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          padding: 40,
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: 8,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          DSA Judge
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: 32 }}>
          Get instant feedback on your coding solutions
        </p>

        <section style={{ marginBottom: 24 }}>
          <label
            style={{
              display: "block",
              fontSize: "1.1rem",
              fontWeight: 600,
              marginBottom: 12,
              color: "#1e293b",
            }}
          >
            Select Problem
          </label>
          <select
            value={selectedProblemId}
            onChange={(e) => {
              setSelectedProblemId(e.target.value)
              setCode("")
              setExplanation("")
              setResult(null)
            }}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 8,
              border: "2px solid #e2e8f0",
              background: loading ? "#f8fafc" : "#ffffff",
              color: "#1e293b",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              outline: "none",
            }}
            onFocus={(e) => {
              if (!loading) e.target.style.borderColor = "#667eea"
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0"
            }}
          >
            {Array.from(new Set(problems.map((p) => p.topic))).map((topic) => (
              <optgroup key={topic} label={topic}>
                {problems
                  .filter((p) => p.topic === topic)
                  .map((problem) => (
                    <option key={problem.id} value={problem.id}>
                      {problem.title}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </section>

        <section
          style={{
            background: "#f8fafc",
            borderRadius: 12,
            padding: 24,
            marginBottom: 32,
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#1e293b",
                margin: 0,
              }}
            >
              Problem Statement
            </h3>
            {problems.find((p) => p.id === selectedProblemId)?.topic && (
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {problems.find((p) => p.id === selectedProblemId)?.topic}
              </span>
            )}
          </div>
          <pre
            style={{
              background: "#ffffff",
              padding: 20,
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              overflowX: "auto",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#334155",
              whiteSpace: "pre-wrap",
              fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
            }}
          >
            {problems.find((p) => p.id === selectedProblemId)?.description}
          </pre>
        </section>

        <section style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <label
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              Your Code Solution
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={loading}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "2px solid #e2e8f0",
                background: loading ? "#f8fafc" : "#ffffff",
                color: "#1e293b",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                outline: "none",
              }}
              onFocus={(e) => {
                if (!loading) e.target.style.borderColor = "#667eea"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0"
              }}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              border: "2px solid #e2e8f0",
              borderRadius: 8,
              overflow: "hidden",
              background: loading ? "#f8fafc" : "#ffffff",
              opacity: loading ? 0.7 : 1,
            }}
          >
            <Editor
              height="400px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: loading,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                padding: { top: 16, bottom: 16 },
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                formatOnPaste: true,
                formatOnType: true,
              }}
            />
          </div>
        </section>

        <section style={{ marginBottom: 32 }}>
          <label
            style={{
              display: "block",
              fontSize: "1.1rem",
              fontWeight: 600,
              marginBottom: 12,
              color: "#1e293b",
            }}
          >
            Your Explanation <span style={{ fontWeight: 400, color: "#64748b" }}>(optional)</span>
          </label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            disabled={loading}
            rows={5}
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 8,
              border: "2px solid #e2e8f0",
              fontSize: "0.95rem",
              resize: "vertical",
              transition: "all 0.2s",
              background: loading ? "#f8fafc" : "#ffffff",
              color: loading ? "#94a3b8" : "#1e293b",
            }}
            placeholder="Explain your approach, time complexity, and space complexity..."
            onFocus={(e) => {
              if (!loading) e.target.style.borderColor = "#667eea"
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0"
            }}
          />
        </section>

        <button
          onClick={evaluate}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 24px",
            borderRadius: 8,
            border: "none",
            background: loading
              ? "#94a3b8"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            boxShadow: loading
              ? "none"
              : "0 4px 6px -1px rgba(102, 126, 234, 0.3), 0 2px 4px -1px rgba(102, 126, 234, 0.2)",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = "translateY(-1px)"
              e.currentTarget.style.boxShadow =
                "0 10px 15px -3px rgba(102, 126, 234, 0.3), 0 4px 6px -2px rgba(102, 126, 234, 0.2)"
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow =
                "0 4px 6px -1px rgba(102, 126, 234, 0.3), 0 2px 4px -1px rgba(102, 126, 234, 0.2)"
            }
          }}
        >
          {loading ? "Interview in progress…" : "Evaluate Solution"}
        </button>

        {loading && (
          <div
            style={{
              marginTop: 20,
              textAlign: "center",
              padding: 16,
              background: "#f1f5f9",
              borderRadius: 8,
            }}
          >
            <p
              style={{
                fontStyle: "italic",
                color: "#475569",
                fontSize: "0.95rem",
                margin: 0,
              }}
            >
              {loadingStage}
            </p>
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: 24,
              padding: 16,
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 8,
              color: "#dc2626",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: 32,
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              padding: 32,
              border: `2px solid ${result.verdict === "Hire" ? "#10b981" : "#ef4444"}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
                paddingBottom: 24,
                borderBottom: "2px solid #e2e8f0",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "#1e293b",
                  }}
                >
                  Verdict
                </h2>
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    background:
                      result.verdict === "Hire"
                        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                        : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "#ffffff",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {result.verdict}
                </span>
              </div>
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {result.score}/10
                </div>
                <div style={{ color: "#64748b", fontSize: "0.9rem" }}>Score</div>
              </div>
            </div>

            {result.strengths?.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: 12,
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>✓</span> Strengths
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {result.strengths.map((s: string, i: number) => (
                    <li
                      key={i}
                      style={{
                        padding: "12px 16px",
                        marginBottom: 8,
                        background: "#f0fdf4",
                        borderLeft: "4px solid #10b981",
                        borderRadius: 6,
                        color: "#166534",
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.weaknesses?.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: 12,
                    color: "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>⚠</span> Weaknesses
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {result.weaknesses.map((w: string, i: number) => (
                    <li
                      key={i}
                      style={{
                        padding: "12px 16px",
                        marginBottom: 8,
                        background: "#fef2f2",
                        borderLeft: "4px solid #ef4444",
                        borderRadius: 6,
                        color: "#991b1b",
                      }}
                    >
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.improvements?.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: 12,
                    color: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>💡</span> Improvements
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {result.improvements.map((imp: string, i: number) => (
                    <li
                      key={i}
                      style={{
                        padding: "12px 16px",
                        marginBottom: 8,
                        background: "#eff6ff",
                        borderLeft: "4px solid #3b82f6",
                        borderRadius: 6,
                        color: "#1e40af",
                      }}
                    >
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              style={{
                padding: 20,
                background: "#f8fafc",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: 12,
                  color: "#1e293b",
                }}
              >
                Final Feedback
              </h3>
              <p
                style={{
                  color: "#475569",
                  lineHeight: 1.7,
                  margin: 0,
                  fontSize: "0.95rem",
                }}
              >
                {result.final_feedback}
              </p>
            </div>

            <button
              onClick={() => {
                setResult(null)
                setCode("")
                setExplanation("")
                setLanguage("javascript")
                setError("")
              }}
              style={{
                width: "100%",
                padding: "12px 24px",
                borderRadius: 8,
                border: "2px solid #e2e8f0",
                background: "#ffffff",
                color: "#475569",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#667eea"
                e.currentTarget.style.color = "#667eea"
                e.currentTarget.style.background = "#f8fafc"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0"
                e.currentTarget.style.color = "#475569"
                e.currentTarget.style.background = "#ffffff"
              }}
            >
              Try Another Solution
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

