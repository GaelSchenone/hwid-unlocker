const PAGE_URL = "https://desbloqueo.sarmientoba.net/"
const API_URL = "https://desbloqueo.sarmientoba.net/api/unlock"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { hwid, bt } = body

    // Fetch the page to get a session cookie + CSRF token
    const pageRes = await fetch(PAGE_URL)
    const html = await pageRes.text()
    const match = html.match(/X-CSRF-Token[^,]+,\s*"([^"]+)"/)
    if (!match) {
      return Response.json(
        { title: "Error al obtener token de seguridad." },
        { status: 502 }
      )
    }
    const token = match[1]

    const apiRes = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
        Cookie: `_csrf=${token}`,
      },
      body: JSON.stringify({ hwid, bt: bt || "" }),
    })

    const data = await apiRes.json()

    if (!apiRes.ok) {
      return Response.json(
        { title: data.title || data.message || "No pudo generarse el código." },
        { status: apiRes.status }
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
