import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KPIStrip from './components/KPIStrip';
import ProjectsSection from './components/ProjectsSection';
import TechStackSection from './components/TechStackSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <KPIStrip />
        <ProjectsSection />
        <TechStackSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
