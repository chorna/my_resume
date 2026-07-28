# Christian's Portfolio - CV Website

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript. Designed to showcase professional experience, skills, projects, and achievements.

## Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Dark/Light Mode**: Toggle between light and dark themes with preference persistence
- **Dynamic Content Loading**: All content loaded from JSON data file
- **Smooth Animations**: Scroll animations, hover effects, and interactive elements
- **Accessible**: Follows accessibility best practices
- **SEO Optimized**: Proper meta tags, semantic HTML, and structured data
- **Contact Form**: Functional contact form with success feedback
- **Easy Customization**: Simple JSON structure to update all content

## File Structure

```
.
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   ├── variables.css   # CSS variables and theme definitions
│   │   ├── style.css       # Main stylesheet
│   │   └── responsive.css  # Responsive design adjustments
│   ├── js/
│   │   ├── app.js          # Main application controller
│   │   ├── data-loader.js  # JSON data loading and population
│   │   ├── theme.js        # Dark/light theme management
│   │   └── animations.js   # Scroll and hover animations
│   ├── data/
│   │   └── profile.json    # All content data (bio, experience, projects, etc.)
│   └── images/             # Image assets
└── README.md               # This file
```

## Customization

### Updating Content
All content is stored in `assets/data/profile.json`. Simply edit this JSON file to update:
- Personal information (name, title, bio, contact)
- Professional experience
- Education background
- Skills and technologies
- Projects showcases
- Certifications
- Languages
- Testimonials
- Awards and publications

### Styling
- Modify CSS variables in `assets/css/variables.css` to change colors, spacing, typography
- Adjust styles in `assets/css/style.css` and `assets/css/responsive.css`
- Add custom images to `assets/images/` directory

### Images
- Replace placeholder images in `assets/images/` with your own
- Update image paths in `profile.json` if needed

## Development

### Prerequisites
- Web browser (modern Chrome, Firefox, Safari, or Edge)
- No build tools or dependencies required

### Local Development
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Make changes to files and refresh browser to see updates

### Deployment
This site is designed to be deployed on GitHub Pages:
1. Push repository to GitHub
2. Go to repository Settings → Pages
3. Select branch and folder (usually `main` and `/`)
4. Click Save
5. Site will be published at `https://[username].github.io/[repository]/`

## Browser Support
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- Mobile browsers (iOS Safari, Android Chrome) ✓

## Accessibility Features
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigable interface
- Sufficient color contrast
- Responsive text scaling
- Focus visible indicators

## Performance Optimizations
- Minimal CSS and JavaScript
- Efficient CSS selectors
- Optimized image loading
- No render-blocking resources
- Efficient animations using CSS transforms

## Credits
- Icons: [Font Awesome](https://fontawesome.com)
- Color inspiration: Modern UI design principles
- Fonts: System fonts for optimal performance

## License
This project is open source and available under the [MIT License](LICENSE).