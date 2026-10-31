import { useState, useEffect, useRef } from 'react';
import { weddingConfig } from '../weddingConfig';
import './EnvelopeScreen.css';

// Sound effect generator using standard Web Audio API (no external file needed, zero load issues)
function playHarpChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Notes of a pleasant pentatonic wedding chime: F#5, A#5, C#6, F6
    const notes = [739.99, 932.33, 1108.73, 1396.91];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.12);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + index * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.12);
      osc.stop(ctx.currentTime + index * 0.12 + 1.3);
    });
  } catch (err) {
    // Graceful fallback if audio blocked
  }
}

const GOLD_SPARKLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 6.5) % 90}%`,
  top: `${12 + (i * 11) % 76}%`,
  size: `${4 + (i % 4) * 2.5}px`,
  delay: `${(i * 0.4) % 4}s`,
  duration: `${4 + (i % 3) * 2}s`,
}));

export default function EnvelopeScreen({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // idle | cracking | opening | letter-rising | done
  const [sparkles, setSparkles] = useState([]);
  const timeoutRefs = useRef([]);

  const schedule = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timeoutRefs.current.push(id);
    return id;
  };

  useEffect(() => () => timeoutRefs.current.forEach(clearTimeout), []);

  const handleOpen = () => {
    if (phase !== 'idle') return;

    // Play subtle royal chime sound
    playHarpChime();

    // Trigger burst sparkles
    const burst = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      angle: (i / 12) * 360,
      dist: 50 + Math.random() * 50,
      size: 4 + Math.random() * 5,
    }));
    setSparkles(burst);

    setPhase('cracking');

    schedule(() => setPhase('opening'), 450);
    schedule(() => setPhase('letter-rising'), 1000);
    schedule(() => {
      setPhase('done');
      onOpen();
    }, 2500);
  };

  return (
    <div
      className={`envelope-screen${phase === 'done' ? ' fade-out' : ''}`}
      aria-label="Royal Islamic Wedding Invitation Envelope"
    >
      {/* Floating golden stars/sparks in background */}
      {GOLD_SPARKLES.map(s => (
        <div
          key={s.id}
          className="gold-sparkle-dot"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}

      <div className="envelope-wrapper">
        {/* Header with Bismillah */}
        <div className="envelope-header-text">
          <div className="envelope-royal-crown">
            <svg width="34" height="20" viewBox="0 0 34 20" fill="none" aria-hidden="true">
              <path d="M17 2 L22 10 L30 4 L27 18 L7 18 L4 4 L12 10 Z" fill="#C9A84C" opacity="0.85"/>
              <circle cx="17" cy="2" r="1.5" fill="#FFF2BD"/>
              <circle cx="4" cy="4" r="1.2" fill="#FFF2BD"/>
              <circle cx="30" cy="4" r="1.2" fill="#FFF2BD"/>
            </svg>
          </div>
          <div className="envelope-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="envelope-title-tag">Royal Wedding Invitation</div>
          <div className="envelope-names-preview">{weddingConfig.groom.name} &amp; {weddingConfig.bride.name}</div>
        </div>

        {/* Envelope 3D Container */}
        <div
          className={`envelope-3d-box${phase !== 'idle' ? ' is-active' : ''}`}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          aria-label="Tap to break wax seal and open invitation"
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
        >
          {/* Back pocket */}
          <div className="envelope-back-wall">
            <div className="envelope-lining-pattern" />
          </div>

          {/* Letter / Invitation Card emerging from inside */}
          <div className={`letter-card${phase === 'letter-rising' || phase === 'done' ? ' risen' : ''}`}>
            <div className="letter-inner">
              <div className="letter-arch-mini">
                <svg viewBox="0 0 80 40" fill="none">
                  <path d="M10 40 Q10 10 40 5 Q70 10 70 40" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                  <circle cx="40" cy="5" r="2.5" fill="#C9A84C"/>
                </svg>
              </div>
              <div className="letter-arabic">بِسْمِ اللَّهِ</div>
              <div className="letter-title">The Wedding Of</div>
              <div className="letter-couple-names">{weddingConfig.coupleInitials}</div>
              <div className="letter-divider-gold">✦ ❧ ✦</div>
              <div className="letter-date-line">{weddingConfig.nikkah.day} • {weddingConfig.nikkah.date}</div>
            </div>
          </div>

          {/* Envelope Front Left & Right Folds */}
          <div className="envelope-side-fold left" />
          <div className="envelope-side-fold right" />

          {/* Envelope Bottom Triangle Fold */}
          <div className="envelope-bottom-fold">
            <div className="gold-trim-edge" />
          </div>

          {/* Top Flap (Opens backward in 3D) */}
          <div className={`envelope-top-flap${phase === 'opening' || phase === 'letter-rising' || phase === 'done' ? ' opened' : ''}`}>
            <div className="top-flap-outer">
              <div className="gold-crease-line" />
            </div>
            <div className="top-flap-inner">
              <div className="envelope-lining-pattern" />
            </div>
          </div>

          {/* Royal Golden Wax Seal */}
          <div
            className={`wax-seal-wrapper${phase === 'opening' || phase === 'letter-rising' || phase === 'done' ? ' seal-lifted' : ''}`}
          >
            {/* Burst particle ring on tap */}
            {phase === 'cracking' && sparkles.map(sp => (
              <span
                key={sp.id}
                className="seal-sparkle-burst"
                style={{
                  '--angle': `${sp.angle}deg`,
                  '--dist': `${sp.dist}px`,
                  width: `${sp.size}px`,
                  height: `${sp.size}px`,
                }}
              />
            ))}

            <div className={`wax-seal-stamp${phase === 'cracking' ? ' cracking' : ''}`}>
              <div className="wax-outer-scallops" />
              <div className="wax-inner-core">
                <div className="wax-ring-filigree" />
                <span className="wax-initials">{weddingConfig.coupleInitials}</span>
                <span className="wax-star-bottom">☪</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Prompt */}
        <div className="envelope-footer-prompt">
          {phase === 'idle' && (
            <div className="tap-badge">
              <span className="tap-finger-icon" aria-hidden="true">✨</span>
              <span className="tap-text">Tap the Golden Seal to Open</span>
              <span className="tap-finger-icon" aria-hidden="true">✨</span>
            </div>
          )}
          {(phase === 'cracking' || phase === 'opening') && (
            <div className="tap-badge opening">
              <span className="tap-text">Opening Your Invitation…</span>
            </div>
          )}
          {phase === 'letter-rising' && (
            <div className="tap-badge opening">
              <span className="tap-text">Welcome with Duas &amp; Joy 🤲</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
