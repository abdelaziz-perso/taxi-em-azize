import { useEffect } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Pricing from './components/Pricing'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import WelcomeAssistant from './components/WelcomeAssistant'
import SEO from './components/SEO'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100,
    });
  }, []);

  return (
    <LanguageProvider>
      <SEO />
      <div className="app">
        <ScrollProgress />
        <WelcomeAssistant />
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
