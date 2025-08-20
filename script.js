// Add active class to current nav link
document.addEventListener('DOMContentLoaded', function() {
  // Highlight active page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Create floating particles
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 30 : 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${0.3 + Math.random() * 0.7}`;
      particle.style.animationDuration = `${10 + Math.random() * 20}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
    }
  }

  createParticles();

  // Dynamic cursor effect
  const overlay = document.querySelector('.quantum-overlay');
  if (overlay) {
    overlay.addEventListener('mousemove', (e) => {
      // Create temporary particle connection effect
      const x = e.clientX;
      const y = e.clientY;
      const pulse = document.createElement('div');
      pulse.style.cssText = `
        position: absolute;
        top: ${y}px;
        left: ${x}px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(0, 216, 255, 0.7);
        box-shadow: 0 0 15px #0d8bff;
        z-index: 10;
        pointer-events: none;
        animation: connect-pulse 1.2s forwards;
      `;
      overlay.appendChild(pulse);

      setTimeout(() => {
        pulse.remove();
      }, 1200);
    });
  }
});

// Typing effect loop
const phrases = [
  "Innovate. Integrate. Inspire. ",
  "Be Electrified! ",
  "Powered by BRAC University. ",
  "Where Ideas Become Reality. ",
  "Engineering the Future. "
];
let i = 0, j = 0, currentPhrase = [], isDeleting = false, isEnd = false;

function loop() {
  const typewriter = document.getElementById('typewriter');

  // If the element doesn't exist on this page, stop the function immediately
  if (!typewriter) {
    return;
  }

  isEnd = false;
  typewriter.innerHTML = currentPhrase.join('');

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
    }

    if (isDeleting && j <= phrases[i].length) {
      currentPhrase.pop();
      j--;
    }

    if (j === phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        i = 0;
      }
    }
  }

  const typingSpeed = isEnd ? 2000 : isDeleting ? 40 : 90;
  setTimeout(loop, typingSpeed);
}

// Add CSS for connect pulse animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes connect-pulse {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(5); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', loop);

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Check if it's a stat element
      if (entry.target.classList.contains('stat-value')) {
        animateValue(entry.target);
      }
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

document.querySelectorAll('.stat-value').forEach(el => {
  observer.observe(el);
});

// Number counting animation
function animateValue(element) {
  if (element.dataset.animated) return;

  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      current = target;
      element.dataset.animated = true;
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Handle top bar scroll effect
window.addEventListener('scroll', function() {
  const topBar = document.querySelector('.top-bar');
  if (topBar) {
    if (window.scrollY > 50) {
      topBar.classList.add('scrolled');
    } else {
      topBar.classList.remove('scrolled');
    }
  }
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeSidebar = document.getElementById('closeSidebar');

if (hamburger && sidebarOverlay) {
  // Open sidebar
  hamburger.addEventListener('click', () => {
    sidebarOverlay.classList.add('active');
  });
}

if (closeSidebar && sidebarOverlay) {
  // Close sidebar
  closeSidebar.addEventListener('click', () => {
    sidebarOverlay.classList.remove('active');
  });
}

if (sidebarOverlay) {
  // Close sidebar when clicking outside
  sidebarOverlay.addEventListener('click', (e) => {
    if (e.target === sidebarOverlay) {
      sidebarOverlay.classList.remove('active');
    }
  });
}

// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  if (!themeToggle) return;

  // Function to set theme
  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update icon
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }
  }

  // Get saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? 'dark' : 'light');
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
});