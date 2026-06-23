export default function Modelagem({ onNext }) {
  return (
    <div>
      <p className="section-label">Variáveis de decisão</p>
      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '18px', fontWeight: 600, color: 'var(--blue)', minWidth: '24px' }}>x</span>
            <span style={{ fontSize: '14px' }}>= número de dias de operação da fábrica de <strong style={{ fontWeight: 600, color: 'var(--blue)' }}>Manaus</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '18px', fontWeight: 600, color: 'var(--green-mid)', minWidth: '24px' }}>y</span>
            <span style={{ fontSize: '14px' }}>= número de dias de operação da fábrica do <strong style={{ fontWeight: 600, color: 'var(--green)' }}>Sul</strong></span>
          </div>
        </div>
      </div>

      <p className="section-label" style={{ marginTop: '1.5rem' }}>Função objetivo — minimizar custo total</p>
      <div className="card" style={{ borderLeft: '3px solid var(--blue)' }}>
        <div className="formula">
          Min Z = <span className="var-x">150.000x</span> + <span className="var-y">210.000y</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--gray-text)', marginTop: '6px' }}>
          Custo diário: Manaus R$ 150.000 · Sul R$ 210.000
        </p>
      </div>

      <p className="section-label" style={{ marginTop: '1.5rem' }}>Restrições de demanda mínima</p>
      <div className="card">
        <div style={{ marginBottom: '12px' }}>
          <span className="badge badge-blue">Desktop</span>
          <span className="formula" style={{ display: 'inline' }}>
            8.000<span className="var-x">x</span> + 2.000<span className="var-y">y</span> <span className="ineq">≥</span> 16.000
          </span>
          <div style={{ fontSize: '12px', color: 'var(--gray-text)', marginTop: '2px', paddingLeft: '72px' }}>
            simplificado: <code style={{ fontFamily: 'var(--mono)' }}>4x + y ≥ 8</code>
          </div>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <span className="badge badge-amber">Notebook</span>
          <span className="formula" style={{ display: 'inline' }}>
            1.000<span className="var-x">x</span> + 1.000<span className="var-y">y</span> <span className="ineq">≥</span> 6.000
          </span>
          <div style={{ fontSize: '12px', color: 'var(--gray-text)', marginTop: '2px', paddingLeft: '72px' }}>
            simplificado: <code style={{ fontFamily: 'var(--mono)' }}>x + y ≥ 6</code>
          </div>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <span className="badge badge-green">Netbook</span>
          <span className="formula" style={{ display: 'inline' }}>
            2.000<span className="var-x">x</span> + 7.000<span className="var-y">y</span> <span className="ineq">≥</span> 28.000
          </span>
          <div style={{ fontSize: '12px', color: 'var(--gray-text)', marginTop: '2px', paddingLeft: '72px' }}>
            simplificado: <code style={{ fontFamily: 'var(--mono)' }}>2x + 7y ≥ 28</code>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--gray-border)', paddingTop: '12px' }}>
          <span className="formula"><span className="var-x">x</span> <span className="ineq">≥</span> 0 &nbsp;&nbsp;|&nbsp;&nbsp; <span className="var-y">y</span> <span className="ineq">≥</span> 0</span>
          <span style={{ fontSize: '12px', color: 'var(--gray-text)', marginLeft: '12px' }}>não-negatividade</span>
        </div>
      </div>

      <p className="section-label" style={{ marginTop: '1.5rem' }}>Tabela de dados</p>
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Fábrica Manaus (un/dia)</th>
              <th>Fábrica Sul (un/dia)</th>
              <th>Demanda mínima</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><span className="badge badge-blue">Desktop</span></td><td>8.000</td><td>2.000</td><td>16.000</td></tr>
            <tr><td><span className="badge badge-amber">Notebook</span></td><td>1.000</td><td>1.000</td><td>6.000</td></tr>
            <tr><td><span className="badge badge-green">Netbook</span></td><td>2.000</td><td>7.000</td><td>28.000</td></tr>
            <tr style={{ background: 'var(--blue-light)' }}>
              <td style={{ color: 'var(--gray-text)', fontSize: '12px', fontWeight: 600 }}>CUSTO DIÁRIO</td>
              <td style={{ fontWeight: 600, color: 'var(--blue)' }}>R$ 150.000</td>
              <td style={{ fontWeight: 600, color: 'var(--green)' }}>R$ 210.000</td>
              <td style={{ color: 'var(--gray-text)' }}>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="next-btn" onClick={onNext}>
        Ir para o Solver →
      </button>
    </div>
  )
}
