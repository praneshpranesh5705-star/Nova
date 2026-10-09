import { Settings, Database, BrainCircuit, ShieldCheck, FileText } from 'lucide-react'

async function checkSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return { connected: false, detail: 'Environment variables missing' }

  try {
    const response = await fetch(`${url}/rest/v1/profiles?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store',
    })
    return { connected: response.ok, detail: response.ok ? 'Live connection verified' : `Supabase returned ${response.status}` }
  } catch {
    return { connected: false, detail: 'Connection check failed' }
  }
}

export default async function Admin() {
  const supabase = await checkSupabase()

  return (
    <main>
      <header className="nav">
        <a className="brand" href="/"><span className="logo">N</span>NOVA <b>ADMIN</b></a>
        <nav><a href="/">Home</a><a href="/knowledge">Knowledge</a><a href="/articles">Publishing</a></nav>
        <a className="ghost" href="/">Exit</a>
      </header>
      <section className="workspace">
        <div className="eyebrow"><Settings size={15}/> CONTROL CENTER</div>
        <h1>Platform administration.</h1>
        <p>Central place for AI providers, database connection, publishing controls and security.</p>
        <div className="grid">
          <div className="card">
            <Database/>
            <h3>Supabase</h3>
            <p>Database, Auth, Storage, Realtime and RLS.</p>
            <span className={supabase.connected ? 'ready' : 'warning'}>{supabase.connected ? 'Connected' : 'Not connected'}</span>
            <small>{supabase.detail}</small>
          </div>
          <div className="card"><BrainCircuit/><h3>AI provider</h3><p>Configure model routing, vision and tool calling.</p><span className="warning">Not configured</span></div>
          <div className="card"><ShieldCheck/><h3>Security</h3><p>RLS policies, private knowledge and protected admin routes.</p><span className="ready">Architecture ready</span></div>
          <div className="card"><FileText/><h3>Publishing</h3><p>Draft, preview, review and publish content.</p><span className="ready">UI ready</span></div>
        </div>
      </section>
    </main>
  )
}
