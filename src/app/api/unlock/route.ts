const API_URL = "https://desbloqueo.sarmientoba.net/api/unlock"
const CSRF_TOKEN = "LV8AYQsDALs5HgZwHlbql0u0sENNUovq"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { hwid, bt } = body

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRF_TOKEN,
      },
      body: JSON.stringify({ hwid, bt: bt || "" }),
    })

    const data = await res.json()

    if (!res.ok) {
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
