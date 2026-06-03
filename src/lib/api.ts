export async function generateUnlockCode(
  hwid: string,
  bt?: string
): Promise<string> {
  const res = await fetch("/api/unlock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hwid, bt: bt || "" }),
  })

  if (!res.ok) {
    let message = "No pudo generarse el código."
    try {
      const err = await res.json()
      if (err.code === 1541) {
        throw new Error("Acceso no autorizado.")
      }
      message = err.title || err.message || message
    } catch {
      if (res.status === 401 || res.status === 403) {
        throw new Error("Acceso no autorizado.")
      }
    }
    throw new Error(message)
  }

  const data = await res.json()
  return data.unlock_code as string
}

export function isHWIDHex(h: string): boolean {
  if (!/^[0-9a-fA-F]+$/.test(h)) return false
  try {
    const a = parseInt(h, 16)
    return a.toString(16).padStart(12, "0").toLowerCase() === h.toLowerCase()
  } catch {
    return false
  }
}

export function isBTHex(h: string): boolean {
  if (!/^[0-9a-fA-F]+$/.test(h)) return false
  try {
    const a = parseInt(h, 16)
    return a.toString(16).toLowerCase() === h.toLowerCase()
  } catch {
    return false
  }
}
