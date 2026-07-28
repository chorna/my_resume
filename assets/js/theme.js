// Theme Manager
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.rootElement = document.documentElement;
    this.init();
  }

  init() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (systemPrefersDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }

    // Add click event listener to toggle button
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Update icon based on current theme
    this.updateThemeIcon();
  }

  toggleTheme() {
    const currentTheme = this.rootElement.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    if (theme === 'dark') {
      this.rootElement.classList.add('dark-theme');
      this.rootElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.rootElement.classList.remove('dark-theme');
      this.rootElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    if (!this.themeToggle) return;
    const isDark = this.rootElement.classList.contains('dark-theme');
    this.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});

// Export for use in other modules
window.ThemeManager = ThemeManager;