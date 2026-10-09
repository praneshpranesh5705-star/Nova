import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json({ error: 'Supabase is not configured.', items: [] }, { status: 503 })

  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.trim()
    const type = searchParams.get('type')?.trim()
    const params = new URLSearchParams({ select: 'id,type,title,slug,body,status,topics,cover_url,created_at,updated_at', status: 'eq.published', order: 'updated_at.desc', limit: '50' })
    if (type && ['article','book','chapter'].includes(type)) params.set('type', `eq.${type}`)
    if (q) params.set('or', `(title.ilike.*${q}*,body.ilike.*${q}*)`)
    const response = await fetch(`${url}/rest/v1/content?${params.toString()}`, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' })
    const data = await response.json()
    if (!response.ok) return NextResponse.json({ error: data?.message || `Supabase returned ${response.status}`, items: [] }, { status: 502 })
    return NextResponse.json({ items: Array.isArray(data) ? data : [] })
  } catch { return NextResponse.json({ error: 'Could not load NOVA content.', items: [] }, { status: 500 }) }
}
