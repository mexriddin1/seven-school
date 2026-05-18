// Header scroll
const header = document.getElementById('header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile nav
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  }));
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
}

// Count up
const counters = document.querySelectorAll('.cu');
if (counters.length) {
  const countUp = (el) => {
    const target = +el.dataset.target;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const cuObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target);
        cuObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => cuObserver.observe(c));
}

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.id === 'tab-' + id);
      });
    });
  });
}

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length) {
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      faqItems.forEach(other => {
        other.classList.remove('open');
        const oa = other.querySelector('.faq-a');
        if (oa) oa.style.maxHeight = '0px';
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
}

// Form submit
const form = document.getElementById('applyForm');
const successMsg = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    if (!name || !phone) {
      form.querySelectorAll('input, textarea').forEach(el => {
        if (el.required && !el.value.trim()) el.style.borderColor = '#e74c3c';
        else el.style.borderColor = '';
      });
      return;
    }
    if (successMsg) successMsg.classList.add('show');
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Yuborildi!';
    setTimeout(() => {
      form.reset();
      if (successMsg) successMsg.classList.remove('show');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Maslahat olaman';
    }, 6000);
  });
}

// Video testimonials scroll arrows
document.querySelectorAll('.video-wrap').forEach(wrap => {
  const track = wrap.querySelector('.video-testimonials');
  const left = wrap.querySelector('.scroll-left');
  const right = wrap.querySelector('.scroll-right');
  if (!track || !left || !right) return;
  const scrollAmount = 260;
  left.addEventListener('click', () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
  right.addEventListener('click', () => track.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
});

// ============= NEW MICRO-INTERACTIONS =============

// Scroll progress bar
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }, { passive: true });
}

// Hero floating particles
const heroParticles = document.getElementById('heroParticles');
if (heroParticles) {
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = (60 + Math.random() * 40) + '%';
    p.style.width = (2 + Math.random() * 4) + 'px';
    p.style.height = p.style.width;
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.opacity = 0.1 + Math.random() * 0.4;
    heroParticles.appendChild(p);
  }
}

// Card tilt effect
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-8px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Mission parallax
const parallaxEls = document.querySelectorAll('[data-parallax]');
if (parallaxEls.length) {
  window.addEventListener('scroll', () => {
    parallaxEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const vCenter = window.innerHeight / 2;
      const offset = (center - vCenter) * 0.08;
      el.style.transform = `translateY(${offset}px)`;
    });
  }, { passive: true });
}
