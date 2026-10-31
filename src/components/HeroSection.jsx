import { weddingConfig } from '../weddingConfig';
import { GoldDivider, IslamicArch } from './Decorative';
import ScrollReveal from './ScrollReveal';
import './HeroSection.css';

// Corner SVG flourish
function CornerFlourish({ className }) {
  return (
    <svg
      className={`card-corner ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 2 L18 2 Q22 2 22 6 L22 16" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <path d="M2 2 L2 18 Q2 22 6 22 L16 22" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <circle cx="2" cy="2" r="2" fill="#C9A84C" opacity="0.8"/>
      <circle cx="22" cy="16" r="1.5" fill="#C9A84C" opacity="0.5"/>
      <circle cx="16" cy="22" r="1.5" fill="#C9A84C" opacity="0.5"/>
    </svg>
  );
}

export default function HeroSection() {
  const { groom, bride, invitationMessage } = weddingConfig;

  return (
    <section className="hero-section" id="invitation">
      <ScrollReveal className="invitation-card">
        {/* Corner flourishes */}
        <CornerFlourish className="card-corner--tl" />
        <CornerFlourish className="card-corner--tr" />
        <CornerFlourish className="card-corner--bl" />
        <CornerFlourish className="card-corner--br" />

        {/* Bismillah */}
        <div className="bismillah-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div className="bismillah-translation">
          In the name of Allah, the Most Gracious, the Most Merciful
        </div>

        <GoldDivider symbol="☪" />

        <p className="together-line">
          Together with our families and the blessings of Allah
        </p>

        {/* Islamic arch above names */}
        <IslamicArch width={140} height={90} />

        {/* Groom */}
        <div>
          <div className="groom-name">{groom.name}</div>
          <div className="occupation-line">✦ {groom.occupation} ✦</div>
        </div>

        {/* Weds */}
        <div className="weds-text">— Weds —</div>

        {/* Bride */}
        <div>
          <div className="bride-name">{bride.name}</div>
          <div className="occupation-line">✦ {bride.occupation} ✦</div>
        </div>

        <GoldDivider symbol="❧" />

        {/* Invitation message */}
        <p className="invitation-message">{invitationMessage}</p>

        <GoldDivider />

        {/* Blessing line */}
        <p style={{
          fontFamily: 'var(--font-arabic)',
          fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
          color: 'var(--gold-dark)',
          marginBottom: '0.3rem',
        }}>
          مع تمنياتنا لكم بحفل زفاف مبارك
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.72rem, 2vw, 0.82rem)',
          color: 'var(--text-mid)',
          letterSpacing: '0.08em',
        }}>
          With the blessings of Allah, we joyfully invite you to celebrate our wedding
        </p>
      </ScrollReveal>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll to Explore</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}

