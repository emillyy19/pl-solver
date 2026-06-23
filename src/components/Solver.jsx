import { useState } from 'react'

const CANDIDATES = [
  { label: 'A', x: 0,  y: 8,  desc: 'Interseção x=0 com Desktop (4x+y=8)' },
  { label: 'B', x: 0,  y: 6,  desc: 'Interseção x=0 com Notebook (x+y=6)' },
  { label: 'C', x: 2,  y: 4,  desc: 'Interseção Notebook ∩ Netbook' },
  { label: 'D', x: 6,  y: 0,  desc: 'Interseção y=0 com Notebook (x+y=6)' },
  { label: 'E', x: 14, y: 0,  desc: 'Interseção y=0 com Netbook (2x+7y=28)' },
]

function isFeasible(x, y) {
  return (
    4 * x + y >= 8 &&
    x + y >= 6 &&
    2 * x + 7 * y >= 28 &&
    x >= 0 && y >= 0
  )
}

function cost(x, y) { return 150000 * x + 210000 * y }

function fmt(n) { return n.toLocaleString('pt-BR') }

export default function Solver({ onNext }) {
  const [revealed, setRevealed] = useState([])
  const [solved, setSolved] = useState(false)

  const reveal = (label) => {
    if (!revealed.includes(label)) setRevealed([...revealed, label])
  }

  const runAll = () => {
    setRevealed(CANDIDATES.map(c => c.label))
    setSolved(true)
  }

  const feasible = CANDIDATES.filter(c => isFeasible(c.x, c.y))
  const optimal  = feasible.reduce((best, c) => cost(c.x, c.y) < cost(best.x, best.y) ? c : best, feasible[0] ?? null)

  return (
    <div>
      <p className="section-label">Método dos vértices — avaliação dos pontos extremos</p>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '13px', color: 'var(--gray-text)', lineHeight: 1.6 }}>
          O Teorema Fundamental da Programação Linear garante que a solução ótima
          ocorre em um dos vértices da região viável. Avalie cada candidato abaixo.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
        {CANDIDATES.map(c => {
          const isRevealed = revealed.includes(c.label)
          const feasible   = isFeasible(c.x, c.y)
          const z          = cost(c.x, c.y)
          const isOptimal  = optimal && c.label === optimal.label

          return (
            <div
              key={c.label}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px',
                border: `1px solid ${isOptimal && isRevealed ? '#C0DD97' : 'var(--gray-border)'}`,
                borderRadius: 'var(--radius-sm)',
                background: isOptimal && isRevealed ? 'var(--green-light)' : 'var(--gray-bg)',
                cursor: isRevealed ? 'default' : 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => !isRevealed && reveal(c.label)}
            >
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: '50%',
                background: isOptimal && isRevealed ? 'var(--green)' : 'var(--blue-light)',
                color: isOptimal && isRevealed ? '#fff' : 'var(--blue)',
                fontWeight: 700, fontSize: '13px', flexShrink: 0,
              }}>{c.label}</span>

              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 500 }}>
                  x = {c.x}, y = {c.y}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--gray-text)', marginTop: '2px' }}>{c.desc}</div>
              </div>

              {isRevealed ? (
                <>
                  <span style={{
                    fontSize: '12px', fontWeight: 600, padding: '3px 9px', borderRadius: '4px',
                    background: feasible ? 'var(--green-light)' : 'var(--coral-light)',
                    color: feasible ? 'var(--green)' : 'var(--coral)',
                  }}>
                    {feasible ? '✓ viável' : '✗ inviável'}
                  </span>
                  {feasible && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 600, color: isOptimal ? 'var(--green)' : 'var(--text)', minWidth: '110px', textAlign: 'right' }}>
                      R$ {fmt(z)}
                      {isOptimal && ' ⭐'}
                    </span>
                  )}
                </>
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--blue)', fontWeight: 500 }}>
                  clique para avaliar →
                </span>
              )}
            </div>
          )
        })}
      </div>

      <button className="next-btn" style={{ background: 'var(--gray-text)', marginRight: '10px' }} onClick={runAll}>
        ▶ Resolver automaticamente
      </button>

      {solved && optimal && (
        <div className="result-ok" style={{ marginTop: '1rem' }}>
          <h3>✓ Solução encontrada — Ponto {optimal.label}</h3>
          <p>
            <strong>x = {optimal.x} dias</strong> (Manaus) &nbsp;|&nbsp; <strong>y = {optimal.y} dias</strong> (Sul)<br />
            Custo mínimo: <strong>Z* = R$ {fmt(cost(optimal.x, optimal.y))}</strong>
          </p>
        </div>
      )}

      <button className="next-btn" onClick={onNext} style={{ display: 'block', marginTop: '1rem' }}>
        Ver gráfico →
      </button>
    </div>
  )
}
