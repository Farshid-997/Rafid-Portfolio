(function () {
  'use strict';
  // Theme: apply saved or system preference, then listen for toggle
  var THEME_KEY = 'portfolio-theme';
  var root = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else {
      applyTheme(getSystemTheme());
    }
  }

  initTheme();

  function updateToggleLabel() {
    var label = document.getElementById('theme-toggle-label');
    if (label) label.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(getSystemTheme());
        updateToggleLabel();
      }
    });
  }

  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    updateToggleLabel();
    themeToggle.addEventListener('click', function (e) {
      e.preventDefault();
      var isDark = root.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
      updateToggleLabel();
    });
  }

  // About section: animate when scrolled into view (once)
  var aboutSection = document.getElementById('about');
  if (aboutSection && 'IntersectionObserver' in window) {
    var aboutObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !entry.target.classList.contains('about-visible')) {
            entry.target.classList.add('about-visible');
          }
        });
      },
      { rootMargin: '0px 0px 80px 0px', threshold: 0 }
    );
    aboutObs.observe(aboutSection);
  } else if (aboutSection) {
    aboutSection.classList.add('about-visible');
  }

  // Portfolio section: animate when scrolled into view (once)
  var portfolioSection = document.getElementById('portfolio');
  if (portfolioSection && 'IntersectionObserver' in window) {
    var portfolioObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !entry.target.classList.contains('portfolio-visible')) {
            entry.target.classList.add('portfolio-visible');
          }
        });
      },
      { rootMargin: '0px 0px 80px 0px', threshold: 0 }
    );
    portfolioObs.observe(portfolioSection);
  } else if (portfolioSection) {
    portfolioSection.classList.add('portfolio-visible');
  }

  // Portfolio filter: All (default) or by category
  var filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  var gallery = document.querySelector('.portfolio-gallery');
  if (filterBtns.length && gallery) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        gallery.querySelectorAll('.project-card-link').forEach(function (card) {
          var cat = card.getAttribute('data-category') || '';
          if (filter === 'all' || cat === filter) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Form handlers (prevent default for static demo; hook up your backend later)
  var newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = newsletterForm.querySelector('input[name="email"]').value;
      console.log('Newsletter signup:', email);
      alert('Thanks! We\'ll keep you updated. (This is a demo — connect a backend to save emails.)');
      newsletterForm.reset();
    });
  }

  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('Contact form submitted');
      alert('Message sent! (This is a demo — connect a backend or Formspree/Netlify Forms to handle submissions.)');
      contactForm.reset();
    });
  }
})();
