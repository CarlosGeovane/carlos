import './Footer.css'

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = [
    { id: 'about',     label: 'Sobre' },
    { id: 'education', label: 'Educação' },
    { id: 'skills',    label: 'Skills' },
    { id: 'career',    label: 'Carreira' },
    { id: 'projects',  label: 'Projetos' },
    { id: 'contact',   label: 'Contato' },
  ]

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-grid">

          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-logo">
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
                </svg>
              </div>
              <div>
                <div className="footer-name">Carlos Geovane</div>
                <div className="footer-tagline">FULLSTACK DEVELOPER</div>
              </div>
            </div>

            <p className="footer-desc">
              Desenvolvedor backend comunicativo e bastante criativo, em constante evolução, pronto e apto para novos desafios.
            </p>

            <div className="footer-socials">
              <a href="https://github.com/CarlosGeovane" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="GitHub">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/carlosgeovanebelan" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="LinkedIn">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="mailto:carlosgeovaneoficiall@gmail.com" className="footer-social-btn" title="Email">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navegação</h4>
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="footer-col">
            <h4>Tech</h4>
            <p className="footer-tech-text">Desenvolvido com React, TypeScript e Vite</p>
            <p className="footer-tech-cursor">⚡ Powered by Claude & VS Code</p>
            <a href="https://github.com/CarlosGeovane/carlos-geovane" target="_blank" rel="noopener noreferrer" className="footer-source">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              View Source
            </a>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <a href="https://github.com/CarlosGeovane" target="_blank" rel="noopener noreferrer">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/carlosgeovanebelan" target="_blank" rel="noopener noreferrer">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
            <a href="mailto:carlosgeovaneoficiall@gmail.com">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                <rect x="2" y="4" width="20" height="16" rx="2"/>
              </svg>
              Email
            </a>
            <div className="footer-location">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Belo Horizonte, MG, Brasil
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2025 Carlos Geovane. Criado com ❤️</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="m18 15-6-6-6 6"/>
            </svg>
            Voltar ao topo
          </button>
        </div>

      </div>
    </footer>
  )
}