"use client"

import { useState } from "react"
import { generateUnlockCode, isHWIDHex, isBTHex } from "@/lib/api"
import type { HwidEntry } from "@/types"

interface Props {
  hwid: string
  bt: string
  onHwidChange: (v: string) => void
  onBtChange: (v: string) => void
  onSave: (entry: HwidEntry) => void
}

export default function UnlockForm({ hwid, bt, onHwidChange, onBtChange, onSave }: Props) {
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  function validate(): string | null {
    if (!hwid) return "HWID es necesario."
    if (!isHWIDHex(hwid)) return "HWID inválido."
    if (hwid.length !== 12) return "HWID inválido."
    if (bt && !isBTHex(bt)) return "BootTick inválido."
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); setCode(""); return }
    setError(""); setCode(""); setLoading(true)
    try {
      const result = await generateUnlockCode(hwid, bt)
      setCode(result)
      onSave({
        id: crypto.randomUUID(),
        hwid,
        bt,
        createdAt: new Date().toISOString(),
      })
    } catch (e: any) {
      setError(e.message || "Error al generar código.")
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="card">
      <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--red)" }}>
        &gt; Generar desbloqueo
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "var(--text-secondary)" }}>
            HWID
          </label>
          <input
            type="text"
            value={hwid}
            onChange={(e) => { onHwidChange(e.target.value.toUpperCase()); setCode(""); setError("") }}
            placeholder="A1B2C3D4E5F6"
            maxLength={12}
            required
            className="input"
            autoComplete="off"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "var(--text-secondary)" }}>
            BootTick <span className="opacity-40">(opcional)</span>
          </label>
          <input
            type="text"
            value={bt}
            onChange={(e) => { onBtChange(e.target.value.toUpperCase()); setCode(""); setError("") }}
            placeholder="FF00AA"
            className="input"
            autoComplete="off"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <span className="flex items-center justify-center gap-1.5">
              <span className="w-2.5 h-2.5 border-2 rounded-full animate-spin"
                style={{ borderColor: "var(--border)", borderTopColor: "var(--red)" }}
              />
              generando...
            </span>
          ) : (
            "$ generar"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-2 p-1.5 text-[11px]" style={{
          backgroundColor: "color-mix(in srgb, var(--red) 8%, transparent)",
          color: "var(--red)",
          border: "1px solid color-mix(in srgb, var(--red) 20%, transparent)",
        }}>
          ! {error}
        </div>
      )}

      {code && (
        <div className="mt-2">
          <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "var(--text-secondary)" }}>
            Código de desbloqueo
          </div>
          <div className="p-2 text-xs font-mono break-all select-all"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--green)",
              border: "1px solid var(--border)",
            }}
          >
            {code}
          </div>
          <div className="flex gap-1.5 mt-1.5">
            <button onClick={handleCopy} className="btn-secondary flex-1">
              {copied ? "copiado" : "copiar"}
            </button>
            <button onClick={() => { setCode(""); setError("") }} className="btn-secondary flex-1">
              limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
