document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top');

  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
    navToggle.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('show');
      navToggle.classList.remove('active');
    });
  });

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
      scrollTopBtn.classList.add('show');
    } else {
      header.classList.remove('scrolled');
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.animate-on-scroll');
  animateElements.forEach(element => {
    observer.observe(element);
  });

  const navHeight = header.offsetHeight;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) {
    images.forEach(img => {
      img.src = img.src;
    });
  } else {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  let ticking = false;
  let lastScrollPos = 0;

  window.addEventListener('scroll', function() {
    lastScrollPos = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateHeader(lastScrollPos);
        ticking = false;
      });

      ticking = true;
    }
  });

  function updateHeader(scrollPos) {
    if (scrollPos > 100) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
  }

  const heroButtons = document.querySelectorAll('.hero__buttons .btn');
  heroButtons.forEach((btn, index) => {
    btn.style.animationDelay = `${0.4 + index * 0.1}s`;
  });

  const stats = document.querySelectorAll('.stat__number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (!isNaN(numericValue)) {
          animateNumber(target, 0, numericValue, 2000, finalValue);
        }
        statsObserver.unobserve(target);
      }
    });
  }, observerOptions);

  stats.forEach(stat => {
    statsObserver.observe(stat);
  });

  function animateNumber(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const isPercentage = originalText.includes('%');
    const hasPlus = originalText.includes('+');

    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      element.textContent = current + (isPercentage ? '%' : '') + (hasPlus ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = originalText;
      }
    }

    requestAnimationFrame(updateNumber);
  }

  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('show');
      navToggle.classList.remove('active');
    }
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition', 'none');
  }

  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    testimonialObserver.observe(card);
  });

  console.log('%c🍰 Doce Encanto - Landing Page', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
  console.log('%cDesenvolvido com amor e dedicação', 'color: #6c757d; font-size: 14px;');
});
