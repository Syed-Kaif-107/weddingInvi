import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import { GoldDivider, SectionHeader } from './Decorative';
import ScrollReveal from './ScrollReveal';
import './EventCards.css';

function EventCard({ type, data }) {
  const isNikkah = type === 'nikkah';

  return (
    <div className={`event-card event-card--${isNikkah ? 'nikkah' : 'reception'}`}>
      <div className="event-card-heading">
        {isNikkah ? 'The Nikkah Ceremony' : 'Wedding Reception'}
      </div>
      <div className="event-card-subheading">
        {isNikkah ? '✦ Sacred Union ✦' : '✦ Celebration & Walima ✦'}
      </div>

      <GoldDivider symbol={isNikkah ? '☪' : '✦'} />

      <ul className="event-details">
        {/* Date */}
        <li className="event-detail-item">
          <Calendar className="event-detail-icon" aria-hidden="true" />
          <div className="event-detail-content">
            <div className="event-detail-label">Date</div>
            <div className="event-detail-value">
              {data.day}, {new Date(data.date + 'T12:00:00').toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </div>
          </div>
        </li>

        {/* Time */}
        <li className="event-detail-item">
          <Clock className="event-detail-icon" aria-hidden="true" />
          <div className="event-detail-content">
            <div className="event-detail-label">Time</div>
            <div className="event-detail-value">{data.time}</div>
          </div>
        </li>

        {/* Venue */}
        <li className="event-detail-item">
          <MapPin className="event-detail-icon" aria-hidden="true" />
          <div className="event-detail-content">
            <div className="event-detail-label">Venue</div>
            <div className="event-detail-value venue-name">{data.venue}</div>
            <div className="event-detail-value" style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginTop: '0.2rem' }}>
              {data.address}
            </div>
          </div>
        </li>
      </ul>

      <a
        href={data.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`maps-btn${isNikkah ? '' : ' maps-btn--gold'}`}
        aria-label={`View ${isNikkah ? 'Nikkah' : 'Reception'} location on Google Maps`}
      >
        <MapPin size={14} aria-hidden="true" />
        {isNikkah ? 'View Nikkah Location' : 'View Reception Location'}
        <ExternalLink size={13} aria-hidden="true" />
      </a>
    </div>
  );
}

export default function EventCards() {
  return (
    <section className="events-section" id="events" aria-label="Event Details">
      <ScrollReveal>
        <SectionHeader
          english="Our Special Day"
          subtitle="All the details you need"
        />
      </ScrollReveal>

      <div className="events-grid">
        <ScrollReveal delay={0.1}>
          <EventCard type="nikkah" data={weddingConfig.nikkah} />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <EventCard type="reception" data={weddingConfig.reception} />
        </ScrollReveal>
      </div>
    </section>
  );
}

