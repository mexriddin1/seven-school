'use client';
import { useState } from 'react';

export function FaqAccordion({ items }: { items: Array<{ id: number | string; question: string; answer: string }> }) {
  const [openId, setOpenId] = useState<number | string | null>(null);
  if (!items || items.length === 0) return null;
  return (
    <div className="faq-list">
      {items.map((f) => {
        const open = openId === f.id;
        return (
          <div key={f.id} className={'faq-item' + (open ? ' open' : '')}>
            <button
              type="button"
              className="faq-q"
              data-popup-skip="true"
              onClick={() => setOpenId(open ? null : f.id)}
              aria-expanded={open}
            >
              {f.question}
            </button>
            <div className="faq-a">
              <div dangerouslySetInnerHTML={{ __html: f.answer || '' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
