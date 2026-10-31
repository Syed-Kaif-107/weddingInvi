import './Decorative.css';

/* ── Gold Divider with ornamental center ─────────────────── */
export function GoldDivider({ symbol = '✦' }) {
  return (
    <div className="gold-divider" role="presentation">
      <div className="gold-divider-line" />
      <span className="gold-divider-ornament" aria-hidden="true">{symbol}</span>
      <div className="gold-divider-line" />
    </div>
  );
}

/* ── Islamic arch SVG ──────────────────────────────────────── */
export function IslamicArch({ color = '#C9A84C', width = 140, height = 90 }) {
  return (
    <div style={{ width, height, margin: '0 auto' }} aria-hidden="true">
      <svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Arch pillars */}
        <rect x="5" y="60" width="10" height="30" rx="1" fill={color} opacity="0.7"/>
        <rect x="125" y="60" width="10" height="30" rx="1" fill={color} opacity="0.7"/>
        {/* Main arch curve */}
        <path
          d="M15 60 Q15 10 70 8 Q125 10 125 60"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        {/* Inner arch */}
        <path
          d="M22 60 Q22 20 70 18 Q118 20 118 60"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        {/* Keystone */}
        <circle cx="70" cy="9" r="4" fill={color} opacity="0.8"/>
        {/* Base line */}
        <line x1="0" y1="90" x2="140" y2="90" stroke={color} strokeWidth="1" opacity="0.4"/>
        {/* Crescent on top */}
        <path
          d="M70 2 A7 7 0 1 1 77 9 A5 5 0 1 0 70 2Z"
          fill={color}
          opacity="0.9"
        />
        {/* Star */}
        <polygon
          points="82,4 83.2,7.6 87,7.6 84,9.7 85.2,13.3 82,11.2 78.8,13.3 80,9.7 77,7.6 80.8,7.6"
          fill={color}
          opacity="0.8"
          transform="scale(0.6) translate(55, -3)"
        />
      </svg>
    </div>
  );
}

/* ── Geometric Pattern border ──────────────────────────────── */
export function GeometricBorder({ children, className = '' }) {
  return (
    <div className={`ornamental-border ${className}`} role="presentation">
      <span className="corner-tl" aria-hidden="true">❧</span>
      <span className="corner-tr" aria-hidden="true">❧</span>
      <span className="corner-bl" aria-hidden="true">❧</span>
      <span className="corner-br" aria-hidden="true">❧</span>
      {children}
    </div>
  );
}

/* ── Crescent + Star inline motif ───────────────────────────── */
export function CrescentStar() {
  return (
    <span className="crescent-motif" aria-hidden="true">
      ☪
    </span>
  );
}

/* ── Section header with Islamic styling ────────────────────── */
export function SectionHeader({ arabic, english, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      {arabic && (
        <div style={{
          fontFamily: 'var(--font-arabic)',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          color: 'var(--gold-dark)',
          marginBottom: '0.25rem',
          lineHeight: 1.6,
        }}>
          {arabic}
        </div>
      )}
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)',
        fontWeight: 600,
        color: 'var(--emerald)',
        letterSpacing: '0.03em',
        lineHeight: 1.2,
        marginBottom: subtitle ? '0.5rem' : 0,
      }}>
        {english}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
          color: 'var(--text-mid)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

