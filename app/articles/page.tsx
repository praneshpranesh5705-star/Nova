'use client'
import { useEffect, useState } from 'react'
import { BookOpen, FileText, PenLine, Eye, CheckCircle2, Sparkles, Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Stage = { title: string; description: string; Icon: LucideIcon }
type Item = { id:string; title:string; type:string; body:string; topics:string[] }
const stages: Stage[] = [
  { title: 'Drafts', description: 'Create and edit long-form content.', Icon: PenLine },
  { title: 'Preview', description: 'Review exactly what readers will see.', Icon: Eye },
  { title: 'Review', description: 'AI quality checks before publishing.', Icon: CheckCircle2 },
  { title: 'Books', description: 'Group chapters into complete guides.', Icon: BookOpen },
]

export default function Articles() {
  const [title,setTitle]=useState(''); const [body,setBody]=useState(''); const [items,setItems]=useState<Item[]>([]); const [loading,setLoading]=useState(true); const [aiLoading,setAiLoading]=useState(false); const [message,setMessage]=useState('')
  useEffect(()=>{fetch('/api/content',{cache:'no-store'}).then(r=>r.json()).then(d=>setItems(d.items||[])).catch(()=>{}).finally(()=>setLoading(false))},[])
  async function generate(){ if(!title.trim()||aiLoading)return; setAiLoading(true); setMessage(''); try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:`Create a high-quality article titled "${title}". Return Markdown with an introduction, clear sections, examples, practical takeaways and a conclusion.`,agent:'Writing Agent',history:[]})});const d=await r.json();if(!r.ok)throw new Error(d?.error||'AI generation failed');setBody(d.answer||'')}catch(e){setMessage(e instanceof Error?e.message:'AI generation failed')}finally{setAiLoading(false)}}
  return <main><header className="nav"><a className="brand" href="/"><span className="logo">N</span>NOVA <b>PUBLISH</b></a><nav><a href="/articles">Articles</a><a href="/ai">AI Lab</a><a href="/knowledge">Knowledge</a></nav><a className="ghost" href="/">Home</a></header><section className="workspace"><div className="eyebrow"><FileText size={15}/> ARTICLES & BOOKS</div><h1>Write once. Build knowledge.</h1><p>Publishing workspace with live Supabase content and NOVA AI writing assistance.</p><div className="grid">{stages.map(({ title, description, Icon }) => <div className="card" key={title}><div className="icon"><Icon size={21}/></div><h3>{title}</h3><p>{description}</p></div>)}</div><div className="editor publishEditor"><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Article title"/><textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Start writing in Markdown..."/><div className="solverBar"><span>Draft editor • AI assisted</span><button className="primary" onClick={generate} disabled={aiLoading||!title.trim()}>{aiLoading?<Loader2 className="spin" size={16}/>:<Sparkles size={16}/>} {aiLoading?'Writing…':'Generate with NOVA'}</button></div>{message&&<small>{message}</small>}</div><div className="card" style={{marginTop:24}}><div className="eyebrow"><BookOpen size={15}/> PUBLISHED</div>{loading?<p>Loading live articles…</p>:items.length?<div className="list">{items.map(item=><div className="row" key={item.id}><div className="fileIcon"><FileText/></div><div><b>{item.title}</b><span>{item.type} • {(item.topics||[]).join(', ')}</span></div><em>published</em></div>)}</div>:<p>No published articles yet. Generate a draft above, then connect authentication to publish it securely.</p>}</div></section></main>
}
