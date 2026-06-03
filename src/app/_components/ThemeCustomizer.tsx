"use client"

import { useState } from "react"
import { useTheme } from "./ThemeProvider"
import type { ThemeName } from "@/types"

interface ThemeInfo {
  name: ThemeName
  label: string
  bg: string
  panel: string
  accent: string
}

const THEMES: ThemeInfo[] = [
  { name: "original", label: "Original", bg: "#202328", panel: "#31353c", accent: "#e8707a" },
  { name: "light", label: "Light", bg: "#f8f8f2", panel: "#e0e4e5", accent: "#c88a67" },
  { name: "midnight", label: "Midnight", bg: "#11161d", panel: "#1d2631", accent: "#ee5e5e" },
  { name: "paper", label: "Paper", bg: "#ffffff", panel: "#f0f0f0", accent: "#d5b85a" },
  { name: "cyberpunk", label: "Cyberpunk", bg: "#080a0f", panel: "#17002e", accent: "#ff00ff" },
  { name: "retrowave", label: "Retrowave", bg: "#1a1c35", panel: "#25274e", accent: "#e85278" },
  { name: "forest", label: "Forest", bg: "#132019", panel: "#233829", accent: "#77c681" },
  { name: "ocean", label: "Ocean", bg: "#0b1b2b", panel: "#112a40", accent: "#479bff" },
  { name: "ume", label: "Ume", bg: "#1a1423", panel: "#2e2139", accent: "#f3c7e3" },
  { name: "copper", label: "Copper", bg: "#1a1310", panel: "#281e19", accent: "#d07a54" },
  { name: "terminal", label: "Terminal", bg: "#000000", panel: "#111111", accent: "#00ff00" },
  { name: "organs", label: "Organs", bg: "#140a0a", panel: "#211010", accent: "#d24a4a" },
  { name: "lavender", label: "Lavender", bg: "#322845", panel: "#3d3052", accent: "#a08adf" },
  { name: "gpt", label: "GPT", bg: "#1a1a1a", panel: "#2a2a2a", accent: "#a3a3a3" },
  { name: "claude", label: "Claude", bg: "#201e1d", panel: "#35312f", accent: "#d87656" },
  { name: "cute", label: "Cute", bg: "#ffffff", panel: "#fcebf0", accent: "#ff6699" },
  { name: "custom", label: "Custom", bg: "#202328", panel: "#31353c", accent: "#ffffff" },
]

const CUSTOM_FIELDS: { key: string; label: string; default: string }[] = [
  { key: "accent", label: "Acento", default: "#e8707a" },
  { key: "bg-primary", label: "Fondo", default: "#202328" },
  { key: "bg-card", label: "Panel", default: "#31353c" },
  { key: "text-primary", label: "Texto", default: "#79d3de" },
  { key: "text-secondary", label: "Texto sec", default: "#6b8e94" },
  { key: "border", label: "Borde", default: "#454b54" },
]

export default function ThemeCustomizer() {
  const { theme, setTheme, customColors, setCustomColors } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-3 right-3 z-50">
      {open && (
        <div className="mb-2 p-3" style={{
          backgroundColor: "var(--panel)",
          border: "1px solid var(--border)",
          width: "280px",
          maxHeight: "70vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          <div className="text-[10px] uppercase tracking-wider mb-2 flex-shrink-0" style={{ color: "var(--red)" }}>
            &gt; Tema
          </div>

          <div className="overflow-y-auto space-y-0.5 flex-1 pr-1">
            {THEMES.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-left transition-all"
                style={{
                  backgroundColor: theme === t.name ? "color-mix(in srgb, var(--red) 10%, transparent)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono), monospace",
                }}
              >
                <span className="flex-shrink-0 flex rounded-sm overflow-hidden" style={{ width: 28, height: 16, border: "1px solid color-mix(in srgb, var(--fg) 20%, transparent)" }}>
                  <span style={{ width: "40%", backgroundColor: t.bg }} />
                  <span style={{ width: "30%", backgroundColor: t.panel }} />
                  <span style={{ width: "30%", backgroundColor: t.accent }} />
                </span>
                <span className="text-[11px]" style={{
                  color: theme === t.name ? "var(--red)" : "var(--fg)",
                }}>
                  {t.label}
                </span>
                {theme === t.name && (
                  <span className="ml-auto text-[10px]" style={{ color: "var(--red)" }}>◂</span>
                )}
              </button>
            ))}
          </div>

          {theme === "custom" && (
            <div className="space-y-1.5 pt-2 mt-2 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
              {CUSTOM_FIELDS.map((field) => (
                <div key={field.key} className="flex items-center gap-2">
                  <span className="text-[9px] w-14 flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                    {field.label}
                  </span>
                  <input
                    type="color"
                    value={customColors[field.key as keyof typeof customColors] || field.default}
                    onChange={(e) => setCustomColors({ [field.key]: e.target.value })}
                    className="w-5 h-5 cursor-pointer border-0"
                    style={{ backgroundColor: "transparent", padding: 0 }}
                  />
                  <input
                    type="text"
                    value={customColors[field.key as keyof typeof customColors] || field.default}
                    onChange={(e) => setCustomColors({ [field.key]: e.target.value })}
                    className="flex-1 text-[9px] px-1 py-0.5 font-mono"
                    style={{
                      backgroundColor: "var(--bg)",
                      color: "var(--fg)",
                      border: "1px solid var(--border)",
                      outline: "none",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-7 h-7 flex items-center justify-center"
        style={{
          border: "1px solid var(--border)",
          color: "var(--fg)",
          backgroundColor: "transparent",
          cursor: "pointer",
          marginLeft: "auto",
        }}
        title="Temas"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
    </div>
  )
}
