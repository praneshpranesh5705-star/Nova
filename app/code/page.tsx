'use client'
import { useState } from 'react'
import { Code2, Play, Sparkles, Loader2 } from 'lucide-react'

export default function Code() {
  const [code, setCode] = useState('// Paste your code here\nfunction solve() {\n  return true\n}')
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function analyze(task: string) {
    if (!code.trim() || loading) return
    setLoading(true); setError(''); setReview('')
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({
        message: `${task}\n\nAnalyze this code:\n\n${code}`,
        agent: 'Coding Agent', history: []
      })})
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Code analysis failed.')
      setReview(data.answer || 'No review returned.')
    } catch (e) { setError(e instanceof Error ? e.message : 'Code analysis failed.') }
    finally { setLoading(false) }
  }

  return <main><header className="nav"><a className="brand" href="/"><span className="logo">N</span>NOVA <b>CODE</b></a><nav><a href="/ai">AI Lab</a><a href="/knowledge">Knowledge</a><a href="/solve">Solver</a></nav><a className="ghost" href="/">Home</a></header><section className="workspace"><div className="eyebrow"><Code2 size={15}/> CODE LAB</div><h1>Build with an AI coding partner.</h1><p>Explain, debug, refactor, generate tests and review code with live NOVA AI.</p><div className="codeTools"><button className="primary" onClick={()=>analyze('Review this code for correctness, bugs, security, architecture and performance. Give actionable fixes.')}>{loading?<Loader2 className="spin" size={16}/>:<Sparkles size={16}/>} {loading?'Analyzing…':'Review code'}</button><button className="secondary" onClick={()=>analyze('Analyze what this code would do, identify likely runtime/type errors, and explain how to test it.')}><Play size={16}/> Run analysis</button></div><div className="editor"><textarea value={code} onChange={e=>setCode(e.target.value)} spellCheck={false}/><div className="review"><b>AI review</b>{error?<p>{error}</p>:review?<p style={{whiteSpace:'pre-wrap'}}>{review}</p>:<p>Paste code and choose Review code or Run analysis.</p>}<span>Provider: live through /api/chat when GEMINI_API_KEY is configured</span></div></div></section></main>
}
