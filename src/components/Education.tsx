import "./Education.css";

export default function Education() {
  return (
    <section id="education">
      <div className="education-container">
        <div className="education-header">
          <div className="education-icon-wrapper">
            <div className="education-icon-glow"></div>
            <div className="education-icon">
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M22 10v6M6 12.5V16a6 3 0 0012 0v-3.5" />
                <path d="M21.42 10.922a1 1 0 00-.019-1.838L12.83 5.18a2 2 0 00-1.66 0L2.6 9.08a1 1 0 000 1.832l8.57 3.908a2 2 0 001.66 0z" />
              </svg>
            </div>
          </div>
          <h2>Educação</h2>
          <p>Minha base acadêmica</p>
          <a href="/CurriculoCarlosGeovane.pdf" download className="btn-download">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 10v6m0 0l-3-3m3 3l3-3" />
              <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
            Baixar Currículo
          </a>
        </div>

        <div className="education-timeline">
          {/* Faculdade */}
          <div className="education-item">
            <div className="education-dot"></div>
            <div className="education-card">
              <div className="education-period">
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 2v4M16 2v4" />
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                Jan 2023 — Dez 2028
              </div>
              <div className="education-icon-small">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 10v6M6 12.5V16a6 3 0 0012 0v-3.5" />
                  <path d="M21.42 10.922a1 1 0 00-.019-1.838L12.83 5.18a2 2 0 00-1.66 0L2.6 9.08a1 1 0 000 1.832l8.57 3.908a2 2 0 001.66 0z" />
                </svg>
              </div>
              <h3>Bacharelado em Ciência da Computação</h3>
              <div className="education-institution">
                Centro Universitário Dom Helder Câmara
              </div>
              <div className="education-badge">Em andamento</div>
            </div>
          </div>

          {/* E.M. */}
          <div className="education-item">
            <div className="education-dot"></div>
            <div className="education-card">
              <div className="education-period">
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 2v4M16 2v4" />
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                Dez 2018
              </div>
              <div className="education-icon-small">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 10v6M6 12.5V16a6 3 0 0012 0v-3.5" />
                  <path d="M21.42 10.922a1 1 0 00-.019-1.838L12.83 5.18a2 2 0 00-1.66 0L2.6 9.08a1 1 0 000 1.832l8.57 3.908a2 2 0 001.66 0z" />
                </svg>
              </div>
              <h3>Colégio Inter Ação</h3>
              <p>Ensino Médio Completo.</p>
              <div className="education-badge education-badge-done">
                Concluído
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
