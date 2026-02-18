/* ====================================
   MercadoSmart — Interactions & Scroll
   ==================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar scroll effect ----
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---- Mobile menu toggle ----
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.navbar-links');

    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Reveal on scroll (Intersection Observer) ----
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));

    // ---- Staggered reveal for grid children ----
    document.querySelectorAll('.features-grid .feature-card, .steps-container .step').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.12}s`;
    });

    // ---- CTA form handling ----
    const ctaForm = document.getElementById('cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = ctaForm.querySelector('input[type="email"]').value;
            if (email) {
                const btn = ctaForm.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = '¡Listo! ✓';
                btn.style.background = 'linear-gradient(135deg, #27AE60, #6FCF97)';
                btn.disabled = true;
                ctaForm.querySelector('input').disabled = true;

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    ctaForm.querySelector('input').disabled = false;
                    ctaForm.querySelector('input').value = '';
                }, 3000);
            }
        });
    }

    // ---- Animated counter for hero stats ----
    const animateCounter = (el, target, suffix = '') => {
        const duration = 2000;
        const startTime = performance.now();
        const startVal = 0;

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startVal + (target - startVal) * eased);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValues = entry.target.querySelectorAll('.hero-stat-value');
                statValues.forEach(val => {
                    const text = val.textContent;
                    const num = parseInt(text.replace(/[^0-9]/g, ''));
                    const suffix = text.includes('%') ? '%' : text.includes('+') ? '+' : text.includes('k') ? 'k' : '';
                    if (num) animateCounter(val, num, suffix);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);

});
