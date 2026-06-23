# Solver de Programação Linear — ENADE 2021
## Sistemas de Informação · Pesquisa Operacional

Aplicativo web para modelagem e resolução do problema de PL da questão do ENADE 2021.

---

## Opção 1 — HTML standalone (mais fácil)

Abra o arquivo `index-standalone.html` diretamente no navegador.
**Não precisa de instalação nenhuma.**

---

## Opção 2 — Projeto React + Vite

### Pré-requisitos
- Node.js 18+ instalado

### Instalação e execução
```bash
npm install
npm run dev
```
Acesse: http://localhost:5173

### Build para produção
```bash
npm run build
```
Os arquivos ficam em `/dist` e podem ser hospedados em qualquer servidor estático.

---

## Modelagem matemática

**Variáveis:**
- x = dias de operação da fábrica de Manaus
- y = dias de operação da fábrica do Sul

**Função objetivo:**
```
Min Z = 150.000x + 210.000y
```

**Restrições:**
```
4x + y  ≥ 8    (desktops)
x  + y  ≥ 6    (notebooks)
2x + 7y ≥ 28   (netbooks)
x, y    ≥ 0    (não-negatividade)
```

**Solução ótima:** x = 2, y = 4 → Z* = R$ 1.140.000

---

## Estrutura do projeto React

```
pl-solver/
├── index.html
├── vite.config.js
├── package.json
├── index-standalone.html   ← versão sem framework
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── components/
        ├── Modelagem.jsx
        ├── Solver.jsx
        ├── Grafico.jsx
        └── Solucao.jsx
```
