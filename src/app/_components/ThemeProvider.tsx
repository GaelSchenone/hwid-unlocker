"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import type { ThemeName, CustomThemeColors } from "@/types"

interface ThemeContextValue {
  theme: ThemeName
  customColors: Partial<CustomThemeColors>
  setTheme: (t: ThemeName) => void
  setCustomColors: (c: Partial<CustomThemeColors>) => void
}

const DEFAULT_CUSTOM: Partial<CustomThemeColors> = {
  accent: "#e8707a",
  "accent-hover": "#d45f69",
  "bg-primary": "#202328",
  "bg-card": "#31353c",
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "original",
  customColors: DEFAULT_CUSTOM,
  setTheme: () => {},
  setCustomColors: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("original")
  const [customColors, setCustomColorsState] = useState<Partial<CustomThemeColors>>(DEFAULT_CUSTOM)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      let saved = localStorage.getItem("hwid-theme")
      if (saved === "odysseus" || saved === "odysseus-light") {
        saved = saved === "odysseus" ? "original" : "light"
        localStorage.setItem("hwid-theme", saved)
      }
      if (saved) setThemeState(saved as ThemeName)
      const savedCustom = localStorage.getItem("hwid-custom-theme")
      if (savedCustom) setCustomColorsState(JSON.parse(savedCustom))
    } catch {}
  }, [])

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t)
    localStorage.setItem("hwid-theme", t)
  }, [])

  const setCustomColors = useCallback((c: Partial<CustomThemeColors>) => {
    setCustomColorsState((prev) => {
      const next = { ...prev, ...c }
      localStorage.setItem("hwid-custom-theme", JSON.stringify(next))
      return next
    })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    if (theme !== "custom") return
    const root = document.documentElement
    const map: Record<string, string> = {
      accent: customColors.accent || "#e8707a",
      "accent-hover": customColors["accent-hover"] || "#d45f69",
      "accent-glow": customColors["accent-glow"] || "",
      "bg-primary": customColors["bg-primary"] || "#202328",
      "bg-card": customColors["bg-card"] || "#31353c",
      "bg-hover": customColors["bg-hover"] || "#3a3f48",
      "text-primary": customColors["text-primary"] || "#79d3de",
      "text-secondary": customColors["text-secondary"] || "#6b8e94",
      border: customColors.border || "#454b54",
    }
    for (const [key, val] of Object.entries(map)) {
      if (val) root.style.setProperty(`--${key}`, val)
    }
  }, [theme, customColors])

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return (
    <ThemeContext.Provider value={{ theme, customColors, setTheme, setCustomColors }}>
      {children}
    </ThemeContext.Provider>
  )
}
