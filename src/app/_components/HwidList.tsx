"use client"

import { useState } from "react"
import type { HwidEntry } from "@/types"

interface Props {
  entries: HwidEntry[]
  onDelete: (id: string) => void
  onClear: () => void
}

export default function HwidList({ entries, onDelete, onClear }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function handleCopy(entry: HwidEntry) {
    try {
      await navigator.clipboard.writeText(entry.unlockCode)
      setCopiedId(entry.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {}
  }

  if (entries.length === 0) {
    return (
      <div className="card">
        <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--warn)" }}>
          &gt; HWIDs guardados
        </div>
        <p className="text-[11px] mt-1" style={{ color: "var(--text-secondary)" }}>
          Vacío. Generá un código y guardalo.
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--red)" }}>
          &gt; HWIDs guardados
          <span className="ml-1.5 font-mono text-[9px]" style={{ color: "var(--text-secondary)" }}>
            {entries.length}
          </span>
        </div>
        <button onClick={onClear} className="text-[9px] px-1.5 py-0.5"
          style={{
            color: "var(--red)",
            border: "1px solid color-mix(in srgb, var(--red) 20%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--red) 6%, transparent)",
          }}>
          limpiar todo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              <th className="text-left pb-1 pr-1.5 font-normal">HWID</th>
              <th className="text-left pb-1 pr-1.5 font-normal hidden sm:table-cell">BT</th>
              <th className="text-left pb-1 pr-1.5 font-normal">Código</th>
              <th className="text-left pb-1 pr-1.5 font-normal hidden sm:table-cell">Fecha</th>
              <th className="text-right pb-1 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="group" style={{ borderTop: "1px solid var(--border)" }}>
                <td className="py-1 pr-1.5">
                  <code className="font-mono text-[10px]" style={{ color: "var(--fg)" }}>{entry.hwid}</code>
                </td>
                <td className="py-1 pr-1.5 hidden sm:table-cell">
                  <code className="font-mono text-[10px]" style={{ color: "var(--text-secondary)" }}>
                    {entry.bt || "—"}
                  </code>
                </td>
                <td className="py-1 pr-1.5">
                  <code className="font-mono text-[10px]" style={{ color: "var(--green)" }}>{entry.unlockCode}</code>
                </td>
                <td className="py-1 pr-1.5 hidden sm:table-cell" style={{ color: "var(--text-secondary)" }}>
                  <span className="text-[10px]">
                    {new Date(entry.createdAt).toLocaleDateString("es-AR", {
                      day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </td>
                <td className="py-1 text-right">
                  <div className="flex gap-1 justify-end">
                    <button
                      onClick={() => handleCopy(entry)}
                      className="text-[9px] px-1 py-0.5"
                      style={{
                        color: copiedId === entry.id ? "var(--green)" : "var(--text-secondary)",
                        border: "1px solid var(--border)",
                        backgroundColor: "transparent",
                      }}
                    >
                      {copiedId === entry.id ? "copiado" : "copiar"}
                    </button>
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="text-[9px] px-1 py-0.5"
                      style={{
                        color: "var(--red)",
                        border: "1px solid color-mix(in srgb, var(--red) 20%, transparent)",
                        backgroundColor: "transparent",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
