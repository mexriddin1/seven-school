'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_BASE, clearToken, getUser, type AdminUser } from '@/lib/api';

const NAV = [
  { section: 'Asosiy', items: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/applications', label: 'Arizalar' },
  ]},
  { section: 'Bosh sahifa kontentlari', items: [
    { href: '/settings', label: 'Sozlamalar (matnlar)' },
    { href: '/awards', label: 'Sovrinlar' },
    { href: '/testimonial-videos', label: 'Ota-onalar videolari' },
    { href: '/universities', label: 'Hamkor universitetlar' },
    { href: '/carousel', label: 'Rasm karuseli' },
    { href: '/pricing-plans', label: "Oylik to'lov tariflari" },
    { href: '/advantages', label: 'Seven School afzalliklari' },
  ]},
  { section: 'Statistika kartalari', items: [
    { href: '/stats-home', label: 'Bosh sahifa — Biz kimmiz?' },
    { href: '/stats-about', label: 'Biz haqimizda sahifasi' },
    { href: '/stats-results', label: 'Natijalar sahifasi' },
    { href: '/stats-grant', label: "Mashg'ulotlar — Grant banner" },
  ]},
  { section: 'Ustozlar', items: [
    { href: '/teachers', label: 'Ustozlar' },
  ]},
  { section: 'Sahifalar', items: [
    { href: '/blog', label: 'Blog maqolalari' },
    { href: '/lesson-subjects', label: "O'quv fanlari (tag bulutlari)" },
    { href: '/lesson-extras', label: 'Darsdan tashqari (4 ta karta)' },
    { href: '/gallery', label: 'Galereya' },
    { href: '/faqs', label: 'FAQ' },
  ]},
  { section: "Yangi dizayn bo'limlari", items: [
    { href: '/eco-stages',        label: 'Ekotizim bosqichlari (3 karta)' },
    { href: '/kids-features',     label: 'Seven Kids xususiyatlari (4 karta)' },
    { href: '/togaraks',          label: "To'garaklar karuseli" },
    { href: '/curriculum-items',  label: 'Maktab kurikulumi (6 blok)' },
    { href: '/individual-stats',  label: 'Individual yondashuv stats (4)' },
    { href: '/schedule-items',    label: 'Kun tartibi' },
    { href: '/lesson-blocks',     label: 'Darslar bloklari (6 ta)' },
  ]},
  { section: 'Tizim', items: [
    { href: '/users', label: 'Foydalanuvchilar' },
    { href: '/webhooks', label: 'Webhooklar (lead forward)' },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUserState] = useState<AdminUser | null>(null);

  useEffect(() => { setUserState(getUser()); }, []);

  function logout() {
    clearToken();
    router.push('/login');
  }

  return (
    <aside className="sidebar">
      <Link href="/dashboard" className="sidebar-brand">
        {/* Sidebar has dark navy background → use the white/light logo (file: Dark.png) */}
        <img className="brand-logo" src={`${API_BASE}/uploads/seed/Logo/Dark.png`} alt="Seven School" />
        <span className="brand-sub">ADMIN PANEL</span>
      </Link>

      {NAV.map((g) => (
        <div key={g.section}>
          <div className="sidebar-section">{g.section}</div>
          {g.items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={pathname.startsWith(it.href) ? 'active' : ''}
            >
              {it.label}
            </Link>
          ))}
        </div>
      ))}

      <div className="sidebar-footer">
        {user ? (
          <>
            <div className="user">{user.name}</div>
            <div>{user.email}</div>
            <div className="muted" style={{ fontSize: '0.72rem', marginTop: 4 }}>{user.role}</div>
            <button onClick={logout}>Chiqish</button>
          </>
        ) : (
          <>
            <div className="muted">Kirilmagan</div>
            <button onClick={() => router.push('/login')}>Kirish</button>
          </>
        )}
      </div>
    </aside>
  );
}
