// Theme Manager
class ThemeManager {
  constructor() {
    this.themeCheckbox = document.querySelector('.theme-toggle-checkbox');
    this.rootElement = document.documentElement;
    this.init();
  }

  init() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      this.setTheme(savedTheme);
      // Update checkbox state
      if (this.themeCheckbox) {
        this.themeCheckbox.checked = savedTheme === 'dark';
      }
    } else if (systemPrefersDark) {
      this.setTheme('dark');
      if (this.themeCheckbox) {
        this.themeCheckbox.checked = true;
      }
    } else {
      this.setTheme('light');
      if (this.themeCheckbox) {
        this.themeCheckbox.checked = false;
      }
    }

    // Add change event listener to checkbox
    if (this.themeCheckbox) {
      this.themeCheckbox.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        this.setTheme(newTheme);
      });
    }

    // Initial UI update
    this.updateThemeUI();
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
    this.updateThemeUI();
  }

  updateThemeUI() {
    const isDark = this.rootElement.classList.contains('dark-theme');
    // Update any slider-based UI if needed (our CSS handles this via class)
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});

// Export for use in other modules
window.ThemeManager = ThemeManager;