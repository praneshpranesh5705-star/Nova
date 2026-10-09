'use client'
import { useState } from 'react'
import { Calculator, Sparkles, Loader2 } from 'lucide-react'

type Answer = { role: 'user' | 'assistant'; content: string }

export default function Solve() {
  const [q, setQ] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function solve() {
    const message = q.trim()
    if (!message || loading) return
    setLoading(true); setError(''); setAnswer('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Solve this problem step by step. Show formulas, calculations, assumptions, and final answer clearly:\n\n${message}`, agent: 'Problem Solver', history: [] as Answer[] }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Solver request failed.')
      setAnswer(data.answer || 'No answer returned.')
    } catch (e) { setError(e instanceof Error ? e.message : 'Solver request failed.') }
    finally { setLoading(false) }
  }

  return <main><header className="nav"><a className="brand" href="/"><span className="logo">N</span>NOVA <b>SOLVER</b></a><nav><a href="/ai">AI Lab</a><a href="/knowledge">Knowledge</a><a href="/code">Code Lab</a></nav><a className="ghost" href="/">Home</a></header><section className="workspace solver"><div className="eyebrow"><Calculator size={15}/> PROBLEM SOLVER</div><h1>Turn hard problems into clear steps.</h1><p>Maths, science, engineering, coding and research workflows powered by NOVA.</p><div className="solverBox"><textarea value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.ctrlKey&&e.key==='Enter')solve()}} placeholder="Paste your problem here..."/><div className="solverBar"><span>{q.length} characters • Ctrl+Enter to solve</span><button className="primary" onClick={solve} disabled={loading || !q.trim()}>{loading?<Loader2 className="spin" size={16}/>:<Sparkles size={16}/>} {loading?'Solving…':'Solve with NOVA'}</button></div></div><div className="modeGrid">{['Mathematics','Physics','Chemistry','Engineering','Programming','Research'].map(x=><button key={x} onClick={()=>setQ(`Solve this ${x.toLowerCase()} problem step by step:\n\n`)}><Sparkles size={15}/>{x}</button>)}</div>{error&&<div className="card"><b>Solver error</b><p>{error}</p></div>}{answer&&<div className="card" style={{marginTop:24}}><div className="eyebrow"><Sparkles size={15}/> NOVA ANSWER</div><div style={{whiteSpace:'pre-wrap',lineHeight:1.7}}>{answer}</div></div>}</section></main>
}
