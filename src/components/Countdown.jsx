import { useState, useEffect, useRef } from 'react';
import { weddingConfig } from '../weddingConfig';
import { GoldDivider } from './Decorative';
import ScrollReveal from './ScrollReveal';
import './Countdown.css';

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0');
}

function getTimeLeft(targetISO) {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function TimerUnit({ value, label }) {
  const [flip, setFlip] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      setFlip(true);
      prev.current = value;
      const t = setTimeout(() => setFlip(false), 300);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="timer-unit">
      <div className="timer-number-wrapper">
        <span className={`timer-number${flip ? ' flip' : ''}`}>{pad(value)}</span>
      </div>
      <span className="timer-label">{label}</span>
    </div>
  );
}

function Separator() {
  return (
    <div className="timer-separator" aria-hidden="true">
      <span /><span />
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(weddingConfig.nikkah.timeISO));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(weddingConfig.nikkah.timeISO));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isCompleted = timeLeft === null;
  const isPast = new Date(weddingConfig.nikkah.timeISO).getTime() < Date.now();

  return (
    <section className="countdown-section" id="countdown" aria-label="Countdown to Nikkah">
      <ScrollReveal>
        <div className="countdown-heading">Counting Down To Our Nikkah</div>
        <div className="countdown-subheading">
          {weddingConfig.nikkah.day}, {new Date(weddingConfig.nikkah.date + 'T12:00:00').toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
          })} — {weddingConfig.nikkah.time}
        </div>

        <GoldDivider symbol="☪" />

        {isCompleted ? (
          <div>
            <div className="countdown-completed">الحمد لله</div>
            <div className="countdown-completed-sub">
              {isPast
                ? 'Alhamdulillah, our Nikkah has taken place. May Allah bless our union.'
                : 'Alhamdulillah, today is our Nikkah!'}
            </div>
          </div>
        ) : (
          <div className="countdown-grid" role="timer" aria-live="off" aria-label="Countdown timer">
            <TimerUnit value={timeLeft.days}    label="Days"    />
            <Separator />
            <TimerUnit value={timeLeft.hours}   label="Hours"   />
            <Separator />
            <TimerUnit value={timeLeft.minutes} label="Minutes" />
            <Separator />
            <TimerUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        )}
      </ScrollReveal>
    </section>
  );
}

