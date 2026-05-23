'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  duration?: number;
  className?: string;
};

// Parse "370+", "18–22", "2024", "Mentor" etc.
// Returns { prefix, number, suffix } if a number is extractable, else null (= render as-is).
function parseNumeric(s: string): { prefix: string; num: number; suffix: string } | null {
  const m = String(s).match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return null;
  const num = parseFloat(m[2].replace(',', '.'));
  if (!isFinite(num)) return null;
  return { prefix: m[1], num, suffix: m[3] };
}

export function CountUp({ value, duration = 1500, className }: Props) {
  const parsed = parseNumeric(value);
  const target = parsed?.num ?? 0;
  const decimals = parsed && String(parsed.num).includes('.') ? (String(parsed.num).split('.')[1]?.length || 0) : 0;
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setCurrent(target * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setCurrent(target);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, parsed]);

  if (!parsed) return <span ref={ref} className={className}>{value}</span>;

  const display = decimals ? current.toFixed(decimals) : Math.round(current).toString();
  return (
    <span ref={ref} className={className}>
      {parsed.prefix}{display}{parsed.suffix}
    </span>
  );
}
