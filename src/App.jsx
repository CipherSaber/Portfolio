import React from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Experiences from "./sections/Experiences.jsx";
import Certifications from "./sections/Certifications.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from './sections/Footer.jsx';

const App = () => {
  return (
    <div className="relative">
      {/* Navbar - Full width */}
      <div className="container mx-auto max-w-7xl relative">
        <Navbar />
      </div>
      
      {/* Hero - Full width */}
      <Hero />
      
      {/* Other sections - Contained width */}
      <div className="container mx-auto max-w-7xl relative">
        <About />
        <Projects />
        <Experiences />
        <Certifications />
        <Contact />
        <Footer/>
      </div>
    </div>
  );
};

export default App;
