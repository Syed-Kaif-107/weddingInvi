import { useState, useRef } from 'react';
import EnvelopeScreen from './components/EnvelopeScreen';
import HeroSection from './components/HeroSection';
import EventCards from './components/EventCards';
import Countdown from './components/Countdown';
import DuaSection from './components/DuaSection';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const mainRef = useRef(null);

  const handleOpen = () => {
    setOpened(true);
    // Remove envelope from DOM after animation completes
    setTimeout(() => setShowEnvelope(false), 1400);
    // Scroll to top smoothly
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 600);
  };

  const handleReopen = () => {
    setOpened(false);
    setShowEnvelope(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Fixed background texture */}
      <div className="bg-pattern" aria-hidden="true" />

      {/* Envelope intro screen */}
      {showEnvelope && <EnvelopeScreen onOpen={handleOpen} />}

      {/* Main invitation — revealed after envelope opens */}
      <main
        ref={mainRef}
        className={`main-content${opened ? ' visible' : ''}`}
        aria-label="Wedding Invitation"
        aria-hidden={!opened}
      >
        <HeroSection />
        <div className="section-sep" />
        <EventCards />
        <Countdown />
        <div className="section-sep" />
        <DuaSection />
        <Footer onReopen={handleReopen} />
      </main>
    </>
  );
}
