import "./About.css";

export default function About() {
  return (
    <section id="about">
      <div className="about-container">
        <div className="about-header">
          <div className="about-icon-wrapper">
            <div className="about-icon-glow"></div>
            <div className="about-icon">
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
          </div>
          <h2>Sobre Mim</h2>
          <p>Conheça um pouco da minha trajetória</p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p>
              Sou estudante de Ciência da Computação no Centro Universitário Dom
              Helder Câmara, cursando o 4º período com previsão de formatura em
              2028.
            </p>
            <p>
               Como desenvolvedor, sigo focado em transformar problemas complexos 
               em sistemas otimizados e resilientes. Gosto de transformar código 
               em experiências completas para as pessoas; por isso, pretendo 
               me especializar em desenvolvimento backend. 
               Sou comunicativo e bastante criativo, busco estar em constante evolução 
               e me adapto rapidamente a novos desafios. 
               Atualmente, procuro minha primeira oportunidade como desenvolvedor, 
               trazendo proatividade, organização e uma vontade constante de evoluir.
            </p>
            <p>
              Além do desenvolvimento de software, possuo experiência sólida em consultoria
              de vendas direta com clientes, o que considero um diferencial por me permitir
              integrar habilidades comerciais à minha atuação como desenvolvedor.
            </p>

            <div className="about-tags">
              <span>C#</span>
              <span>.NET Core</span>
              <span>Java</span>
              <span>Spring Boot</span>
              <span>React</span>
              <span>JavaScript</span>
              <span>MySQL</span>
              <span>AWS</span>
              <span>Git</span>
              <span>AI</span>
            </div>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
              <h3>Backend</h3>
              <p>APIs REST com C# .NET Core e Java Spring Boot</p>
            </div>

            <div className="about-card">
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="m8 21 4-4 4 4" />
                <path d="M12 17v4" />
              </svg>
              <h3>Frontend</h3>
              <p>Interfaces modernas com React e JavaScript</p>
            </div>

            <div className="about-card">
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
              <h3>Cloud</h3>
              <p>Infraestrutura e arquitetura com AWS</p>
            </div>

            <div className="about-card">
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 20h9" />
                <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
              </svg>
              <h3>Boas Práticas</h3>
              <p>Clean Code, SOLID e arquitetura em camadas</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
