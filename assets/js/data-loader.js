/**
 * Data Loader Module
 * Loads profile data from JSON and populates the DOM
 */
class DataLoader {
  constructor() {
    this.profileData = null;
  }

  /**
   * Load profile data from JSON file
   * @returns {Promise<Object>} Profile data
   */
  async loadProfile() {
    try {
      const response = await fetch('assets/data/profile.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.profileData = await response.json();
      return this.profileData;
    } catch (error) {
      console.error('Error loading profile data:', error);
      // Return fallback data for development
      return this.getFallbackData();
    }
  }

  /**
   * Get fallback data for development
   * @returns {Object} Fallback profile data
   */
  getFallbackData() {
    return {
      "name": "Your Name",
      "headline": "Professional Title",
      "title": "Professional Title",
      "location": "City, Country",
      "photo": "assets/images/placeholder.jpg",
      "email": "your.email@example.com",
      "phone": "+1 234 567 890",
      "linkedin": "https://linkedin.com/in/yourprofile",
      "github": "https://github.com/yourusername",
      "website": "https://yourwebsite.com",
      "resume": "assets/files/resume.pdf",
      "summary": "Passionate developer with expertise in building scalable web applications.",
      "about": "I'm a dedicated Software Engineer with a passion for creating elegant, efficient, and scalable software solutions.",
      "careerHighlights": [
        "Highlight 1",
        "Highlight 2"
      ],
      "experience": [
        {
          "company": "Company Name",
          "position": "Job Title",
          "location": "City, Country",
          "startDate": "2020-01",
          "endDate": "Present",
          "description": "Brief description of your role and responsibilities.",
          "responsibilities": [
            "Responsibility 1",
            "Responsibility 2"
          ],
          "stack": [
            "Skill 1",
            "Skill 2"
          ]
        }
      ],
      "education": [
        {
          "institution": "University Name",
          "degree": "Degree Name",
          "location": "City, Country",
          "startYear": 2016,
          "endYear": 2020
        }
      ],
      "certifications": [
        {
          "name": "Certification Name",
          "issuer": "Issuing Organization",
          "date": "2023-01",
          "credentialId": "ID123456",
          "url": "https://example.com/credential"
        }
      ],
      "skills": {
        "backend": ["Python", "Django"],
        "databases": ["PostgreSQL"],
        "frontend": ["JavaScript", "React"],
        "cloud": ["AWS", "Docker"],
        "testing": ["Jest"],
        "methodologies": ["Agile"],
        "ai": ["TensorFlow"]
      },
      "featuredSkills": ["Python", "Django", "AWS"],
      "languages": [
        {
          "name": "English",
          "level": "Native"
        },
        {
          "name": "Spanish",
          "level": "Intermediate"
        }
      ],
      "projects": [
        {
          "name": "Project Name",
          "description": "Brief description of the project.",
          "technologies": ["JavaScript", "React", "Node.js"],
          "githubUrl": "https://github.com/yourusername/project",
          "liveUrl": "https://yourproject.com",
          "image": "assets/images/project-placeholder.jpg",
          "highlights": [
            "Highlight 1",
            "Highlight 2"
          ]
        }
      ],
      "interests": [
        "Artificial Intelligence",
        "Cloud Computing"
      ],
      "availability": {
        "remote": true,
        "relocation": true,
        "freelance": true
      },
      "developerDashboard": {
        "experienceYears": 5,
        "currentRole": "Developer",
        "currentCompany": "Company Name",
        "location": "City, Country",
        "workMode": "Remote",
        "summary": {
          "companies": 2,
          "industries": ["Tech", "Finance"],
          "backendProjects": 10,
          "restApis": 20,
          "cloudProvider": "AWS",
          "mainLanguage": "Python",
          "specialization": "Full Stack"
        },
        "focusAreas": [
          {
            "name": "Web Development",
            "icon": "code"
          },
          {
            "name": "Cloud Architecture",
            "icon": "cloud"
          }
        ],
        "highlights": [
          {
            "title": "5+ Years",
            "description": "Experience"
          },
          {
            "title": "Python",
            "description": "Primary Language"
          }
        ]
      },
      "techRadar": [
        {
          "category": "Backend",
          "color": "#4CAF50",
          "items": [
            {
              "name": "Python",
              "level": "Expert",
              "score": 5,
              "years": 5,
              "favorite": true
            }
          ]
        }
      ],
      "socialNetworks": [
        {
          "name": "LinkedIn",
          "url": "https://linkedin.com/in/yourprofile",
          "icon": "linkedin"
        },
        {
          "name": "GitHub",
          "url": "https://github.com/yourusername",
          "icon": "github"
        }
      ]
    };
  }

  /**
   * Initialize the page with loaded data
   * @returns {Promise<void>}
   */
  async init() {
    await this.loadProfile();
    this.populateAllSections();
  }

  /**
   * Populate all sections with data
   */
  populateAllSections() {
    this.populateHero();
    this.populateAbout();
    this.populateExperience();
    this.populateEducation();
    this.populateProjects();
    this.populateCertifications();
    this.populateLanguages();
    this.populateDeveloperDashboard();
    this.populateTechRadar();
    this.populateContact();
    // Testimonials and Skills sections removed as per new schema
  }

  /**
   * Populate hero section
   */
  populateHero() {
    const { name, headline, summary, photo } = this.profileData;

    const heroName = document.querySelector('.hero-title');
    const heroTitle = document.querySelector('.hero-tagline');
    const heroBio = document.querySelector('.hero-description');
    const heroImage = document.querySelector('.hero-image img');

    if (heroName) heroName.textContent = name;
    if (heroTitle) heroTitle.textContent = headline;
    if (heroBio) heroBio.textContent = summary;
    if (heroImage) {
      heroImage.src = photo || 'assets/images/placeholder.jpg';
      heroImage.alt = `${name} photo`;
    }
  }

  /**
   * Populate about section
   */
  populateAbout() {
    const { name, about } = this.profileData;

    const aboutName = document.querySelector('#about .about-text h2');
    const aboutBio = document.querySelector('#about .about-description');

    if (aboutName) aboutName.textContent = name;
    if (aboutBio) aboutBio.textContent = about;
  }

  /**
   * Populate experience section
   */
  populateExperience() {
    const timeline = document.querySelector('#experience .experience-timeline');
    if (!timeline) return;

    timeline.innerHTML = '';

    this.profileData.experience.forEach((exp, index) => {
      const item = document.createElement('div');
      item.className = 'experience-item';
      item.setAttribute('data-item-index', index + 1);

      // Format dates
      const startDate = new Date(exp.startDate.replace(/-/g, '/'));
      const endDate = exp.endDate ? new Date(exp.endDate.replace(/-/g, '/')) : null;
      const startFormatted = startDate.toLocaleDateString('default', { month: 'short', year: 'numeric' });
      const endFormatted = endDate ? endDate.toLocaleDateString('default', { month: 'short', year: 'numeric' }) : 'Present';

      // Responsibilities list
      const responsibilitiesList = exp.responsibilities && exp.responsibilities.length > 0 ?
        `<ul class="experience-responsibilities">${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>` : '';

      // Technology stack badges
      const stackBadges = exp.stack && exp.stack.length > 0 ?
        `<div class="experience-stack">${exp.stack.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}</div>` : '';

      item.innerHTML = `
        <div class="experience-content">
          <div class="experience-header">
            <h3 class="experience-company">${exp.company}</h3>
            <p class="experience-position">${exp.position}</p>
          </div>
          <div class="experience-meta">
            <p class="experience-period">${startFormatted} – ${endFormatted}</p>
            ${exp.location ? `<p class="experience-location">${exp.location}</p>` : ''}
          </div>
          ${exp.description ? `<p class="experience-description">${exp.description}</p>` : ''}
          ${responsibilitiesList}
          ${stackBadges}
        </div>
      `;

      timeline.appendChild(item);
    });

    // Setup intersection observer for fade-in animations
    this.initExperienceObserver();
  }

  /**
   * Initialize intersection observer for experience items
   */
  initExperienceObserver() {
    const items = document.querySelectorAll('.experience-item');
    if (!items.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Unobserve after animation triggers
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    items.forEach((item, index) => {
      // Set custom property for staggered delay
      item.style.setProperty('--item-index', index + 1);
      observer.observe(item);
    });
  }

  /**
   * Populate education section
   */
  populateEducation() {
    const grid = document.querySelector('#education .education-grid');
    if (!grid) return;

    grid.innerHTML = '';

    this.profileData.education.forEach(edu => {
      const card = document.createElement('div');
      card.className = 'education-card';

      card.innerHTML = `
        <div class="education-icon">
          🎓
        </div>
        <h3 class="education-title">${edu.institution}</h3>
        <p class="education-degree">${edu.degree}</p>
        ${edu.location ? `<p class="education-location">${edu.location}</p>` : ''}
        <p class="education-period">${edu.startYear} – ${edu.endYear}</p>
      `;

      grid.appendChild(card);
    });
  }

  /**
   * Populate projects section
   */
  populateProjects() {
    const grid = document.querySelector('#projects .projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    this.profileData.projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      // Technologies badges
      const techBadges = project.technologies && project.technologies.length > 0 ?
        `<div class="project-technologies">${project.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')}</div>` : '';

      // Highlights list
      const highlightsList = project.highlights && project.highlights.length > 0 ?
        `<ul class="project-highlights">${project.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : '';

      card.innerHTML = `
        <div class="project-image">
          <img src="${project.image || 'assets/images/project-placeholder.jpg'}" alt="${project.name}">
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.name}</h3>
          <p class="project-description">${project.description}</p>
          ${techBadges}
          ${highlightsList}
          <div class="project-links">
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="project-link">GitHub</a>` : ''}
            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="project-link">Live Demo</a>` : ''}
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  /**
   * Populate certifications section
   */
  populateCertifications() {
    const grid = document.querySelector('#certifications .certifications-grid');
    if (!grid) return;

    grid.innerHTML = '';

    this.profileData.certifications.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'certification-card';

      card.innerHTML = `
        <div class="certification-icon">
          🏆
        </div>
        <h3 class="certification-title">${cert.name}</h3>
        <p class="certification-issuer">Issued by ${cert.issuer}</p>
        <p class="certification-date">${cert.date}</p>
        ${cert.credentialId ? `<p class="certification-id">ID: ${cert.credentialId}</p>` : ''}
        ${cert.url ? `<a href="${cert.url}" target="_blank" rel="noopener" class="certification-url">Verify Credential</a>` : ''}
      `;

      grid.appendChild(card);
    });
  }

  /**
   * Populate languages section
   */
  populateLanguages() {
    const list = document.querySelector('#languages .languages-list');
    if (!list) return;

    list.innerHTML = '';

    this.profileData.languages.forEach(lang => {
      const item = document.createElement('div');
      item.className = 'language-item';

      item.innerHTML = `
        <h3 class="language-name">${lang.name}</h3>
        <div class="language-level">
          <span class="language-level-dot ${this.getProficiencyClass(lang.level)}"></span>
          <span>${lang.level}</span>
        </div>
      `;

      list.appendChild(item);
    });
  }

  /**
   * Get CSS class for language proficiency
   * @param {string} proficiency - Proficiency level
   * @returns {string} CSS class name
   */
  getProficiencyClass(proficiency) {
    const level = proficiency.toLowerCase();
    if (level.includes('expert')) return 'expert';
    if (level.includes('advanced') || level.includes('fluent')) return 'advanced';
    if (level.includes('intermediate')) return 'intermediate';
    return 'beginner';
  }

  /**
   * Populate Developer Dashboard section
   */
  populateDeveloperDashboard() {
    const dashboardContainer = document.querySelector('#developer-dashboard');
    if (!dashboardContainer) return;

    const { experienceYears, currentRole, currentCompany, location, workMode, summary, focusAreas, highlights } = this.profileData.developerDashboard;

    // Create dashboard structure
    dashboardContainer.innerHTML = `
      <div class="dashboard-header">
        <h2 class="dashboard-title">Developer Dashboard</h2>
      </div>
      <div class="dashboard-content"></div>
      <div class="dashboard-focus">
        <h3 class="dashboard-section-title">Focus Areas</h3>
        <div class="focus-areas-grid"></div>
      </div>
      <div class="dashboard-highlights">
        <h3 class="dashboard-section-title">Highlights</h3>
        <div class="highlights-grid"></div>
      </div>
    `;

    // Get references to containers
    const statsContainer = dashboardContainer.querySelector('.dashboard-content');
    const focusAreasContainer = dashboardContainer.querySelector('.focus-areas-grid');
    const highlightsContainer = dashboardContainer.querySelector('.highlights-grid');

    // Create and populate stats
    this.createStats(statsContainer, experienceYears, currentRole, currentCompany, location, workMode, summary);

    // Create and populate focus areas
    this.createFocusAreas(focusAreasContainer, focusAreas);

    // Create and populate highlights
    this.createHighlights(highlightsContainer, highlights);

    // Trigger animation on scroll
    this.animateDashboardItems();
  }

  /**
   * Create and populate stats cards
   */
  createStats(container, experienceYears, currentRole, currentCompany, location, workMode, summary) {
    const stats = [
      {
        value: `${experienceYears}+`,
        label: 'Experience Years',
        icon: 'fas fa-briefcase',
        highlight: true
      },
      {
        value: currentRole,
        label: 'Current Role',
        icon: 'fas fa-user-tie',
        highlight: true
      },
      {
        value: currentCompany,
        label: 'Current Company',
        icon: 'fas fa-building',
        highlight: true
      },
      {
        value: location,
        label: 'Location',
        icon: 'fas fa-map-marker-alt'
      },
      {
        value: workMode,
        label: 'Work Mode',
        icon: 'fas fa-network-wired'
      },
      {
        value: summary.cloudProvider,
        label: 'Cloud Provider',
        icon: 'fas fa-cloud'
      },
      {
        value: summary.mainLanguage,
        label: 'Main Language',
        icon: 'fas fa-laptop-code'
      },
      {
        value: summary.backendProjects,
        label: 'Backend Projects',
        icon: 'fas fa-code'
      },
      {
        value: summary.restApis,
        label: 'REST APIs',
        icon: 'fas fa-globe'
      },
      {
        value: summary.specialization,
        label: 'Specialization',
        icon: 'fas fa-bullseye'
      }
    ];

    stats.forEach((stat, index) => {
      const card = document.createElement('div');
      card.className = `stat-card ${stat.highlight ? 'highlight' : ''} animate-fade-in`;
      card.style.setProperty('--item-index', index + 1);

      card.innerHTML = `
        <div class="stat-icon">
          <i class="${stat.icon}"></i>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">${stat.value}</h3>
          <p class="stat-label">${stat.label}</p>
        </div>
      `;

      container.appendChild(card);
    });
  }

  /**
   * Create and populate focus areas cards
   */
  createFocusAreas(container, focusAreas) {
    if (!focusAreas || focusAreas.length === 0) return;

    focusAreas.forEach((area, index) => {
      const card = document.createElement('div');
      card.className = `focus-area-card animate-fade-in`;
      card.style.setProperty('--item-index', index + 1);

      card.innerHTML = `
        <div class="focus-area-icon">
          ${this.getIconHtml(area.icon)}
        </div>
        <h4 class="focus-area-name">${area.name}</h4>
      `;

      container.appendChild(card);
    });
  }

  /**
   * Create and populate highlights cards
   */
  createHighlights(container, highlights) {
    if (!highlights || highlights.length === 0) return;

    highlights.forEach((highlight, index) => {
      const card = document.createElement('div');
      card.className = `highlight-card animate-fade-in`;
      card.style.setProperty('--item-index', index + 1);

      card.innerHTML = `
        <h4 class="highlight-title">${highlight.title}</h4>
        <p class="highlight-description">${highlight.description}</p>
      `;

      container.appendChild(card);
    });
  }

  /**
   * Animate dashboard items on scroll
   */
  animateDashboardItems() {
    const items = document.querySelectorAll('#developer-dashboard .animate-fade-in');
    if (!items.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-active');
          // Unobserve after animation triggers
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    items.forEach(item => {
      observer.observe(item);
    });
  }

  /**
   * Populate Tech Radar section
   */
  populateTechRadar() {
    const radarContainer = document.querySelector('#tech-radar');
    if (!radarContainer) return;

    const techRadar = this.profileData.techRadar;

    let categoriesHTML = '';

    techRadar.forEach((category, index) => {
      const { category: catName, color, items } = category;
      const itemCount = items && items.length > 0 ? items.length : 0;
      const iconName = this.getCategoryIcon(catName);

      const itemsHTML = items && items.length > 0 ?
        `<div class="radar-items">
          ${items.map((item, itemIndex) => {
            const { name, level, score, years, favorite } = item;
            const levelClass = this.getLevelClass(level);
            const favoriteClass = favorite ? 'favorite' : '';
            return `
              <div class="radar-tech-item ${favoriteClass}">
                <div class="radar-tech-content">
                  <div class="radar-tech-header">
                    <h4 class="radar-tech-name">${name}</h4>
                    ${favorite ? '<span class="favorite-badge">⭐ Favorite</span>' : ''}
                  </div>
                  <div class="radar-tech-details">
                    <div class="radar-tech-rating">${'★'.repeat(score)}${'☆'.repeat(5 - score)}</div>
                    <div class="radar-tech-meta">
                      <span class="radar-tech-years">${years} yrs</span>
                      <span class="radar-tech-level level-${this.getLevelClass(level).split('-')[1]}">${level}</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>` : '';

      categoriesHTML += `
        <div class="radar-category-wrapper">
          <button class="radar-category-header" aria-expanded="false" aria-controls="category-${index}">
            <div class="radar-category-icon">${this.getIconHtml(iconName)}</div>
            <h3 class="radar-category-title">${catName}</h3>
            <span class="radar-category-count">${itemCount}</span>
            <span class="radar-category-toggle">▼</span>
          </button>
          <div class="radar-category-content" id="category-${index}">
            ${itemsHTML}
          </div>
        </div>
      `;
    });

    radarContainer.innerHTML = `
      <div class="radar-header">
        <h2 class="radar-title">Tech Radar</h2>
      </div>
      <div class="radar-accordion">
        ${categoriesHTML}
      </div>
    `;

    // Add event listeners for accordion functionality
    setTimeout(() => {
      this.initAccordion();
    }, 0);
  }

  /**
   * Get icon class name for category
   * @param {string} categoryName - Category name
   * @returns {string} Icon class name
   */
  getCategoryIcon(categoryName) {
    const iconMap = {
      'Backend': 'server',
      'Databases': 'database',
      'Cloud & DevOps': 'cloud',
      'Frontend': 'code',
      'Testing': 'flask',
      'Artificial Intelligence': 'brain'
    };
    return iconMap[categoryName] || 'cog';
  }

  /**
   * Get icon HTML based on icon name (for Font Awesome or similar)
   * @param {string} iconName - Icon name (e.g., 'server', 'brain')
   * @returns {string} HTML for icon
   */
  getIconHtml(iconName) {
    // Map icon names to Font Awesome classes (assuming Font Awesome is available)
    const iconMap = {
      'server': 'fas fa-server',
      'layers': 'fas fa-layer-group',
      'brain': 'fas fa-brain',
      'cloud': 'fas fa-cloud',
      'workflow': 'fas fa-project-diagram',
      'credit-card': 'fas fa-credit-card',
      'code': 'fas fa-code',
      // Default
      'default': 'fas fa-cog'
    };
    return `<i class="${iconMap[iconName] || iconMap.default}"></i>`;
  }

  /**
   * Get CSS class for tech radar level
   * @param {string} level - Level string (Expert, Advanced, etc.)
   * @returns {string} CSS class name
   */
  getLevelClass(level) {
    const levelLower = level.toLowerCase();
    if (levelLower.includes('expert')) return 'level-expert';
    if (levelLower.includes('advanced')) return 'level-advanced';
    if (levelLower.includes('intermediate')) return 'level-intermediate';
    return 'level-learning';
  }

  /**
   * Initialize accordion functionality for Tech Radar
   */
  initAccordion() {
    const headers = document.querySelectorAll('.radar-category-header');

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const isOpen = header.getAttribute('aria-expanded') === 'true';

        // Close all other sections
        headers.forEach(h => {
          h.setAttribute('aria-expanded', 'false');
          const contentId = h.getAttribute('aria-controls');
          const content = document.getElementById(contentId);
          if (content) {
            content.style.maxHeight = null;
          }
        });

        // Toggle current section
        header.setAttribute('aria-expanded', !isOpen);
        const contentId = header.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        if (content) {
          if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
          } else {
            content.style.maxHeight = null;
          }
        }
      });
    });
  }

  
  /**
   * Populate contact section
   */
  populateContact() {
    // Contact info
    const contactInfo = document.querySelector('#contact .contact-links');
    if (contactInfo) {
      const { email, phone, linkedin, github, website, location } = this.profileData;

      contactInfo.innerHTML = `
        ${email ? `<div class="contact-item">
          <span>📧</span>
          <span>${email}</span>
        </div>` : ''}
        ${phone ? `<div class="contact-item">
          <span>📞</span>
          <span>${phone}</span>
        </div>` : ''}
        ${location ? `<div class="contact-item">
          <span>📍</span>
          <span>${location}</span>
        </div>` : ''}
        ${linkedin ? `<div class="contact-item">
          <span>💼</span>
          <a href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        </div>` : ''}
        ${github ? `<div class="contact-item">
          <span>💻</span>
          <a href="${github}" target="_blank" rel="noopener">GitHub</a>
        </div>` : ''}
        ${website ? `<div class="contact-item">
          <span>🌐</span>
          <a href="${website}" target="_blank" rel="noopener">Website</a>
        </div>` : ''}
      `;
    }

    // Contact form - removed as per new design
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.innerHTML = ''; // Clear form if it exists
    }
  }
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const loader = new DataLoader();
  loader.init();
});

// Export for potential use in other modules
window.DataLoader = DataLoader;