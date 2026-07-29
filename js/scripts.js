document.body.classList.add('loaded');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.innerWidth < 768;

if (!prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  const heroReveal = document.getElementById('hero-reveal');
  if (heroReveal) {
    gsap.to('.layer-1 img', {
      scrollTrigger: {
        trigger: '#hero-reveal',
        start: 'top top',
        end: 'bottom center',
        scrub: isMobile ? 0.8 : 1.2,
      },
      scale: isMobile ? 1.2 : 1.4,
      opacity: 0,
      filter: 'blur(12px)',
      ease: 'power2.inOut',
    });

    gsap.to('.layer-2 img', {
      scrollTrigger: {
        trigger: '#hero-reveal',
        start: 'top top',
        end: 'bottom center',
        scrub: isMobile ? 0.8 : 1.2,
      },
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      ease: 'power2.inOut',
    });

    gsap.to('.hero-content', {
      scrollTrigger: {
        trigger: '#hero-reveal',
        start: 'top top',
        end: 'bottom center',
        scrub: isMobile ? 0.8 : 1.2,
      },
      opacity: 0,
      y: isMobile ? -40 : -80,
      ease: 'power2.inOut',
    });

    gsap.to('.scroll-indicator', {
      scrollTrigger: {
        trigger: '#hero-reveal',
        start: 'top top',
        end: 'top 20%',
        scrub: 1,
      },
      opacity: 0,
      ease: 'power2.out',
    });
  }
}

AOS.init({
  duration: isMobile ? 600 : 800,
  once: true,
  offset: isMobile ? 30 : 60,
  disable: prefersReducedMotion,
});

const navbar = document.getElementById('mainNav');
if (navbar) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.style.background = 'rgba(10,15,26,0.95)';
          navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
          navbar.style.background = 'rgba(10,15,26,0.8)';
          navbar.style.boxShadow = 'none';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      const navCollapse = document.getElementById('navbarNav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    }
  });
});
