import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) return NextResponse.json({ error: 'Supabase is not configured.', readings: [] }, { status: 503 })
  try {
    const response = await fetch(`${url}/rest/v1/sensor_readings?select=id,project_id,device_id,moisture,temperature,humidity,payload,recorded_at&order=recorded_at.desc&limit=20`, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' })
    const data = await response.json()
    if (!response.ok) return NextResponse.json({ error: data?.message || `Sensor API returned ${response.status}`, readings: [] }, { status: 502 })
    return NextResponse.json({ readings: Array.isArray(data) ? data : [] })
  } catch { return NextResponse.json({ error: 'Could not load sensor readings.', readings: [] }, { status: 500 }) }
}
