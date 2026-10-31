import { useState } from 'react';
import { Heart, Check } from 'lucide-react';
import { GoldDivider, SectionHeader } from './Decorative';
import ScrollReveal from './ScrollReveal';
import './RSVP.css';

export default function RSVP() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('');
  const [attendance, setAttendance] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;
    setLoading(true);
    // Simulate async — no backend required
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section className="rsvp-section" id="rsvp" aria-label="RSVP">
      <ScrollReveal>
        <SectionHeader
          english="Kindly RSVP"
          subtitle="Let us know you're coming"
        />

        <div className="rsvp-card">
          {submitted ? (
            <div className="rsvp-success">
              <span className="rsvp-success-arabic">جزاك اللهُ خيرًا</span>
              Thank you for your response!
              <br />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-mid)',
                fontWeight: 300,
              }}>
                We look forward to celebrating with you.
              </span>
            </div>
          ) : (
            <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
              <input
                className="rsvp-input"
                type="text"
                placeholder="Your Full Name *"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                aria-label="Your full name"
              />
              <input
                className="rsvp-input"
                type="number"
                placeholder="Number of Guests (including yourself)"
                value={guests}
                onChange={e => setGuests(e.target.value)}
                min="1"
                max="10"
                aria-label="Number of guests"
              />

              <div style={{ textAlign: 'left', marginBottom: '-0.25rem' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  color: 'var(--text-mid)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Will you attend?
                </span>
              </div>
              <div className="rsvp-options" role="group" aria-label="Attendance">
                <button
                  type="button"
                  className={`rsvp-option${attendance === 'yes' ? ' selected' : ''}`}
                  onClick={() => setAttendance('yes')}
                  aria-pressed={attendance === 'yes'}
                >
                  <Check size={14} aria-hidden="true" />
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  className={`rsvp-option${attendance === 'no' ? ' selected' : ''}`}
                  onClick={() => setAttendance('no')}
                  aria-pressed={attendance === 'no'}
                >
                  Regretfully Decline
                </button>
              </div>

              <button
                type="submit"
                className="rsvp-submit"
                disabled={!name.trim() || !attendance || loading}
                aria-label="Submit RSVP"
              >
                {loading ? 'Sending…' : 'Send RSVP'}
              </button>
            </form>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}

