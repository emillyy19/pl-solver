import { useState } from 'react'
import Modelagem from './components/Modelagem'
import Solver from './components/Solver'
import Grafico from './components/Grafico'
import Solucao from './components/Solucao'
import './App.css'

const TABS = [
  { id: 'modelagem', label: '① Modelagem' },
  { id: 'solver',    label: '② Solver' },
  { id: 'grafico',   label: '③ Gráfico' },
  { id: 'solucao',   label: '④ Solução Ótima' },
]

export default function App() {
  const [active, setActive] = useState('modelagem')

  return (
    <div className="app-wrap">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-badge">ENADE 2021 · Sistemas de Informação</div>
          <h1 className="header-title">Programação Linear</h1>
          <p className="header-sub">Minimização de custo — Montagem de Computadores</p>
        </div>
        <div className="factory-cards">
          <div className="factory-card manaus">
            <span className="factory-label">Fábrica Manaus</span>
            <span className="factory-cost">R$ 150.000 <small>/dia</small></span>
          </div>
          <div className="factory-card sul">
            <span className="factory-label">Fábrica Sul</span>
            <span className="factory-cost">R$ 210.000 <small>/dia</small></span>
          </div>
        </div>
      </header>

      <nav className="tab-nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn ${active === t.id ? 'active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {active === 'modelagem' && <Modelagem onNext={() => setActive('solver')} />}
        {active === 'solver'    && <Solver    onNext={() => setActive('grafico')} />}
        {active === 'grafico'   && <Grafico   onNext={() => setActive('solucao')} />}
        {active === 'solucao'   && <Solucao />}
      </main>
    </div>
  )
}
