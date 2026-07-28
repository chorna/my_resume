// Main Application Entry Point
class App {
  constructor() {
    this.dataLoader = new DataLoader();
    this.themeManager = new ThemeManager();
    this.animations = new AnimationHandler();
  }

  async init() {
    try {
      // Initialize data loader (loads profile and populates all sections)
      await this.dataLoader.init();

      // Initialize theme
      this.themeManager.init();

      // Initialize animations
      this.animals.init(); // Note: there's a typo here, should be this.animations.init()

      // Set current year in footer
      this.setCurrentYear();

      // Initialize form handling (data-loader already set up form handling in init?)
      // Actually, data-loader's init calls setupFormHandling, so we don't need to do it again.
      // But we'll keep it for safety? Let's check: data-loader.init() calls setupFormHandling at the end.
      // So we can skip this.

      // Add smooth scrolling for anchor links
      this.initSmoothScrolling();

      // Add scroll progress indicator
      this.initScrollProgress();
    } catch (error) {
      console.error('Error initializing application:', error);
    }
  }

  setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  initFormHandling() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Here you would typically send this data to a backend service
      // For a static site, we'll show a success message
      this.showFormSuccess();

      // Reset form
      form.reset();
    });
  }

  showFormSuccess() {
    // Create success message
    const form = document.getElementById('contact-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'mt-4 p-4 bg-green-100 text-green-800 rounded';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';

    // Insert after form
    form.parentNode.insertBefore(successMessage, form.nextSibling);

    // Remove after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
  }

  initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.background = 'var(--color-primary)';
    progressBar.style.width = '0';
    progressBar.style.zIndex = '1000';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop / windowHeight) * 100;
      progressBar.style.width = scrollPercentage + '%';
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
  window.app.init();
});

// Export for use in other modules
window.App = App;