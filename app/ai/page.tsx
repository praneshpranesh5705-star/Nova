'use client'

import { useState } from 'react'
import { BrainCircuit, Send, Paperclip, Sparkles } from 'lucide-react'

type Message = { role: 'user' | 'assistant'; content: string }

const agents = ['General AI', 'Document Analyst', 'Vision Agent', 'Research Agent', 'Coding Agent', 'Agriculture Agent']

export default function AI() {
  const [q, setQ] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [agent, setAgent] = useState('General AI')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function ask(text = q) {
    const prompt = text.trim()
    if (!prompt || loading) return
    const nextMessages = [...messages, { role: 'user' as const, content: prompt }]
    setMessages(nextMessages)
    setQ('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, history: messages, agent }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.error || 'NOVA could not answer.')
      setMessages([...nextMessages, { role: 'assistant', content: data.answer }])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'NOVA could not answer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <header className="nav">
        <a className="brand" href="/"><span className="logo">N</span>NOVA <b>AI</b></a>
        <nav><a href="/">Home</a><a href="/knowledge">Knowledge</a><a href="/solve">Solve</a></nav>
        <a className="ghost" href="/admin">Admin</a>
      </header>

      <section className="workspace">
        <div className="workspaceHead">
          <div><div className="eyebrow"><BrainCircuit size={15}/> AI LAB</div><h1>Ask NOVA anything.</h1><p>Live AI for chat, problem solving, research, coding and agriculture.</p></div>
          <div className="status"><span/>{loading ? 'Thinking…' : 'Engine ready'}</div>
        </div>

        <div className="agentGrid">
          {agents.map((name) => <button key={name} className={agent === name ? 'active' : ''} onClick={() => { setAgent(name); setQ(name + ': ') }}><Sparkles size={16}/>{name}</button>)}
        </div>

        <div className="chat">
          {messages.length === 0 ? <div className="empty"><BrainCircuit size={46}/><h2>What are you solving today?</h2><p>Ask a question and NOVA will generate a real AI response.</p></div> : messages.map((m, i) => <div className={`bubble ${m.role}`} key={`${m.role}-${i}`}><b>{m.role === 'user' ? 'You' : 'NOVA'}</b><div>{m.content}</div></div>)}
          {loading && <div className="bubble assistant"><b>NOVA</b><div>Thinking…</div></div>}
        </div>

        {error && <div className="warning" style={{ margin: '12px 0' }}>{error}</div>}

        <div className="composer">
          <button title="Attach" disabled><Paperclip size={19}/></button>
          <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') ask() }} placeholder="Ask NOVA..." disabled={loading}/>
          <button className="primary" onClick={() => ask()} disabled={loading || !q.trim()}><Send size={17}/></button>
        </div>
      </section>
    </main>
  )
}
