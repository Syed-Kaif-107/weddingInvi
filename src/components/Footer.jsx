import { Download, RotateCcw } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import { GoldDivider } from './Decorative';
import ScrollReveal from './ScrollReveal';
import './Footer.css';

// Generate ICS calendar content
function generateICS() {
  const { nikkah, groom, bride } = weddingConfig;

  // Parse date/time
  const dt = new Date(nikkah.timeISO);
  const pad = (n) => String(n).padStart(2, '0');
  const dtStr = `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;

  const endDt = new Date(dt.getTime() + 3 * 60 * 60 * 1000);
  const endStr = `${endDt.getFullYear()}${pad(endDt.getMonth() + 1)}${pad(endDt.getDate())}T${pad(endDt.getHours())}${pad(endDt.getMinutes())}00`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART;TZID=Asia/Kolkata:${dtStr}`,
    `DTEND;TZID=Asia/Kolkata:${endStr}`,
    `SUMMARY:Nikkah Ceremony — ${groom.name} & ${bride.name}`,
    `DESCRIPTION:You are cordially invited to the Nikkah Ceremony of ${groom.name} & ${bride.name}.`,
    `LOCATION:${nikkah.venue}\\, ${nikkah.address}`,
    'STATUS:CONFIRMED',
    `UID:nikkah-${groom.name.replace(/\s/g,'')}-${bride.name.replace(/\s/g,'')}@wedding`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return ics;
}

function downloadICS() {
  const ics = generateICS();
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'save-the-date-nikkah.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Footer({ onReopen }) {
  return (
    <>
      {/* Closing message section */}
      <section className="closing-section" id="closing" aria-label="Closing message">
        <ScrollReveal>
          <div className="closing-card">
            <div className="closing-arabic">حضوركم وأدعيتكم هي أعظم هدية</div>
            <div className="closing-english">
              "Your presence and duas are our greatest gift."
            </div>
            <div className="closing-subtext">
              We are honoured by your love and prayers on our special day.
            </div>

            <GoldDivider symbol="☪" />

            <div className="action-buttons">
              <button
                className="action-btn action-btn--gold"
                onClick={downloadICS}
                aria-label="Download Save the Date calendar file"
              >
                <Download size={14} aria-hidden="true" />
                Save the Date
              </button>
              <button
                className="action-btn action-btn--outline"
                onClick={onReopen}
                aria-label="Reopen the invitation envelope"
              >
                <RotateCcw size={14} aria-hidden="true" />
                Reopen Invitation
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-initials">{weddingConfig.coupleInitials}</div>
        <span className="footer-crescent" aria-hidden="true">☪</span>
        <div className="footer-text">Made with love and duas</div>
        <GoldDivider />
        <div className="footer-text" style={{ marginTop: '0.5rem', opacity: 0.6 }}>
          {weddingConfig.groom.name} &amp; {weddingConfig.bride.name} — {new Date(weddingConfig.nikkah.date).getFullYear()}
        </div>
      </footer>
    </>
  );
}

