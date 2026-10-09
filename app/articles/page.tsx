import { BookOpen, FileText, PenLine, Eye, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Stage = { title: string; description: string; Icon: LucideIcon }

const stages: Stage[] = [
  { title: 'Drafts', description: 'Create and edit long-form content.', Icon: PenLine },
  { title: 'Preview', description: 'Review exactly what readers will see.', Icon: Eye },
  { title: 'Review', description: 'Quality checklist before publishing.', Icon: CheckCircle2 },
  { title: 'Books', description: 'Group chapters into complete guides.', Icon: BookOpen },
]

export default function Articles() {
  return <main>
    <header className="nav"><a className="brand" href="/"><span className="logo">N</span>NOVA <b>PUBLISH</b></a><nav><a href="/articles">Articles</a><a href="/ai">AI Lab</a><a href="/knowledge">Knowledge</a></nav><a className="ghost" href="/">Home</a></header>
    <section className="workspace"><div className="eyebrow"><FileText size={15}/> ARTICLES & BOOKS</div><h1>Write once. Build knowledge.</h1><p>Original publishing workflow inspired by the useful article/book concepts studied from zenn-docs, rebuilt for NOVA.</p><div className="grid">{stages.map(({ title, description, Icon }) => <div className="card" key={title}><div className="icon"><Icon size={21}/></div><h3>{title}</h3><p>{description}</p></div>)}</div><div className="editor publishEditor"><input placeholder="Article title"/><textarea placeholder="Start writing in Markdown..."/><div className="solverBar"><span>Draft • Markdown • Topics • Images</span><button className="primary">Save draft</button></div></div></section>
  </main>
}
