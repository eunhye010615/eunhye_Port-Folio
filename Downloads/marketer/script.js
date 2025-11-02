// Smooth scroll for navigation links
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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
  }

  lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(section);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(card);
});

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(card);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled * 0.002);
  }
});

// Add hover effect to project sections
document.querySelectorAll('.project-section').forEach(section => {
  section.addEventListener('mouseenter', function () {
    this.style.backgroundColor = '#f8f9fa';
    this.style.padding = '1rem';
    this.style.borderRadius = '8px';
    this.style.transition = 'all 0.3s ease';
  });

  section.addEventListener('mouseleave', function () {
    this.style.backgroundColor = 'transparent';
    this.style.padding = '0';
  });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add animation delays to strength list items
  const strengthItems = document.querySelectorAll('.strength-list li');
  strengthItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Add animation delays to skill cards
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Console welcome message
  console.log('%c Design with Purpose ', 'background: #4ECDC4; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
  console.log('%c Portfolio created with passion and attention to detail ', 'color: #2C3E50; font-size: 14px;');
});

// Add smooth reveal for color boxes
const colorBoxes = document.querySelectorAll('.color-box');
colorBoxes.forEach((box, index) => {
  box.style.opacity = '0';
  box.style.transform = 'scale(0.9)';
  box.style.transition = 'all 0.5s ease';

  setTimeout(() => {
    box.style.opacity = '1';
    box.style.transform = 'scale(1)';
  }, 100 * index);
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
  const navbar = document.querySelector('.navbar .container');
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '☰';
  menuToggle.style.display = 'none';

  if (window.innerWidth <= 768) {
    menuToggle.style.display = 'block';
  }

  navbar.prepend(menuToggle);

  menuToggle.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
  });
};

window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      menuToggle.style.display = 'block';
    }
  }
});

// Print-friendly CSS adjustments
window.addEventListener('beforeprint', () => {
  document.body.style.fontSize = '12pt';
});

window.addEventListener('afterprint', () => {
  document.body.style.fontSize = '';
});