"use client"

import { useCallback } from "react"
import type { HwidEntry } from "@/types"
import UnlockForm from "./_components/UnlockForm"
import HwidList from "./_components/HwidList"
import ThemeCustomizer from "./_components/ThemeCustomizer"
import { useLocalStorage } from "@/lib/useLocalStorage"

export default function Home() {
  const [entries, setEntries] = useLocalStorage<HwidEntry[]>("hwid-entries", [])

  const handleSave = useCallback((entry: HwidEntry) => {
    setEntries((prev) => [entry, ...prev])
  }, [setEntries])

  const handleDelete = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [setEntries])

  const handleClear = useCallback(() => {
    setEntries([])
  }, [setEntries])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
      <header className="border-b px-4 py-1.5" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-wide" style={{ color: "var(--red)" }}>
              HWID Unlocker
            </span>
            <span className="text-[9px] font-mono" style={{ color: "var(--text-secondary)" }}>
              v3.0.4
            </span>
          </div>
          <span className="text-[9px]" style={{ color: "var(--text-secondary)" }}>
            tdops-unlocker
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-4 space-y-3">
        <UnlockForm onSave={handleSave} />
        <HwidList
          entries={entries}
          onDelete={handleDelete}
          onClear={handleClear}
        />
      </main>

      <ThemeCustomizer />
    </div>
  )
}
