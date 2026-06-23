import { useEffect, useRef } from 'react'
import {
  Chart,
  LineController, ScatterController,
  LinearScale, PointElement, LineElement,
  Tooltip, Legend, Filler
} from 'chart.js'

Chart.register(LineController, ScatterController, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

export default function Grafico({ onNext }) {
  const canvasRef = useRef(null)
  const chartRef  = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    if (chartRef.current) chartRef.current.destroy()

    const xs = Array.from({ length: 17 }, (_, i) => i)

    // Restrições (forma simplificada)
    // Desktop:  4x + y = 8  → y = 8 - 4x
    // Notebook: x + y = 6   → y = 6 - x
    // Netbook:  2x + 7y = 28 → y = (28-2x)/7

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: xs,
        datasets: [
          {
            label: 'Desktop: 4x+y=8',
            data: xs.map(x => ({ x, y: 8 - 4 * x })),
            borderColor: '#378ADD',
            borderWidth: 2.5,
            pointRadius: 0,
            fill: false,
            tension: 0,
          },
          {
            label: 'Notebook: x+y=6',
            data: xs.map(x => ({ x, y: 6 - x })),
            borderColor: '#BA7517',
            borderWidth: 2.5,
            pointRadius: 0,
            fill: false,
            tension: 0,
          },
          {
            label: 'Netbook: 2x+7y=28',
            data: xs.map(x => ({ x, y: (28 - 2 * x) / 7 })),
            borderColor: '#639922',
            borderWidth: 2.5,
            pointRadius: 0,
            fill: false,
            tension: 0,
          },
          {
            label: 'Ponto ótimo (2, 4)',
            data: [{ x: 2, y: 4 }],
            type: 'scatter',
            pointRadius: 10,
            pointHoverRadius: 12,
            pointBackgroundColor: '#D85A30',
            pointBorderColor: '#fff',
            pointBorderWidth: 3,
            showLine: false,
          },
          // Outros vértices viáveis
          {
            label: 'Vértices viáveis',
            data: [{ x: 0, y: 8 }, { x: 6, y: 0 }, { x: 14, y: 0 }],
            type: 'scatter',
            pointRadius: 7,
            pointHoverRadius: 9,
            pointBackgroundColor: '#888780',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            showLine: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        parsing: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.datasetIndex === 3) return '★ Ótimo: x=2, y=4 → Z=R$1.140.000'
                return `x=${ctx.parsed.x.toFixed(1)}, y=${ctx.parsed.y.toFixed(1)}`
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            min: -0.5, max: 16,
            title: { display: true, text: 'x — dias Manaus', color: '#5F5E5A', font: { size: 12 } },
            grid: { color: 'rgba(0,0,0,0.06)' },
            ticks: { stepSize: 2 },
          },
          y: {
            type: 'linear',
            min: -0.5, max: 10,
            title: { display: true, text: 'y — dias Sul', color: '#5F5E5A', font: { size: 12 } },
            grid: { color: 'rgba(0,0,0,0.06)' },
            ticks: { stepSize: 1 },
          },
        },
      },
    })

    return () => { if (chartRef.current) chartRef.current.destroy() }
  }, [])

  return (
    <div>
      <p className="section-label">Região viável e ponto ótimo</p>

      <div className="card" style={{ padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ position: 'relative', width: '100%', height: '360px' }}>
          <canvas ref={canvasRef} role="img" aria-label="Gráfico das restrições de programação linear com ponto ótimo em x=2, y=4" />
        </div>
      </div>

      {/* Legenda manual */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '12px', color: 'var(--gray-text)', marginBottom: '1.5rem' }}>
        {[
          { color: '#378ADD', label: 'Desktop: 4x+y=8', dash: true },
          { color: '#BA7517', label: 'Notebook: x+y=6', dash: true },
          { color: '#639922', label: 'Netbook: 2x+7y=28', dash: true },
          { color: '#D85A30', label: 'Ponto ótimo (2,4)', dot: true },
          { color: '#888780', label: 'Outros vértices', dot: true },
        ].map(l => (
          <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {l.dot
              ? <span style={{ width: 12, height: 12, borderRadius: '50%', background: l.color, display: 'inline-block', border: '2px solid #fff', boxShadow: `0 0 0 1px ${l.color}` }} />
              : <span style={{ width: 20, height: 3, background: l.color, display: 'inline-block', borderRadius: '2px' }} />
            }
            {l.label}
          </span>
        ))}
      </div>

      <div className="card" style={{ borderLeft: '3px solid var(--coral)' }}>
        <p style={{ fontSize: '13px', color: 'var(--gray-text)', lineHeight: 1.7 }}>
          A <strong style={{ color: 'var(--coral)' }}>região viável</strong> é o conjunto de pontos que satisfazem
          simultaneamente todas as restrições (acima/à direita das três retas).
          O <strong>ponto ótimo ★ (2, 4)</strong> é o vértice de menor custo dentro dessa região.
        </p>
      </div>

      <button className="next-btn" onClick={onNext}>
        Ver solução ótima →
      </button>
    </div>
  )
}
