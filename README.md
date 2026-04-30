<div align="center">

# 🚀 Carlos Geovane — Portfólio Pessoal

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r184-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**Site pessoal e portfólio de Carlos Geovane Belan — Desenvolvedor Fullstack**

[🌐 Ver Site](#) · [📧 Contato](mailto:carlosgeovanebelan@gmail.com) · [💼 LinkedIn](https://linkedin.com/in/carlosgeovanebelan) · [🐙 GitHub](https://github.com/CarlosGeovane)

</div>

---

## ✨ Sobre o Projeto

Portfólio pessoal desenvolvido do zero com foco em performance, design moderno e experiência imersiva. O destaque é o **hero interativo com partículas 3D** em tempo real — renderizado via WebGL com shaders GLSL customizados usando Three.js, respondendo ao movimento do mouse do usuário.

---

## 🎯 Seções

| Seção | Descrição |
|-------|-----------|
| **Hero** | Animação de partículas 3D interativa com Three.js + WebGL |
| **Sobre Mim** | Trajetória, foco profissional e stack principal |
| **Educação** | Formação acadêmica e certificações |
| **Skills** | Stack técnico com barras de progresso por categoria |
| **Carreira** | Experiências e linha do tempo profissional |
| **Projetos** | Projetos em destaque com links para GitHub e demo |
| **Contato** | Formulário e links de redes sociais |

---

## 🛠️ Stack Técnico

**Frontend**
- [React 19](https://react.dev/) + [TypeScript 6](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/) — build tool ultrarrápida
- CSS Modules com efeito **glassmorphism** customizado

**3D & Animações**
- [Three.js r184](https://threejs.org/) — renderização WebGL
- GPGPU via `WebGLRenderTarget` para simulação de partículas
- Shaders GLSL customizados (Simplex Noise, raycasting com mouse)

---

## 🚀 Rodando Localmente

```bash
# Clone o repositório
git clone https://github.com/CarlosGeovane/carlos-geovane.git
cd carlos-geovane

# Instale as dependências
yarn install
# ou: npm install

# Rode em modo desenvolvimento
yarn dev
# ou: npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## 📦 Build para Produção

```bash
yarn build
# ou: npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

---

## 🌐 Deploy na Vercel

Este projeto está configurado para deploy automático na Vercel.

1. Importe o repositório em [vercel.com](https://vercel.com/)
2. Framework preset: **Vite**
3. Build command: `yarn build`
4. Output directory: `dist`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CarlosGeovane/carlos-geovane)

---

## 📁 Estrutura do Projeto

```
carlos-geovane/
├── public/
│   ├── avatar.jpg
│   ├── favicon.svg
│   ├── projeto-crud.png
│   ├── projeto-taskmanager.png
│   └── CurriculoCarlosGeovane.pdf
├── src/
│   ├── components/
│   │   ├── Hero.tsx          # Animação Three.js + partículas GPGPU
│   │   ├── About.tsx
│   │   ├── Education.tsx
│   │   ├── Skills.tsx
│   │   ├── Career.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── glass.css         # Efeito glassmorphism
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

---

## 📬 Contato

<div>

**Carlos Geovane Belan**
Estudante de Ciência da Computação — Dom Helder Câmara (2028)
Desenvolvedor Fullstack | Backend Focus

[![LinkedIn](https://img.shields.io/badge/LinkedIn-carlosgeovanebelan-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/carlosgeovanebelan)
[![GitHub](https://img.shields.io/badge/GitHub-CarlosGeovane-181717?style=flat-square&logo=github)](https://github.com/CarlosGeovane)

</div>

---

<div align="center">

Feito com ☕ e muito código por **Carlos Geovane**

</div>