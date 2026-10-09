'use client'

import { useState } from 'react'
import { ArrowRight, BrainCircuit, BookOpen, Code2, FileText, Search, Sparkles, Upload, Activity, ShieldCheck, Cpu, Leaf } from 'lucide-react'

const modules = [
  ['AI Lab','Chat, vision, document analysis and multi-agent workflows.','/ai',BrainCircuit],
  ['Knowledge Base','Upload PDFs, books, notes and projects into searchable private knowledge.','/knowledge',BookOpen],
  ['Problem Solver','Maths, science, coding and research with structured step-by-step answers.','/solve',Sparkles],
  ['Code Lab','Generate, explain, debug and review code with project context.','/code',Code2],
  ['Articles & Books','Draft, review, preview and publish technical knowledge.','/articles',FileText],
  ['Live Projects','Monitor IoT, agriculture and real-time project data.','/projects',Activity],
]

export default function Home() {
  const [query, setQuery] = useState('')
  return <main>
    <header className="nav"><a className="brand" href="/"><span className="logo">N</span>NOVA <b>HUB</b></a><nav><a href="#platform">Platform</a><a href="/articles">Articles</a><a href="/projects">Projects</a><a href="/ai">AI Lab</a></nav><a className="ghost" href="/admin">Admin</a></header>

    <section className="hero"><div className="glow"/><div className="eyebrow"><Sparkles size={15}/> NEXT-GENERATION AI KNOWLEDGE PLATFORM</div><h1>Think. Build.<br/><span>Discover more.</span></h1><p>One intelligent workspace for knowledge, documents, coding, research, publishing, projects and advanced problem solving.</p><div className="search"><Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask NOVA or search your knowledge..."/><kbd>⌘ K</kbd></div><div className="actions"><a className="primary" href="/ai"><Sparkles size={18}/> Open AI Lab</a><a className="secondary" href="#platform">Explore platform <ArrowRight size={17}/></a></div>{query && <div className="searchHint">Ready to search: <b>{query}</b></div>}</section>

    <section className="stats"><div><strong>AI</strong><span>Multi-agent engine</span></div><div><strong>RAG</strong><span>Private knowledge</span></div><div><strong>24/7</strong><span>Project intelligence</span></div><div><strong>∞</strong><span>Expandable platform</span></div></section>

    <section id="platform" className="section"><div className="sectionHead"><div><div className="eyebrow">PLATFORM</div><h2>Everything you need to <span>solve & create.</span></h2></div><a className="textBtn" href="/ai">Open AI Lab <ArrowRight size={16}/></a></div><div className="grid">{modules.map(([title,desc,href,Icon])=><div className="card" key={title}><div className="icon"><Icon size={21}/></div><h3>{title}</h3><p>{desc}</p><a href={href as string}>Open <ArrowRight size={15}/></a></div>)}</div></section>

    <section className="aiPanel"><div><div className="eyebrow"><Cpu size={15}/> INTELLIGENCE ENGINE</div><h2>Your knowledge.<br/><span>Your AI.</span></h2><p>Upload a document, image, codebase or research material. NOVA is designed to understand it, index it, retrieve relevant context and turn it into useful answers and outputs.</p><div className="chips"><span><Upload size={14}/> PDF / DOCX</span><span><ShieldCheck size={14}/> Private knowledge</span><span><Leaf size={14}/> Agriculture ready</span></div></div><div className="terminal"><div className="dots">● ● ●</div><div><i>nova</i> analyze <b>uploaded_book.pdf</b></div><div className="muted">→ extract text + metadata</div><div className="muted">→ chunk + embed knowledge</div><div className="muted">→ retrieve relevant context</div><div className="success">✓ Knowledge engine architecture ready</div></div></section>

    <section className="section roadmap"><div className="eyebrow">BUILD ROADMAP</div><h2>From prototype to <span>real platform.</span></h2><div className="timeline"><div><b>01</b><strong>Foundation</strong><p>Next.js App Router, responsive UI and platform navigation.</p></div><div><b>02</b><strong>Data layer</strong><p>Supabase Auth, Postgres, Storage, RLS and Realtime.</p></div><div><b>03</b><strong>AI engine</strong><p>Model routing, vision, structured outputs, tools and RAG.</p></div><div><b>04</b><strong>Publishing</strong><p>Articles, books, drafts, preview, review, topics and media.</p></div><div><b>05</b><strong>Live intelligence</strong><p>IoT dashboards, agriculture data, alerts and analytics.</p></div></div></section>

    <footer><div className="brand"><span className="logo">N</span>NOVA HUB</div><span>AI Knowledge • Problem Solving • Projects</span></footer>
  </main>
}
