"use client"

import { useState, useEffect } from "react"
import Editor from "@monaco-editor/react"
import { problems as defaultProblems } from "@/lib/problems"

export default function Home() {
  const [code, setCode] = useState("")
  const [explanation, setExplanation] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [loadingStage, setLoadingStage] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownSearch, setDropdownSearch] = useState("")
  const [showPasteModal, setShowPasteModal] = useState(false)
  const [pastedProblem, setPastedProblem] = useState<{ title: string; description: string } | null>(null)

  const [selectedProblemId, setSelectedProblemId] = useState("")

  // Use only default problems
  const allProblems = defaultProblems

  // Handle paste problem
  const handlePasteProblem = () => {
    setShowPasteModal(true)
    setDropdownOpen(false)
  }

  const handleConfirmPaste = (title: string, description: string) => {
    if (!title.trim() || !description.trim()) {
      alert("Please provide both title and description")
      return
    }
    setPastedProblem({ title: title.trim(), description: description.trim() })
    setSelectedProblemId("pasted")
    setShowPasteModal(false)
    setCode("")
    setExplanation("")
    setResult(null)
  }

  // Get the current selected problem (either from list or pasted)
  const selectedProblem = selectedProblemId === "pasted" 
    ? pastedProblem 
    : allProblems.find((p) => p.id === selectedProblemId)

  // Filter problems based on search query (for dropdown)
  const filteredProblems = allProblems.filter((problem) => {
    if (!dropdownSearch) return true
    const query = dropdownSearch.toLowerCase()
    return (
      problem.title.toLowerCase().includes(query) ||
      problem.description.toLowerCase().includes(query) ||
      problem.topic?.toLowerCase().includes(query) ||
      problem.difficulty?.toLowerCase().includes(query)
    )
  })

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
      const currentProblem = selectedProblemId === "pasted" 
        ? pastedProblem 
        : allProblems.find((p) => p.id === selectedProblemId)
      
      if (!currentProblem) throw new Error("Problem not found")

      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: currentProblem.description,
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
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .two-column-layout {
            grid-template-columns: 1fr !important;
          }
          .sticky-problem {
            position: relative !important;
            top: 0 !important;
            max-height: none !important;
          }
        }
      `}} />
      <main
        style={{
          maxWidth: "100%",
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

          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => {
                if (!loading) {
                  setDropdownOpen(!dropdownOpen)
                  if (!dropdownOpen) {
                    setDropdownSearch("")
                  }
                }
              }}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 16px",
                paddingRight: "40px",
                borderRadius: 8,
                border: "2px solid #e2e8f0",
                background: loading ? "#f8fafc" : "#ffffff",
                color: selectedProblem ? "#1e293b" : "#94a3b8",
                fontSize: "1rem",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                outline: "none",
                textAlign: "left",
                position: "relative",
              }}
              onFocus={(e) => {
                if (!loading) e.currentTarget.style.borderColor = "#667eea"
              }}
              onBlur={(e) => {
                if (!dropdownOpen) e.currentTarget.style.borderColor = "#e2e8f0"
              }}
            >
              {selectedProblem ? (selectedProblemId === "pasted" ? pastedProblem?.title : selectedProblem.title) : "Select problem"}
              <span
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: `translateY(-50%) rotate(${dropdownOpen ? "180deg" : "0deg"})`,
                  transition: "transform 0.2s",
                  fontSize: "0.8rem",
                  color: "#64748b",
                }}
              >
                ▼
              </span>
            </button>

            {dropdownOpen && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: 4,
                    background: "#ffffff",
                    borderRadius: 8,
                    border: "2px solid #e2e8f0",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    zIndex: 1000,
                    maxHeight: "400px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      padding: 12,
                      borderBottom: "1px solid #e2e8f0",
                      background: "#f8fafc",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search problems..."
                      value={dropdownSearch}
                      onChange={(e) => {
                        setDropdownSearch(e.target.value)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: "2px solid #e2e8f0",
                        background: "#ffffff",
                        color: "#1e293b",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0"
                      }}
                      autoFocus
                    />
                  </div>

                  <div
                    style={{
                      overflowY: "auto",
                      maxHeight: "320px",
                    }}
                  >
                    <div
                      onClick={handlePasteProblem}
                      style={{
                        padding: "12px 16px",
                        cursor: "pointer",
                        borderBottom: "1px solid #e2e8f0",
                        background: "#f0f9ff",
                        color: "#667eea",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        transition: "background 0.15s",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e0f2fe"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f0f9ff"
                      }}
                    >
                      <span>📋</span>
                      <span>Paste Problem</span>
                    </div>

                    {filteredProblems.length === 0 ? (
                      <div
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          color: "#64748b",
                          fontSize: "0.9rem",
                        }}
                      >
                        No problems found
                      </div>
                    ) : (
                      <>
                        {["Easy", "Medium", "Hard"].map((difficulty) => {
                          const problemsByDifficulty = filteredProblems.filter(
                            (p) => p.difficulty === difficulty
                          )
                          if (problemsByDifficulty.length === 0) return null

                          return (
                            <div key={difficulty}>
                              <div
                                style={{
                                  padding: "8px 16px",
                                  background: "#f1f5f9",
                                  fontSize: "0.85rem",
                                  fontWeight: 600,
                                  color: "#475569",
                                  borderBottom: "1px solid #e2e8f0",
                                  borderTop: difficulty === "Easy" ? "none" : "1px solid #e2e8f0",
                                }}
                              >
                                {difficulty} ({problemsByDifficulty.length})
                              </div>
                              {problemsByDifficulty.map((problem) => (
                                <div
                                  key={problem.id}
                                  onClick={() => {
                                    setSelectedProblemId(problem.id)
                                    setCode("")
                                    setExplanation("")
                                    setResult(null)
                                    setDropdownOpen(false)
                                    setDropdownSearch("")
                                  }}
                                  style={{
                                    padding: "12px 16px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #f1f5f9",
                                    background: selectedProblemId === problem.id ? "#f0f9ff" : "#ffffff",
                                    color: "#1e293b",
                                    fontSize: "0.95rem",
                                    transition: "background 0.15s",
                                  }}
                                  onMouseEnter={(e) => {
                                    if (selectedProblemId !== problem.id) {
                                      e.currentTarget.style.background = "#f8fafc"
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (selectedProblemId !== problem.id) {
                                      e.currentTarget.style.background = "#ffffff"
                                    }
                                  }}
                                >
                                  {problem.title}
                                </div>
                              ))}
                            </div>
                          )
                        })}
                      </>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 999,
                  }}
                  onClick={() => {
                    setDropdownOpen(false)
                    setDropdownSearch("")
                  }}
                />
              </>
            )}
          </div>

        </section>
      </div>

      {selectedProblem && (
        <div
          className="two-column-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* Left Column: Problem Statement */}
          <div
            className="sticky-problem"
            style={{
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              padding: 32,
              position: "sticky",
              top: 20,
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
                flexWrap: "wrap",
                gap: 12,
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
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {selectedProblemId === "pasted" ? (
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
                    Pasted Problem
                  </span>
                ) : (
                  <>
                    {allProblems.find((p) => p.id === selectedProblemId)?.difficulty && (
                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: 6,
                          background:
                            allProblems.find((p) => p.id === selectedProblemId)?.difficulty === "Easy"
                              ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                              : allProblems.find((p) => p.id === selectedProblemId)?.difficulty === "Medium"
                              ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                              : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                          color: "#ffffff",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        {allProblems.find((p) => p.id === selectedProblemId)?.difficulty}
                      </span>
                    )}
                    {allProblems.find((p) => p.id === selectedProblemId)?.topic && (
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
                        {allProblems.find((p) => p.id === selectedProblemId)?.topic}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            <pre
              style={{
                background: "#f8fafc",
                padding: 20,
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                overflowX: "auto",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "#334155",
                whiteSpace: "pre-wrap",
                fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
                margin: 0,
              }}
            >
              {selectedProblemId === "pasted" 
                ? pastedProblem?.description 
                : allProblems.find((p) => p.id === selectedProblemId)?.description}
            </pre>
          </div>

          {/* Right Column: Code, Explanation, and Evaluation */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <section>
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

            <section>
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
              disabled={loading || !selectedProblem}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: 8,
                border: "none",
                background: loading || !selectedProblem
                  ? "#94a3b8"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#ffffff",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: loading || !selectedProblem ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                boxShadow: loading || !selectedProblem
                  ? "none"
                  : "0 4px 6px -1px rgba(102, 126, 234, 0.3), 0 2px 4px -1px rgba(102, 126, 234, 0.2)",
                opacity: loading || !selectedProblem ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading && selectedProblem) {
                  e.currentTarget.style.transform = "translateY(-1px)"
                  e.currentTarget.style.boxShadow =
                    "0 10px 15px -3px rgba(102, 126, 234, 0.3), 0 4px 6px -2px rgba(102, 126, 234, 0.2)"
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && selectedProblem) {
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
        </div>
      )}

      {/* Paste Problem Modal */}
      {showPasteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setShowPasteModal(false)}
        >
          <PasteProblemModal
            onConfirm={handleConfirmPaste}
            onCancel={() => setShowPasteModal(false)}
          />
        </div>
      )}
    </main>
    </>
  )
}

// Paste Problem Modal Component
function PasteProblemModal({ onConfirm, onCancel }: { onConfirm: (title: string, description: string) => void; onCancel: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert("Please provide both title and description")
      return
    }
    onConfirm(title, description)
    setTitle("")
    setDescription("")
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: 32,
        maxWidth: 600,
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: 24,
          color: "#1e293b",
        }}
      >
        Paste Problem
      </h2>

      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            display: "block",
            fontSize: "0.95rem",
            fontWeight: 600,
            marginBottom: 8,
            color: "#1e293b",
          }}
        >
          Problem Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Two Sum"
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 8,
            border: "2px solid #e2e8f0",
            fontSize: "0.95rem",
            outline: "none",
            transition: "all 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#667eea"
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0"
          }}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label
          style={{
            display: "block",
            fontSize: "0.95rem",
            fontWeight: 600,
            marginBottom: 8,
            color: "#1e293b",
          }}
        >
          Problem Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste the problem statement, examples, constraints, etc."
          rows={12}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 8,
            border: "2px solid #e2e8f0",
            fontSize: "0.95rem",
            resize: "vertical",
            fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
            outline: "none",
            transition: "all 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#667eea"
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0"
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <button
          onClick={onCancel}
          style={{
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
            e.currentTarget.style.borderColor = "#94a3b8"
            e.currentTarget.style.color = "#1e293b"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e2e8f0"
            e.currentTarget.style.color = "#475569"
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 24px",
            borderRadius: 8,
            border: "none",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 4px 6px -1px rgba(102, 126, 234, 0.3), 0 2px 4px -1px rgba(102, 126, 234, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)"
            e.currentTarget.style.boxShadow =
              "0 10px 15px -3px rgba(102, 126, 234, 0.3), 0 4px 6px -2px rgba(102, 126, 234, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow =
              "0 4px 6px -1px rgba(102, 126, 234, 0.3), 0 2px 4px -1px rgba(102, 126, 234, 0.2)"
          }}
        >
          Use Problem
        </button>
      </div>
    </div>
  )
}
