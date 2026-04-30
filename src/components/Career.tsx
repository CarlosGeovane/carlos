import './Career.css'

export default function Career() {
  return (
    <section id="career">
      <div className="career-container">

        <div className="career-header">
          <div className="career-icon-wrapper">
            <div className="career-icon-glow"></div>
            <div className="career-icon">
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 3h-8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>
              </svg>
            </div>
          </div>
          <h2>Carreira</h2>
          <p>Minha trajetória profissional até aqui</p>
        </div>

        <div className="career-timeline">

          {/* Eagle Test AI */}
          <div className="career-item">
            <div className="career-dot"></div>
            <div className="career-card">
              <div className="career-period">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 2v4M16 2v4"/>
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <path d="M3 10h18"/>
                </svg>
                Fev 2025 — Mar 2026
              </div>

              <div className="career-icon-small">
                <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m18 16 4-4-4-4"/>
                  <path d="m6 8-4 4 4 4"/>
                  <path d="m14.5 4-5 16"/>
                </svg>
              </div>

              <h3>Eagle Test AI</h3>
              <div className="career-role">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 3h-8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>
                </svg>
                Desenvolvedor backend | estágio
              </div>

              <p>
                Desenvolvimento e manutenção de funcionalidades para sistemas internos
                utilizando C# e .NET Core. Implementação de automações de processos que
                otimizaram o fluxo de trabalho da equipe e reduziram erros manuais.
                Execução de testes de integração e unitários para garantir a estabilidade
                das aplicações em produção.
              </p>

              <div className="career-tags">
                <span>C#</span>
                <span>.NET Core</span>
                <span>Testes</span>
                <span>Automação</span>
              </div>

              <div className="career-badge career-badge-dev">Desenvolvimento</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}