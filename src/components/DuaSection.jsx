import { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { GoldDivider, SectionHeader } from './Decorative';
import ScrollReveal from './ScrollReveal';
import './DuaSection.css';

export default function DuaSection() {
  const [duaCount, setDuaCount] = useState(() => {
    const saved = localStorage.getItem('wedding_dua_count');
    return saved ? parseInt(saved, 10) : 142;
  });
  const [blessed, setBlessed] = useState(false);
  const [particles, setParticles] = useState([]);

  const handleSendDua = (e) => {
    const newCount = duaCount + 1;
    setDuaCount(newCount);
    localStorage.setItem('wedding_dua_count', String(newCount));
    setBlessed(true);

    // Spawn floating blessing particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      symbol: i % 2 === 0 ? '🤲' : (i % 3 === 0 ? '✨' : '🤍'),
      dx: `${(Math.random() - 0.5) * 120}px`,
    }));

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 1500);
  };

  return (
    <section className="dua-section" id="blessings" aria-label="Duas and Blessings">
      <ScrollReveal>
        <SectionHeader
          arabic="دُعَاءٌ وَبَرَكَة"
          english="Duas & Sacred Blessings"
          subtitle="A prayer for love, peace, and eternal harmony"
        />

        <div className="dua-container">
          {/* Quranic Verse */}
          <div className="dua-card">
            <span className="dua-badge">
              <Sparkles size={13} aria-hidden="true" />
              The Sacred Bond
            </span>

            <div className="dua-arabic-verse">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </div>

            <p className="dua-translation">
              “And of His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them; and He placed between your hearts affection and mercy.”
            </p>

            <div className="dua-reference">
              — Surah Ar-Rum [30:21] —
            </div>
          </div>

          {/* Prophet's Sunnah Dua */}
          <div className="sunnah-dua-card">
            <div className="dua-badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--champagne)' }}>
              ✦ Sunnah Wedding Prayer ✦
            </div>

            <div className="sunnah-dua-arabic">
              بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </div>

            <div className="sunnah-dua-transliteration">
              “Bārak-Allāhu laka wa bāraka ‘alayka wa jama‘a baynakumā fī khayr”
            </div>

            <div className="sunnah-dua-meaning">
              “May Allah bless you, shower His blessings upon you, and unite you both in goodness.”
            </div>

            <GoldDivider symbol="☪" />

            {/* Interactive Dua Button */}
            <div className="bless-action-container">
              {particles.map(p => (
                <span
                  key={p.id}
                  className="floating-blessing"
                  style={{ '--dx': p.dx, left: '50%', top: '0' }}
                >
                  {p.symbol}
                </span>
              ))}

              <button
                type="button"
                className="bless-btn"
                onClick={handleSendDua}
                aria-label="Send a Dua to the couple"
              >
                <Heart size={16} fill="currentColor" aria-hidden="true" />
                <span>Send Your Dua 🤲</span>
              </button>

              <div className="bless-counter-text">
                ✦ <strong>{duaCount}</strong> blessings sent by beloved guests ✦
              </div>

              {blessed && (
                <div className="bless-toast" role="status">
                  <span>جزاك اللهُ خيرًا</span>
                  <span>• Your heartfelt dua has been sent!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

