// ===========================
// CloudNerve JavaScript
// ===========================

// Create Animated Background Elements
function createAnimatedBackground() {
  // Create animated grid
  const animatedBg = document.createElement('div');
  animatedBg.className = 'animated-bg';
  document.body.insertBefore(animatedBg, document.body.firstChild);

  // Create floating orbs
  const orbsContainer = document.createElement('div');
  orbsContainer.className = 'floating-orbs';

  for (let i = 0; i < 3; i++) {
    const orb = document.createElement('div');
    orb.className = 'orb';
    orbsContainer.appendChild(orb);
  }

  document.body.insertBefore(orbsContainer, document.body.firstChild);
}

// Initialize animated background
createAnimatedBackground();

// Typewriter Effect for Hero Title
function typewriterEffect(element, text, speed = 100) {
  if (!element) return;

  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Add blinking cursor
      const cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      element.appendChild(cursor);

      // Remove cursor after 3 seconds
      setTimeout(() => {
        if (cursor.parentNode) {
          cursor.remove();
        }
      }, 3000);
    }
  }

  type();
}

// Apply typewriter effect to hero title on home page
const heroTitle = document.querySelector('.hero-title');
if (heroTitle && window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
  const originalText = heroTitle.textContent;
  // Small delay before starting typewriter
  setTimeout(() => {
    typewriterEffect(heroTitle, originalText, 80);
  }, 500);
}

// 3D Tilt Effect for Cards
function add3DTiltEffect() {
  const cards = document.querySelectorAll('.service-card, .mission-card, .contact-info-card');

  cards.forEach(card => {
    card.classList.add('tilt-card');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
    });
  });
}

// Initialize 3D tilt effect
add3DTiltEffect();

// Add floating animation to service icons
function addFloatingIcons() {
  const serviceIcons = document.querySelectorAll('.service-icon');
  serviceIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
    icon.classList.add('float-animation');
  });
}

addFloatingIcons();

// Add ripple effect to all buttons
function addRippleEffect() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button, .submit-button');
  buttons.forEach(button => {
    button.classList.add('ripple');
  });
}

addRippleEffect();

// Enhanced scroll reveal with different animation types
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');

        // Add variety of entrance animations
        const animations = ['slide-in-left', 'slide-in-right', 'bounce-in', 'rotate-in'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

        // Apply random animation to some elements
        if (entry.target.classList.contains('service-card')) {
          const cardIndex = Array.from(document.querySelectorAll('.service-card')).indexOf(entry.target);
          if (cardIndex % 2 === 0) {
            entry.target.classList.add('slide-in-left');
          } else {
            entry.target.classList.add('slide-in-right');
          }
        } else if (entry.target.classList.contains('mission-card')) {
          entry.target.classList.add('bounce-in');
        } else if (entry.target.classList.contains('contact-info-card')) {
          entry.target.classList.add('rotate-in');
        }
      }, index * 100);

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Add glow pulse to CTA buttons periodically
function addGlowPulseToCTA() {
  const ctaBtns = document.querySelectorAll('.btn-primary');
  ctaBtns.forEach(btn => {
    // Add pulse every 5 seconds
    setInterval(() => {
      btn.classList.add('glow-pulse');
      setTimeout(() => {
        btn.classList.remove('glow-pulse');
      }, 2000);
    }, 7000);
  });
}

addGlowPulseToCTA();

// Animated gradient for page headers
function addAnimatedGradient() {
  const pageHeaders = document.querySelectorAll('.page-header');
  pageHeaders.forEach(header => {
    header.style.backgroundImage = 'linear-gradient(-45deg, #0a0a0a, #111111, #0a0a0a, #1a1a1a)';
    header.style.backgroundSize = '400% 400%';
    header.style.animation = 'gradientShift 15s ease infinite';
  });
}

addAnimatedGradient();

// Create Simple Line Chart without external libraries
function createGrowthChart() {
  const canvas = document.getElementById('growthChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.parentElement.clientWidth;
  const height = 300;

  canvas.width = width;
  canvas.height = height;

  // Data points (Years and corresponding values)
  const data = [
    { year: '2020', value: 50 },
    { year: '2021', value: 120 },
    { year: '2022', value: 250 },
    { year: '2023', value: 420 },
    { year: '2024', value: 650 }
  ];

  const maxValue = Math.max(...data.map(d => d.value));
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);

  // Draw background grid
  ctx.strokeStyle = 'rgba(0, 166, 255, 0.1)';
  ctx.lineWidth = 1;

  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  // Draw line chart
  ctx.strokeStyle = '#00a6ff';
  ctx.lineWidth = 3;
  ctx.beginPath();

  data.forEach((point, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    const y = padding + chartHeight - (point.value / maxValue) * chartHeight;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();

  // Draw gradient fill
  const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
  gradient.addColorStop(0, 'rgba(0, 166, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 166, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);

  data.forEach((point, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    const y = padding + chartHeight - (point.value / maxValue) * chartHeight;
    ctx.lineTo(x, y);
  });

  ctx.lineTo(width - padding, height - padding);
  ctx.closePath();
  ctx.fill();

  // Draw data points
  ctx.fillStyle = '#00d4ff';
  data.forEach((point, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    const y = padding + chartHeight - (point.value / maxValue) * chartHeight;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Add glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00d4ff';
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Draw labels
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '12px Inter, sans-serif';
  ctx.textAlign = 'center';

  data.forEach((point, index) => {
    const x = padding + (chartWidth / (data.length - 1)) * index;
    ctx.fillText(point.year, x, height - padding + 20);
  });

  // Draw value labels
  ctx.textAlign = 'right';
  for (let i = 0; i <= 5; i++) {
    const value = Math.round((maxValue / 5) * (5 - i));
    const y = padding + (chartHeight / 5) * i;
    ctx.fillText(value + '+', padding - 10, y + 5);
  }
}

// Initialize chart when element exists
if (document.getElementById('growthChart')) {
  setTimeout(createGrowthChart, 500);
}

// Animate circular progress charts
function animateCircularCharts() {
  const charts = [
    { id: 'uptime-circle', percentage: 99.9 },
    { id: 'satisfaction-circle', percentage: 95 },
    { id: 'response-circle', percentage: 20 }, // 20% for <2h representation
    { id: 'projects-circle', percentage: 100 }
  ];

  charts.forEach(chart => {
    const circle = document.getElementById(chart.id);
    if (!circle) return;

    const circumference = 2 * Math.PI * 90; // radius = 90
    const offset = circumference - (chart.percentage / 100) * circumference;

    // Animate from full offset to calculated offset
    setTimeout(() => {
      circle.style.strokeDashoffset = offset;
    }, 100);
  });
}

// Observe circular charts and animate when visible
const circularChartsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCircularCharts();
      circularChartsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const liveStatsSection = document.querySelector('.live-stats-section');
if (liveStatsSection) {
  circularChartsObserver.observe(liveStatsSection);
}

// ===========================
// Advanced Scroll Animations
// ===========================

// Enhanced Parallax Effect
let scrollPos = 0;
function enhancedParallax() {
  const newScrollPos = window.pageYOffset;
  const delta = newScrollPos - scrollPos;
  scrollPos = newScrollPos;

  // Parallax for hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrollPos < window.innerHeight) {
    const parallaxSpeed = 0.5;
    heroContent.style.transform = `translateY(${scrollPos * parallaxSpeed}px)`;
  }

  // Parallax for service icons
  document.querySelectorAll('.service-icon').forEach((icon, index) => {
    const rect = icon.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const offset = (window.innerHeight - rect.top) * 0.05;
      icon.style.transform = `translateY(${-offset}px) rotate(${offset * 0.1}deg)`;
    }
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      enhancedParallax();
      ticking = false;
    });
    ticking = true;
  }
});

// Advanced Scroll Observer for Multiple Animation Types
const advancedScrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
});

// Observe all advanced animation elements
document.querySelectorAll('.fade-in-scale, .scale-in, .blur-in, .clip-reveal, .section-entrance, .stagger-children').forEach(el => {
  advancedScrollObserver.observe(el);
});

// Magnetic Button Effect
function addMagneticEffect() {
  const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button');

  magneticElements.forEach(el => {
    el.classList.add('magnetic');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = x * 0.3;
      const moveY = y * 0.3;

      el.style.setProperty('--mouse-x', `${moveX}px`);
      el.style.setProperty('--mouse-y', `${moveY}px`);
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--mouse-x', '0px');
      el.style.setProperty('--mouse-y', '0px');
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

addMagneticEffect();

// Scroll-based Scaling for Cards
function scrollScaling() {
  const cards = document.querySelectorAll('.service-card, .testimonial-card, .live-stat-card');

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const visibility = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1);
      const scale = 0.95 + (visibility * 0.05);
      const opacity = 0.5 + (visibility * 0.5);

      card.style.transform = `scale(${scale})`;
      card.style.opacity = opacity;
    }
  });
}

window.addEventListener('scroll', scrollScaling);
scrollScaling(); // Initial call

// Text Split Animation
function splitTextAnimation() {
  const textElements = document.querySelectorAll('.split-text');

  textElements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = '';

    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
    });
  });
}

// Apply to specific headings if they have the class
splitTextAnimation();

// Observe split text elements
document.querySelectorAll('.split-text').forEach(el => {
  advancedScrollObserver.observe(el);
});

// Smooth Section Transitions
document.querySelectorAll('section').forEach(section => {
  section.classList.add('section-entrance');
  advancedScrollObserver.observe(section);
});

// Image Reveal Animation
document.querySelectorAll('.image-reveal').forEach(el => {
  advancedScrollObserver.observe(el);
});

// Add hover glow to cards
document.querySelectorAll('.service-card, .featured-card, .mission-card').forEach(card => {
  card.classList.add('hover-glow');
});

// Morphing blob animation for orbs
document.querySelectorAll('.orb').forEach(orb => {
  orb.classList.add('blob-morph');
});

// Stagger children for service grids
document.querySelectorAll('.services-grid, .featured-grid').forEach(grid => {
  grid.classList.add('stagger-children');
});

// Enhanced scroll progress indicator
function createScrollProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-blue), var(--electric-blue));
    width: 0%;
    z-index: 10000;
    transition: width 0.1s ease-out;
    box-shadow: 0 0 10px var(--electric-blue);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

createScrollProgressIndicator();

// Smooth scrolling enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scale-in class to important elements
document.querySelectorAll('.overview-stat-item, .live-stat-card').forEach(el => {
  el.classList.add('scale-in');
  advancedScrollObserver.observe(el);
});

// Fade-in-scale for testimonials
document.querySelectorAll('.testimonial-card').forEach(el => {
  el.classList.add('fade-in-scale');
});

// ===========================
// Portfolio Filtering
// ===========================

function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterButtons.length === 0 || portfolioCards.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const categories = card.getAttribute('data-category');

        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.classList.add('visible');
        } else {
          card.classList.add('hidden');
          card.classList.remove('visible');
        }
      });
    });
  });

  // Initialize all cards as visible
  portfolioCards.forEach(card => {
    card.classList.add('visible');
  });
}

initPortfolioFilter();

// Portfolio stats counter
function animatePortfolioStats() {
  const statNumbers = document.querySelectorAll('.portfolio-stat-item .stat-number');

  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };

    updateCounter();
  });
}

// Observer for portfolio stats
const portfolioStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animatePortfolioStats();
      portfolioStatsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const portfolioStats = document.querySelector('.portfolio-stats');
if (portfolioStats) {
  portfolioStatsObserver.observe(portfolioStats);
}

// Add 3D tilt to portfolio cards
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.classList.add('tilt-card');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const logo = document.getElementById('logo');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');

  // Animate hamburger menu
  const spans = menuToggle.querySelectorAll('span');
  if (navMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll indicator
const scrollIndicator = document.getElementById('scrollIndicator');
scrollIndicator.addEventListener('click', () => {
  document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
});

// Hide scroll indicator after scrolling
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.pointerEvents = 'none';
  } else {
    scrollIndicator.style.opacity = '1';
    scrollIndicator.style.pointerEvents = 'auto';
  }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;

  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Animated counter for statistics
const counters = document.querySelectorAll('.stat-number');
const speed = 200; // Animation speed

const animateCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  const count = +counter.innerText;
  const increment = target / speed;

  if (count < target) {
    counter.innerText = Math.ceil(count + increment);
    setTimeout(() => animateCounter(counter), 10);
  } else {
    counter.innerText = target + (target === 99 ? '%' : '+');
  }
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(counter => {
        counter.innerText = '0';
        animateCounter(counter);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
  statsObserver.observe(statsGrid);
}

// Service cards hover effect - add glow particles
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mouseenter', function (e) {
    this.style.setProperty('--mouse-x', e.clientX - this.getBoundingClientRect().left + 'px');
    this.style.setProperty('--mouse-y', e.clientY - this.getBoundingClientRect().top + 'px');
  });

  card.addEventListener('mousemove', function (e) {
    this.style.setProperty('--mouse-x', e.clientX - this.getBoundingClientRect().left + 'px');
    this.style.setProperty('--mouse-y', e.clientY - this.getBoundingClientRect().top + 'px');
  });
});

// CTA button click handler
const ctaButtons = document.querySelectorAll('.cta-button, #ctaNav');
ctaButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = 'contact.html';
  });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Show success message
  const submitButton = contactForm.querySelector('.submit-button');
  const originalText = submitButton.textContent;

  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    submitButton.textContent = '✓ Message Sent!';
    submitButton.style.background = 'linear-gradient(135deg, #00d084 0%, #00a86b 100%)';

    // Reset form
    contactForm.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.style.background = '';
      submitButton.disabled = false;
    }, 3000);
  }, 1500);

  // Log form data (in production, send to backend)
  console.log('Form submitted:', data);
});

// Logo click - scroll to top
logo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;

  if (scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
  }
});

// Cursor trail effect (optional advanced feature)
let particles = [];
const maxParticles = 20;

document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.95) { // Reduce frequency
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'rgba(0, 166, 255, 0.6)';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.transition = 'all 1s ease';

    document.body.appendChild(particle);
    particles.push(particle);

    // Animate particle
    setTimeout(() => {
      particle.style.opacity = '0';
      particle.style.transform = 'scale(2)';
    }, 10);

    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
      particles.shift();
    }, 1000);

    // Limit number of particles
    if (particles.length > maxParticles) {
      particles[0].remove();
      particles.shift();
    }
  }
});

// Performance optimization: Reduce animations on slower devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty('--transition-fast', '0s');
  document.documentElement.style.setProperty('--transition-normal', '0s');
  document.documentElement.style.setProperty('--transition-slow', '0s');
}

// Initialize AOS-like animations for better UX
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Console log Easter egg
console.log('%c🚀 CloudNerve - Innovative IT Solutions', 'font-size: 20px; font-weight: bold; color: #00a6ff; text-shadow: 2px 2px 4px rgba(0,166,255,0.3);');
console.log('%cInterested in working with us? Visit https://cloudnerve.tech', 'font-size: 14px; color: #33b5ff;');

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
