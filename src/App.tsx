import './index.css'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Career from './components/Career'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Nav from './components/Nav'
import Footer from './components/Footer'

function App() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Career />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}

export default App