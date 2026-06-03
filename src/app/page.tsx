"use client"

import { useState, useCallback } from "react"
import type { HwidEntry } from "@/types"
import UnlockForm from "./_components/UnlockForm"
import HwidList from "./_components/HwidList"
import ThemeCustomizer from "./_components/ThemeCustomizer"
import { useLocalStorage } from "@/lib/useLocalStorage"

export default function Home() {
  const [entries, setEntries] = useLocalStorage<HwidEntry[]>("hwid-entries", [])
  const [hwid, setHwid] = useState("")
  const [bt, setBt] = useState("")

  const handleSave = useCallback((entry: HwidEntry) => {
    setEntries((prev) => {
      const existing = prev.findIndex((e) => e.hwid === entry.hwid)
      if (existing !== -1) {
        const updated = [...prev]
        updated[existing] = { ...updated[existing], createdAt: entry.createdAt }
        return updated
      }
      return [entry, ...prev]
    })
  }, [setEntries])

  const handleDelete = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [setEntries])

  const handleClear = useCallback(() => {
    setEntries([])
  }, [setEntries])

  const handleFill = useCallback((filledHwid: string) => {
    setHwid(filledHwid)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

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
        <UnlockForm hwid={hwid} bt={bt} onHwidChange={setHwid} onBtChange={setBt} onSave={handleSave} />
        <HwidList
          entries={entries}
          onDelete={handleDelete}
          onClear={handleClear}
          onFill={handleFill}
        />
      </main>

      <ThemeCustomizer />
    </div>
  )
}
