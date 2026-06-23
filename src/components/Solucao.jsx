export default function Solucao() {
  const producao = [
    { nome: 'Desktop',  manaus: 16000, sul: 8000,  total: 24000, demanda: 16000 },
    { nome: 'Notebook', manaus: 2000,  sul: 4000,  total: 6000,  demanda: 6000  },
    { nome: 'Netbook',  manaus: 4000,  sul: 28000, total: 32000, demanda: 28000 },
  ]
  const restricoes = [
    { nome: 'Desktop',    calculo: '4×2 + 1×4 = 12',  exigencia: '≥ 8',  ok: true },
    { nome: 'Notebook',   calculo: '2 + 4 = 6',        exigencia: '≥ 6',  ok: true },
    { nome: 'Netbook',    calculo: '2×2 + 7×4 = 32',   exigencia: '≥ 28', ok: true },
    { nome: 'Não-negat.', calculo: 'x=2, y=4',         exigencia: '≥ 0',  ok: true },
  ]

  return (
    <div>
      {/* Banner resultado */}
      <div style={{
        background: 'linear-gradient(135deg, #EAF3DE 0%, #E6F1FB 100%)',
        border: '1px solid #C0DD97',
        borderRadius: 'var(--radius)',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--green)', marginBottom: '4px' }}>
            ✓ SOLUÇÃO ÓTIMA ENCONTRADA
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '22px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>
            x = <span style={{ color: 'var(--blue)' }}>2 dias</span> &nbsp;|&nbsp; y = <span style={{ color: 'var(--green)' }}>4 dias</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--gray-text)', marginTop: '4px' }}>
            Manaus: 2 dias · Fábrica Sul: 4 dias
          </div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--gray-text)' }}>CUSTO MÍNIMO</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--blue)', lineHeight: 1.2 }}>R$ 1.140.000</div>
          <div style={{ fontSize: '12px', color: 'var(--gray-text)' }}>Z* = 150k×2 + 210k×4</div>
        </div>
      </div>

      {/* Métricas */}
      <div className="metrics">
        <div className="metric">
          <div className="metric-label">Custo Manaus</div>
          <div className="metric-value">R$ 300k</div>
          <div className="metric-sub">2 dias × R$ 150.000</div>
        </div>
        <div className="metric">
          <div className="metric-label">Custo Sul</div>
          <div className="metric-value">R$ 840k</div>
          <div className="metric-sub">4 dias × R$ 210.000</div>
        </div>
        <div className="metric accent">
          <div className="metric-label">Total mínimo</div>
          <div className="metric-value">R$ 1,14M</div>
          <div className="metric-sub">Valor ótimo Z*</div>
        </div>
      </div>

      {/* Verificação */}
      <p className="section-label" style={{ marginTop: '1.5rem' }}>Verificação das restrições</p>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Restrição</th>
              <th>Cálculo com x=2, y=4</th>
              <th>Exigência</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {restricoes.map(r => (
              <tr key={r.nome}>
                <td style={{ fontWeight: 500 }}>{r.nome}</td>
                <td style={{ fontFamily: 'var(--mono)', fontSize: '13px' }}>{r.calculo}</td>
                <td style={{ fontFamily: 'var(--mono)', fontSize: '13px' }}>{r.exigencia}</td>
                <td>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, padding: '2px 9px', borderRadius: '4px',
                    background: 'var(--green-light)', color: 'var(--green)',
                  }}>✓ atendida</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Produção */}
      <p className="section-label" style={{ marginTop: '1.5rem' }}>Produção total com x=2, y=4</p>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Manaus (×2 dias)</th>
              <th>Sul (×4 dias)</th>
              <th>Total</th>
              <th>Demanda</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {producao.map(p => (
              <tr key={p.nome}>
                <td style={{ fontWeight: 500 }}>{p.nome}</td>
                <td>{p.manaus.toLocaleString('pt-BR')}</td>
                <td>{p.sul.toLocaleString('pt-BR')}</td>
                <td style={{ fontWeight: 600 }}>{p.total.toLocaleString('pt-BR')}</td>
                <td>{p.demanda.toLocaleString('pt-BR')}</td>
                <td>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                    background: 'var(--green-light)', color: 'var(--green)',
                  }}>✓</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interpretação */}
      <div className="card" style={{ borderLeft: '3px solid var(--blue)', marginTop: '1rem' }}>
        <p className="section-label">Interpretação da solução</p>
        <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text)' }}>
          Para atender a demanda de <strong>16 mil desktops</strong>, <strong>6 mil notebooks</strong> e <strong>28 mil netbooks</strong>
          com o menor custo possível, a empresa deve operar a fábrica de{' '}
          <strong style={{ color: 'var(--blue)' }}>Manaus por 2 dias</strong> e a fábrica do{' '}
          <strong style={{ color: 'var(--green)' }}>Sul por 4 dias</strong>,
          totalizando um custo mínimo de <strong style={{ color: 'var(--blue)' }}>R$ 1.140.000,00</strong>.
        </p>
      </div>
    </div>
  )
}
