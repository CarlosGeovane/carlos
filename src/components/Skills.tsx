import './Skills.css'

export default function Skills() {
  const groups = [
    {
      title: 'Linguagens de Programação',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
        </svg>
      ),
      skills: [
        { name: 'Java', level: 75 },
        { name: 'C#', level: 75 },
        { name: 'JavaScript', level: 70 },
        { name: 'MySQL', level: 70 },
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        </svg>
      ),
      skills: [
        { name: 'Cloud', level: 65 },
        { name: 'AWS Cloud', level: 65 },
        { name: 'Azure Cloud', level: 55 },
      ],
    },
    {
      title: 'IA & Produtividade',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
          <path d="M20 3v4"/><path d="M22 5h-4"/>
        </svg>
      ),
      skills: [
        { name: 'Claude', level: 70 },
        { name: 'GitHub Copilot', level: 80 },
      ],
    },
    {
      title: 'Frameworks & Ferramentas',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      skills: [
        { name: 'Spring Boot', level: 75 },
        { name: '.NET Core', level: 75 },
        { name: 'React', level: 70 },
        { name: 'Next.js', level: 55 },
        { name: 'Vite', level: 65 },
        { name: 'Git / GitHub', level: 80 },
      ],
    },
    {
      title: 'Habilidades de Software',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
        </svg>
      ),
      skills: [
        { name: 'Software Architecture', level: 70 },
        { name: 'Clean Code / SOLID', level: 75 },
        { name: 'Criatividade & Inovação', level: 90 },
        { name: 'Comunicação', level: 85 },
      ],
    },
    {
      title: 'Línguas',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
          <path d="M2 12h20"/>
        </svg>
      ),
      skills: [
        { name: 'Português', level: 100 },
        { name: 'Inglês', level: 50 },
      ],
    },
  ]

  return (
    <section id="skills">
      <div className="skills-container">

        <div className="skills-header">
          <div className="skills-icon-wrapper">
            <div className="skills-icon-glow"></div>
            <div className="skills-icon">
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
          </div>
          <h2>Skills</h2>
          <p>Meu stack principal ⚡</p>
        </div>

        <div className="skills-grid">
          {groups.map((group) => (
            <div className="skills-card" key={group.title}>
              <div className="skills-card-title">
                {group.icon}
                {group.title}
              </div>
              {group.skills.map((skill) => (
                <div className="skill-bar" key={skill.name}>
                  <div className="skill-bar-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-val">{skill.level}%</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}