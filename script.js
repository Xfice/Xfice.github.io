// Hero slideshow functionality (only for home page)
const bgSlides = document.querySelectorAll('.hero-bg-slide');
const learnMoreBtns = document.querySelectorAll('.hero-learnmore');
const heroTitles = [
  document.querySelector('.hero-title-0'),
  document.querySelector('.hero-title-1'),
  document.querySelector('.hero-title-2')
];
const heroDescs = [
  document.querySelector('.hero-desc-0'),
  document.querySelector('.hero-desc-1'),
  document.querySelector('.hero-desc-2')
];
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  bgSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    if (learnMoreBtns[i]) {
      learnMoreBtns[i].classList.toggle('active', i === index);
    }
    if (heroTitles[i]) {
      heroTitles[i].classList.toggle('active', i === index);
    }
    if (heroDescs[i]) {
      heroDescs[i].classList.toggle('active', i === index);
    }
  });
  currentSlide = index;
}

function nextSlide() {
  if (bgSlides.length > 0) {
    let next = (currentSlide + 1) % bgSlides.length;
    showSlide(next);
  }
}

// Initialize hero slideshow if elements exist
if (bgSlides.length > 0) {
  slideInterval = setInterval(nextSlide, 5000);
  showSlide(0);
}

// Smooth scroll for Learn More buttons
learnMoreBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const href = btn.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Animation for about-steps-row cards on scroll
function animateStepsOnScroll() {
  const steps = document.querySelectorAll('.about-steps-row .step');
  if (steps.length === 0) return;
  
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all
    steps.forEach(step => step.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  steps.forEach((step, idx) => {
    step.classList.remove('in-view', 'step-left', 'step-center', 'step-right');
    if (idx === 0) step.classList.add('step-left');
    else if (idx === 1) step.classList.add('step-center');
    else if (idx === 2) step.classList.add('step-right');
    observer.observe(step);
  });
}

// Animation for team-member cards on scroll
function animateTeamOnScroll() {
  const members = document.querySelectorAll('.team-members-row .team-member');
  if (members.length === 0) return;
  
  if (!('IntersectionObserver' in window)) {
    members.forEach(m => m.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  members.forEach((member, idx) => {
    member.classList.remove('in-view', 'team-left', 'team-right');
    if (idx === 0) member.classList.add('team-left');
    else member.classList.add('team-right');
    observer.observe(member);
  });
}

// Animation for about-split-img on scroll
function animateSplitImgOnScroll() {
  const img = document.querySelector('.about-split-img');
  if (!img) return;
  if (!('IntersectionObserver' in window)) {
    img.classList.add('in-view');
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  img.classList.remove('in-view');
  observer.observe(img);
}

// Animation for about-img-cropped on scroll
function animateAboutImgCropOnScroll() {
  const img = document.querySelector('.about-img-cropped');
  if (!img) return;
  if (!('IntersectionObserver' in window)) {
    img.classList.add('in-view');
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  img.classList.remove('in-view');
  observer.observe(img);
}

// Animation for services cards on scroll
function animateServicesCardsOnScroll() {
  const cards = document.querySelectorAll('.services-cards-row .services-card');
  if (!cards.length) return;
  if (!('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  cards.forEach((card, idx) => {
    card.classList.remove('in-view', 'card-left', 'card-center', 'card-right');
    if (idx === 0) card.classList.add('card-left');
    else if (idx === 1) card.classList.add('card-center');
    else if (idx === 2) card.classList.add('card-right');
    observer.observe(card);
  });
}


// Cookies popup logic
function setupCookiesPopup() {
  const popup = document.getElementById('cookies-popup');
  const allowBtn = document.getElementById('cookies-allow-btn');
  const rejectBtn = document.getElementById('cookies-reject-btn');
  if (!popup || !allowBtn || !rejectBtn) return;
  if (localStorage.getItem('cookiesAllowed') === 'true' || localStorage.getItem('cookiesAllowed') === 'false') {
    popup.style.display = 'none';
    return;
  }
  allowBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesAllowed', 'true');
    popup.style.display = 'none';
  });
  rejectBtn.addEventListener('click', function() {
    localStorage.setItem('cookiesAllowed', 'false');
    popup.style.display = 'none';
  });
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', function() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  // Optional: Close on outside click or ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on outside click/tap
  document.addEventListener('click', (e) => {
    const target = e.target;
    const clickInsideMenu = mobileMenu.contains(target);
    const clickOnHamburger = hamburger.contains(target);
    if (window.innerWidth <= 900 && mobileMenu.classList.contains('open') && !clickInsideMenu && !clickOnHamburger) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }, { passive: true });

  // Close on scroll/touch scroll
  const closeOnScroll = () => {
    if (window.innerWidth <= 900 && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  };
  window.addEventListener('scroll', closeOnScroll, { passive: true });
  window.addEventListener('touchmove', closeOnScroll, { passive: true });
}

// Auto-close open mobile menu after 20s of inactivity (slide up)
function setupMobileMenuIdleAutoClose() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;
  let inactivityTimer;
  const closeIfIdle = () => {
    if (window.innerWidth <= 900 && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  };
  const resetIdleTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(closeIfIdle, 20000);
  };
  ['mousemove','keydown','touchstart','scroll','click'].forEach(evt => {
    window.addEventListener(evt, resetIdleTimer, { passive: true });
  });
  // Also reset when toggling menu
  hamburger.addEventListener('click', resetIdleTimer);
  // Start timer
  resetIdleTimer();
}

function setupAnchorOffsetScroll() {
  const navbarHeight = document.querySelector('.floating-navbar')?.offsetHeight || 70;
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const rect = target.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const offset = rect.top + scrollTop - navbarHeight; // No extra space
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
    });
  });
}

// 3D tilt effect for About Us cards
function setup3DTiltEffect() {
  const steps = document.querySelectorAll('.about-steps-row .step');
  steps.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `scale(1.06) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; // subtle shadow, no glow
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all functions
  animateStepsOnScroll();
  animateTeamOnScroll();
  animateSplitImgOnScroll();
  animateAboutImgCropOnScroll();
  animateServicesCardsOnScroll();
  setupCookiesPopup();
  setupMobileMenu();
  setupMobileMenuIdleAutoClose();
  setup3DTiltEffect();
}); 