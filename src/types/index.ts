export interface HwidEntry {
  id: string
  hwid: string
  bt: string
  unlockCode: string
  createdAt: string
}

export type ThemeName =
  | "original"
  | "light"
  | "midnight"
  | "paper"
  | "cyberpunk"
  | "retrowave"
  | "forest"
  | "ocean"
  | "ume"
  | "copper"
  | "terminal"
  | "organs"
  | "lavender"
  | "gpt"
  | "claude"
  | "cute"
  | "custom"

export interface CustomThemeColors {
  accent: string
  "accent-hover": string
  "accent-glow": string
  "bg-primary": string
  "bg-secondary": string
  "bg-card": string
  "bg-hover": string
  "text-primary": string
  "text-secondary": string
  border: string
  success: string
  error: string
  warning: string
}
