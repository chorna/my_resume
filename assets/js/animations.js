/**
 * Animation Handler
 * Handles scroll-based animations and interactive effects
 */
class AnimationHandler {
  constructor() {
    this.animatedElements = [];
    this.init();
  }

  /**
   * Initialize animations
   */
  init() {
    // Find all elements with animation classes
    this.animatedElements = Array.from(document.querySelectorAll(
      '.animate-fade-in, .animate-slide-up, .animate-pulse, .animate-bounce'
    ));

    // Set up scroll observer for fade-in and slide-up animations
    this.setupScrollObserver();

    // Add hover animations to interactive elements
    this.setupHoverAnimations();

    // Add pulse animation to specific elements
    this.setupPulseAnimation();
  }

  /**
   * Set up Intersection Observer for scroll animations
   */
  setupScrollObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class based on existing classes
          if (entry.target.classList.contains('animate-fade-in')) {
            entry.target.classList.add('animate-fade-in-active');
          }
          if (entry.target.classList.contains('animate-slide-up')) {
            entry.target.classList.add('animate-slide-up-active');
          }
          // Once animated, we can unobserve if desired
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.animatedElements.forEach(element => {
      // Only observe elements that have scroll-based animations
      if (element.classList.contains('animate-fade-in') ||
          element.classList.contains('animate-slide-up')) {
        observer.observe(element);
      }
    });
  }

  /**
   * Set up hover animations for buttons, cards, etc.
   */
  setupHoverAnimations() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.card, .project-card, .skills-category, .education-card, .certification-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = 'var(--shadow-lg)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow-md)';
      });
    });
  }

  /**
   * Set up pulse animation for specific elements
   */
  setupPulseAnimation() {
    const pulseElements = document.querySelectorAll('.animate-pulse');
    pulseElements.forEach(element => {
      element.style.animation = 'pulse 2s infinite';
    });
  }

  /**
   * Initialize typewriter effect for text elements
   */
  initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    });
  }

  /**
   * Initialize counter animation for stats
   */
  initCounter() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
      const startTime = performance.now();

      function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);

        counter.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }

      // Start animation when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(updateCount);
          observer.unobserve(counter);
        }
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.animationHandler = new AnimationHandler();
  window.animationHandler.initTypewriter();
  window.animationHandler.initCounter();
});

// Export for potential use in other modules
window.AnimationHandler = AnimationHandler;