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
      "title": "Software Engineer",
      "bio": "Passionate developer with expertise in building scalable web applications.",
      "photo": "assets/images/placeholder.jpg",
      "email": "your.email@example.com",
      "location": "City, Country",
      "linkedin": "https://linkedin.com/in/yourprofile",
      "github": "https://github.com/yourusername",
      "website": "https://yourwebsite.com",
      "experience": [
        {
          "company": "Company Name",
          "position": "Job Title",
          "location": "City, Country",
          "startDate": "Jan 2020",
          "endDate": "Present",
          "description": "Brief description of your role and responsibilities.",
          "highlights": [
            "Achievement 1",
            "Achievement 2",
            "Achievement 3"
          ]
        }
      ],
      "education": [
        {
          "institution": "University Name",
          "degree": "Degree Name",
          "fieldOfStudy": "Field of Study",
          "startDate": "Sep 2016",
          "endDate": "Jun 2020",
          "description": "Brief description of your education."
        }
      ],
      "skills": {
        "technical": ["JavaScript", "HTML/CSS", "React", "Node.js", "Python"],
        "frameworks": ["React", "Vue", "Angular", "Express"],
        "tools": ["Git", "Docker", "AWS", "VS Code"]
      },
      "languages": [
        {
          "language": "English",
          "proficiency": "Native"
        },
        {
          "language": "Spanish",
          "proficiency": "Intermediate"
        }
      ],
      "projects": [
        {
          "name": "Project Name",
          "description": "Brief description of the project.",
          "image": "assets/images/project-placeholder.jpg",
          "tags": ["JavaScript", "React", "Node.js"],
          "links": [
            {
              "label": "Live Demo",
              "url": "#"
            },
            {
              "label": "Source Code",
              "url": "#"
            }
          ]
        }
      ],
      "certifications": [
        {
          "name": "Certification Name",
          "issuer": "Issuing Organization",
          "date": "Date Earned",
          "id": "ID123456"
        }
      ],
      "awards": [
        {
          "title": "Award Name",
          "issuer": "Awarding Organization",
          "date": "Date Received",
          "description": "Brief description of the award."
        }
      ],
      "testimonials": [
        {
          "quote": "This person is amazing to work with!",
          "author": "Colleague Name",
          "position": "Job Title at Company"
        }
      ],
      "social": {
        "twitter": "https://twitter.com/yourusername",
        "linkedin": "https://linkedin.com/in/yourprofile",
        "github": "https://github.com/yourusername",
        "website": "https://yourwebsite.com"
      }
    };
  }

  /**
   * Initialize the page with loaded data
   * @returns {Promise<void>}
   */
  async init() {
    await this.loadProfile();
    this.populateAllSections();
    this.setupFormHandling();
  }

  /**
   * Populate all sections with data
   */
  populateAllSections() {
    this.populateHero();
    this.populateAbout();
    this.populateExperience();
    this.populateEducation();
    this.populateSkills();
    this.populateProjects();
    this.populateCertifications();
    this.populateLanguages();
    this.populateTestimonials();
    this.populateContact();
  }

  /**
   * Populate hero section
   */
  populateHero() {
    const { name, title, bio, photo } = this.profileData;

    document.getElementById('hero-name').textContent = name;
    document.getElementById('hero-title').textContent = title;
    document.getElementById('hero-bio').textContent = bio;
    document.getElementById('hero-image').src = photo || 'assets/images/placeholder.jpg';
    document.getElementById('hero-image').alt = `${name} photo`;
  }

  /**
   * Populate about section
   */
  populateAbout() {
    const { name, bio } = this.profileData;

    document.getElementById('about-name').textContent = name;
    document.getElementById('about-bio').textContent = bio;
  }

  /**
   * Populate experience section
   */
  populateExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    timeline.innerHTML = '';

    this.profileData.experience.forEach((exp, index) => {
      const item = document.createElement('div');
      item.className = 'experience-item';
      item.setAttribute('data-item-index', index + 1);

      item.innerHTML = `
        <div class="experience-content">
          <span class="experience-date">${exp.startDate} – ${exp.endDate || 'Present'}</span>
          <h3 class="experience-company">${exp.company}</h3>
          <p class="experience-position">${exp.position}</p>
          ${exp.location ? `<p class="experience-location">${exp.location}</p>` : ''}
          ${exp.description ? `<p class="experience-description">${exp.description}</p>` : ''}
          ${exp.highlights && exp.highlights.length > 0 ? `
            <ul class="experience-highlights">
              ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `;

      timeline.appendChild(item);
    });
  }

  /**
   * Populate education section
   */
  populateEducation() {
    const grid = document.getElementById('education-grid');
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
        <p class="education-degree">${edu.degree}${edu.fieldOfStudy ? `, ${edu.fieldOfStudy}`}</p>
        <p class="education-period">${edu.startDate} – ${edu.endDate}</p>
        ${edu.description ? `<p class="education-description">${edu.description}</p>` : ''}
      `;

      grid.appendChild(card);
    });
  }

  /**
   * Populate skills section
   */
  populateSkills() {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;

    skillsContainer.innerHTML = '';

    // Technical skills
    if (this.profileData.skills?.technical) {
      const techCategory = document.createElement('div');
      techCategory.className = 'skills-category';

      techCategory.innerHTML = `
        <h3 class="skills-category-title">Technical Skills</h3>
        <div class="skills-list">
          ${this.profileData.skills.technical.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      `;

      skillsContainer.appendChild(techCategory);
    }

    // Frameworks
    if (this.profileData.skills?.frameworks) {
      const fwCategory = document.createElement('div');
      fwCategory.className = 'skills-category';

      fwCategory.innerHTML = `
        <h3 class="skills-category-title">Frameworks & Libraries</h3>
        <div class="skills-list">
          ${this.profileData.skills.frameworks.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      `;

      skillsContainer.appendChild(fwCategory);
    }

    // Tools
    if (this.profileData.skills?.tools) {
      const toolsCategory = document.createElement('div');
      toolsCategory.className = 'skills-category';

      toolsCategory.innerHTML = `
        <h3 class="skills-category-title">Tools & Platforms</h3>
        <div class="skills-list">
          ${this.profileData.skills.tools.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      `;

      skillsContainer.appendChild(toolsCategory);
    }
  }

  /**
   * Populate projects section
   */
  populateProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    this.profileData.projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      card.innerHTML = `
        <div class="project-image">
          <img src="${project.image || 'assets/images/project-placeholder.jpg'}" alt="${project.name}">
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.name}</h3>
          <p class="project-description">${project.description}</p>
          ${project.tags && project.tags.length > 0 ? `
            <div class="project-tags">
              ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
          <div class="project-links">
            ${project.links && project.links.length > 0 ? project.links.map(link => `
              <a href="${link.url}" target="_blank" rel="noopener" class="project-link">
                ${link.label}
              </a>
            `).join('') : ''}
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
    const grid = document.getElementById('certifications-grid');
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
        ${cert.id ? `<p class="certification-id">ID: ${cert.id}</p>` : ''}
      `;

      grid.appendChild(card);
    });
  }

  /**
   * Populate languages section
   */
  populateLanguages() {
    const list = document.getElementById('languages-list');
    if (!list) return;

    list.innerHTML = '';

    this.profileData.languages.forEach(lang => {
      const item = document.createElement('div');
      item.className = 'language-item';

      item.innerHTML = `
        <h3 class="language-name">${lang.language}</h3>
        <div class="language-level">
          <span class="language-level-dot ${this.getProficiencyClass(lang.proficiency)}"></span>
          <span>${lang.proficiency}</span>
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
   * Populate testimonials section
   */
  populateTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = '';

    this.profileData.testimonials.forEach((testimonial, index) => {
      const slide = document.createElement('div');
      slide.className = `testimonial-slide ${index === 0 ? 'active' : ''}`;

      slide.innerHTML = `
        <div class="testimonial-avatar">
          <img src="assets/images/avatar-placeholder.jpg" alt="${testimonial.author}">
        </div>
        <p class="testimonial-content">"${testimonial.quote}"</p>
        <h4 class="testimonial-author">${testimonial.author}</h4>
        <p class="testimonial-position">${testimonial.position}</p>
      `;

      container.appendChild(slide);
    });
  }

  /**
   * Populate contact section
   */
  populateContact() {
    // Contact info
    const contactInfo = document.getElementById('contact-info');
    if (contactInfo) {
      const { email, location, linkedin, github, website } = this.profileData;

      contactInfo.innerHTML = `
        <div class="contact-item">
          <span>📧</span>
          <span>${email}</span>
        </div>
        <div class="contact-item">
          <span>📍</span>
          <span>${location}</span>
        </div>
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

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      // Form will be handled by setupFormHandling
    }
  }

  /**
   * Setup form handling
   */
  setupFormHandling() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Here you would typically send the data to a backend service
      // For static site, we'll just show a success message
      alert('Thank you for your message! I will get back to you soon.');

      // Reset form
      form.reset();
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const loader = new DataLoader();
  loader.init();
});

// Export for potential use in other modules
window.DataLoader = DataLoader;