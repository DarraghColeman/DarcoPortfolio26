import { memo } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Showreel from './sections/Showreel';
import Projects from './sections/Projects';
import Experiences from './sections/Experiences';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className='container mx-auto max-w-7xl 2xl:max-w-[100rem]'>
      <Navbar />
      <Hero />
      <About />
      <Showreel />
      <Projects />
      <Experiences />
      <Contact />
      <Footer />
    </div>
  );
}

export default memo(App);