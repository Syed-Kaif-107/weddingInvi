import { useEffect, useRef } from 'react';
import './Decorative.css';

/**
 * Wraps children and applies a scroll-reveal animation when
 * the element enters the viewport.
 */
export default function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately visible if reduced-motion is preferred
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayStyle = delay ? { transitionDelay: `${delay}s` } : {};

  return (
    <div ref={ref} className={`reveal ${className}`} style={delayStyle}>
      {children}
    </div>
  );
}

