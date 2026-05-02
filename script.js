    // NAV SCROLL
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });

    // HAMBURGER (mobile)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--blanc)';
      navLinks.style.padding = '20px';
      navLinks.style.gap = '16px';
      navLinks.style.borderBottom = '1px solid rgba(92,61,30,0.12)';
      if (open) navLinks.style.display = 'none';
    });

    // INTERSECTION OBSERVER
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          setTimeout(() => {
            el.classList.add('visible');
          }, el.dataset.delay || 0);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    // Observe all animated elements
    document.querySelectorAll('.step, .raison-card, .timeline-item, .fade-up').forEach((el, i) => {
      el.dataset.delay = (i % 4) * 100;
      observer.observe(el);
    });

    // BARS ANIMATION
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.bar-fill').forEach(bar => {
            const w = bar.dataset.width;
            setTimeout(() => { bar.style.width = w + '%'; }, 200);
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    const barChart = document.getElementById('barChart');
    if (barChart) barObserver.observe(barChart);

    // SMOOTH NAV LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu
          navLinks.style.display = 'none';
        }
      });
    });

    // STAGGER process steps
    document.querySelectorAll('.process-steps .step').forEach((el, i) => {
      el.dataset.delay = i * 120;
    });

    // STAGGER raison cards
    document.querySelectorAll('.raison-card').forEach((el, i) => {
      el.dataset.delay = i * 80;
    });

    // STAGGER timeline
    document.querySelectorAll('.timeline-item').forEach((el, i) => {
      el.dataset.delay = i * 100;
    });
  </script>
