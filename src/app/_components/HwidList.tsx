"use client"

import type { HwidEntry } from "@/types"

interface Props {
  entries: HwidEntry[]
  onDelete: (id: string) => void
  onClear: () => void
  onFill: (hwid: string) => void
}

export default function HwidList({ entries, onDelete, onClear, onFill }: Props) {
  if (entries.length === 0) {
    return (
      <div className="card">
        <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--warn)" }}>
          &gt; Historial
        </div>
        <p className="text-[11px] mt-1" style={{ color: "var(--text-secondary)" }}>
          Vacío. Los códigos generados se guardan automáticamente.
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--red)" }}>
          &gt; Historial
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
              <th className="text-left pb-1 font-normal">Fecha</th>
              <th className="text-right pb-1 pl-1.5 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}
                onClick={() => onFill(entry.hwid)}
                onKeyDown={(e) => { if (e.key === "Enter") onFill(entry.hwid) }}
                tabIndex={0}
                role="button"
                aria-label={`Rellenar con HWID ${entry.hwid}`}
                className="group cursor-pointer"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <td className="py-1 pr-1.5">
                  <code className="font-mono text-[10px]" style={{ color: "var(--fg)" }}>{entry.hwid}</code>
                </td>
                <td className="py-1" style={{ color: "var(--text-secondary)" }}>
                  <span className="text-[10px]">
                    {new Date(entry.createdAt).toLocaleDateString("es-AR", {
                      day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </td>
                <td className="py-1 text-right pl-1.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(entry.id) }}
                    className="text-[9px] px-1 py-0.5"
                    style={{
                      color: "var(--red)",
                      border: "1px solid color-mix(in srgb, var(--red) 20%, transparent)",
                      backgroundColor: "transparent",
                    }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-[9px] mt-1.5" style={{ color: "var(--text-secondary)" }}>
        Click para rellenar el formulario.
      </div>
    </div>
  )
}
