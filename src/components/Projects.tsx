import "./Projects.css";

export default function Projects() {
  const projects: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    github: string;
    site?: string;
    tagColor: string;
  }[] = [
    {
      title: "API REST — CRUD Java",
      description:
        "Aplicação desktop desenvolvida em Java com interface gráfica moderna usando Swing e tema FlatLaf. Integração com MySQL para persistência real de dados, arquitetura em camadas (Model, DAO, Service) e validação de formulários. Evoluiu de um sistema console para uma GUI robusta com tabela interativa e atualização em tempo real.",
      image: "/projeto-crud.png",
      tags: ["Java 17", "MySQL", "Swing", "FlatLaf", "Maven", "DAO Pattern"],
      github: "https://github.com/CarlosGeovane/sistema-cadastro-clientes-java",
      tagColor: "tag-blue",
    },
    {
      title: "Task Manager Web",
      description:
        "Aplicação web para gerenciamento de tarefas desenvolvida com JavaScript puro, sem necessidade de backend. Conta com persistência de dados via LocalStorage, interface responsiva com dark theme, empty state amigável e deploy via GitHub Pages.",
      image: "/projeto-taskmanager.png",
      tags: ["JavaScript", "HTML5", "CSS3", "LocalStorage", "GitHub Pages"],
      github: "https://github.com/CarlosGeovane/task-manager-web",
      site: "https://carlosgeovane.github.io/task-manager-web/",
      tagColor: "tag-pink",
    },
  ];

  return (
    <section id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <div className="projects-icon-wrapper">
            <div className="projects-icon-glow"></div>
            <div className="projects-icon">
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </div>
          </div>
          <h2>Projetos em Destaque</h2>
          <p>
            Aqui estão alguns dos meus projetos pessoais, experimentações e
            estudos
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.title}>
              <div className="project-img">
                <img src={project.image} alt={project.title} />
              </div>

              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className={project.tagColor}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-secondary"
                  >
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    View Code
                  </a>

                  {project.site && (
                    <a
                      href={project.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn project-btn-primary"
                    >
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                      Visit Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
