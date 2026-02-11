# Professional Portfolio Website

A modern, responsive portfolio website built with vanilla HTML5, CSS3, and JavaScript. Features dark/light mode toggle, smooth animations, project showcase, skills display, and contact form functionality.

## 🚀 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Mode** - Toggle between themes with persistent user preference
- **Smooth Animations** - Fade-in effects and smooth transitions throughout
- **Project Showcase** - Display your best work with project cards and search functionality
- **Skills Section** - Organize skills by category with proficiency levels
- **Certifications** - List your credentials and achievements
- **Contact Form** - Integrated contact form with Formspree (no backend needed)
- **Mobile Menu** - Hamburger navigation for small screens
- **Performance Optimized** - No heavy dependencies, fast loading times

## 📁 Project Structure

```
portfolio-project/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main styles with CSS custom properties
│   └── animations.css      # Animation keyframes and classes
├── js/
│   ├── main.js             # Core JavaScript functionality
│   ├── projects.json       # Project data
│   └── skills.json         # Skills data
├── data/
│   └── certifications.json # Certifications data
├── assets/
│   ├── images/             # Project screenshots and media (placeholder)
│   └── resume.pdf          # Your resume file
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## 🛠️ Getting Started

### Prerequisites
- A code editor (VS Code, Sublime, etc.)
- A web browser
- Git (for version control and GitHub Pages deployment)

### Installation

1. **Clone or use this project**
   ```bash
   git clone https://github.com/your-username/portfolio-project.git
   cd portfolio-project
   ```

2. **Open locally**
   - Double-click `index.html` in your file explorer, OR
   - Use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (using http-server)
     npx http-server
     ```
   - Visit `http://localhost:8000` in your browser

## 📝 Customization

### 1. Update Personal Information
Edit `index.html` and replace:
- Your name in hero section and footer
- Email and phone in contact section
- Social media links (GitHub, LinkedIn, Twitter, etc.)
- Bio/about section content

### 2. Add Your Projects
Edit `js/projects.json`. Example format:
```json
{
  "id": 1,
  "title": "Project Name",
  "description": "Brief description of your project",
  "image": "assets/images/project-1.jpg",
  "technologies": ["React", "Node.js", "MongoDB"],
  "link": "https://your-project-url.com",
  "github": "https://github.com/username/project"
}
```

### 3. Update Skills
Edit `js/skills.json`. Example format:
```json
{
  "category": "Frontend",
  "skills": [
    { "name": "React", "level": 90 },
    { "name": "JavaScript", "level": 85 }
  ]
}
```

### 4. Add Certifications
Edit `data/certifications.json` with your credentials.

### 5. Add Project Images
- Create screenshots/thumbnails of your projects
- Save to `assets/images/` folder
- Update the `image` field in projects.json

### 6. Configure Contact Form
1. Go to [formspree.io](https://formspree.io)
2. Sign up and create a new form
3. Replace `YOUR_FORM_ID` in `index.html` line 123:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### 7. Customize Colors
Edit CSS variables in `css/styles.css` (lines 6-25):
```css
:root {
    --accent-color: #6366f1;    /* Primary accent color */
    --text-primary: #1a1a1a;    /* Main text color */
    --bg-primary: #ffffff;      /* Background color */
    /* ... other colors ... */
}
```

### 8. Add Your Resume
1. Create a PDF of your resume
2. Save as `assets/resume.pdf`
3. Verify the download link works in the "Download Resume" button

## 🎨 Customization Tips

- **Fonts**: Update font-family in `styles.css` (line 21)
- **Colors**: Use the CSS custom properties system for easy theme changes
- **Animations**: Modify `animations.css` for different animation effects
- **Layout**: Adjust grid columns and spacing variables as needed

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: portfolio website"
   git branch -M main
   git remote add origin https://github.com/your-username/portfolio-project.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Save

3. **Access your live site**
   - Wait 1-2 minutes for deployment
   - Visit: `https://your-username.github.io/portfolio-project`

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build settings to:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
3. Deploy!

### Deploy to Vercel

1. Import your GitHub repository
2. Vercel automatically detects it's a static site
3. Click "Deploy"
4. Custom domain setup available

## 🎯 Performance Tips

- **Optimize images**: Compress project screenshots before upload
- **Lazy loading**: Images load when they come into view
- **CSS variables**: Enables fast dark mode switching
- **Minimal JS**: No heavy frameworks = better performance

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Respects `prefers-reduced-motion` for animations
- Good color contrast in both light and dark modes

## 🤝 Contributing

Feel free to fork this project and customize it for your portfolio!

## 📄 License

This project is open source and available for personal use.

## 📞 Support

For questions or issues:
1. Check the comments in the code
2. Review the plan-portfolioWebsite.prompt.md for implementation details
3. Consult the HTML/CSS/JavaScript comments

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript.**

Last updated: February 2026
