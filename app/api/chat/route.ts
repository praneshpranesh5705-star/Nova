import { NextResponse } from 'next/server'

type Message = { role: 'user' | 'assistant'; content: string }
type Part = { text?: string; inlineData?: { mimeType: string; data: string } }

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = String(body?.message || '').trim()
    const history = Array.isArray(body?.history) ? (body.history as Message[]).slice(-12) : []
    const agent = String(body?.agent || 'General AI')
    const imageData = typeof body?.imageData === 'string' ? body.imageData : ''
    const imageMimeType = typeof body?.imageMimeType === 'string' ? body.imageMimeType : ''
    if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 })

    const apiKey = process.env.GEMINI_API_KEY || process.env.AI_PROVIDER_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'AI provider is not configured. Add GEMINI_API_KEY in Vercel.' }, { status: 503 })

    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    const system = `You are NOVA, an advanced AI knowledge and problem-solving assistant. Agent: ${agent}. Answer clearly and accurately. For maths, show steps. For coding, give working code and explain it. For science and agriculture, be practical and safety-aware. If an image is supplied, inspect only what is visible and clearly separate observations from possible interpretations. Never invent an unseen document, image, sensor reading, or source.`
    const contents = [
      ...history.filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string').map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      { role: 'user', parts: [{ text: message }, ...(imageData && imageMimeType ? [{ inlineData: { mimeType: imageMimeType, data: imageData } }] : [])] as Part[] },
    ]

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents, generationConfig: { temperature: 0.4, maxOutputTokens: 2048 } }),
      cache: 'no-store',
    })
    const data = await response.json()
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || `AI provider returned ${response.status}` }, { status: 502 })
    const answer = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('').trim()
    if (!answer) return NextResponse.json({ error: 'The AI provider returned no answer.' }, { status: 502 })
    return NextResponse.json({ answer, model, agent })
  } catch { return NextResponse.json({ error: 'NOVA could not process the request.' }, { status: 500 }) }
}
