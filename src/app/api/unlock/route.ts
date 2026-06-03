const PAGE_URL = "https://desbloqueo.sarmientoba.net/"
const API_URL = "https://desbloqueo.sarmientoba.net/api/unlock"

let cachedToken: string | null = null
let tokenFetchedAt = 0
const TOKEN_TTL = 60_000

async function getToken(): Promise<string> {
  const now = Date.now()
  if (cachedToken && now - tokenFetchedAt < TOKEN_TTL) {
    return cachedToken
  }
  const res = await fetch(PAGE_URL)
  const html = await res.text()
  const match = html.match(/X-CSRF-Token",\s*"([^"]+)"/)
  if (!match) throw new Error("No se pudo obtener el token CSRF.")
  cachedToken = match[1]
  tokenFetchedAt = now
  return cachedToken
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { hwid, bt } = body
    const token = await getToken()

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
      },
      body: JSON.stringify({ hwid, bt: bt || "" }),
    })

    const data = await res.json()

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        cachedToken = null
      }
      return Response.json(
        { title: data.title || data.message || "No pudo generarse el código." },
        { status: res.status }
      )
    }

    return Response.json({ unlock_code: data.unlock_code })
  } catch {
    return Response.json(
      { title: "Error interno del servidor." },
      { status: 500 }
    )
  }
}
