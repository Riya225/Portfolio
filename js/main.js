/* ============================================
   PORTFOLIO WEBSITE - MAIN JAVASCRIPT
   ============================================ */

// ============================================
// DARK MODE TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const THEME_STORAGE_KEY = 'portfolio-theme';

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<span class="theme-icon">☀️</span>';
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<span class="theme-icon">🌙</span>';
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleTheme);

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-item');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for scroll animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('scroll-animate');
    observer.observe(section);
});

// ============================================
// LOAD PROJECTS FROM JSON
// ============================================

async function loadProjects() {
    try {
        const response = await fetch('js/projects.json');
        const projects = await response.json();
        
        const projectsContainer = document.getElementById('projectsContainer');
        projectsContainer.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
            // Stagger animation
            projectCard.style.setProperty('--delay', index * 0.1 + 's');
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsContainer').innerHTML = 
            '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">Failed to load projects. Please check projects.json file.</p>';
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.searchText = (project.title + ' ' + project.description + ' ' + project.technologies.join(' ')).toLowerCase();
    
    const techTags = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='assets/images/placeholder.jpg'">
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
            <div class="project-links">
                ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Live</a>` : ''}
                ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>` : ''}
                ${project.pdf ? `<a href="${project.pdf}" target="_blank" class="project-link">View Project</a>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Load projects on page load
document.addEventListener('DOMContentLoaded', loadProjects);

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    const cards = document.querySelectorAll('.project-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const searchText = card.dataset.searchText || '';
        const isMatch = searchText.includes(term);
        
        if (isMatch || term === '') {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Show/hide clear button
    if (searchTerm) {
        searchClear.classList.add('visible');
    } else {
        searchClear.classList.remove('visible');
    }
    
    // Show no results message
    const projectsContainer = document.getElementById('projectsContainer');
    const noResults = projectsContainer.querySelector('.no-results');
    
    if (visibleCount === 0 && term !== '') {
        if (!noResults) {
            const message = document.createElement('div');
            message.className = 'no-results';
            message.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);';
            message.textContent = 'No projects found matching your search.';
            projectsContainer.appendChild(message);
        }
    } else if (noResults) {
        noResults.remove();
    }
}

searchInput.addEventListener('input', (e) => {
    filterProjects(e.target.value);
});

searchClear.addEventListener('click', () => {
    searchInput.value = '';
    filterProjects('');
    searchInput.focus();
});

// ============================================
// LOAD SKILLS FROM JSON (Without Levels)
// ============================================

async function loadSkills() {
    try {
        const response = await fetch('js/skills.json');
        const skillsData = await response.json();
        
        const skillsContainer = document.getElementById('skillsContainer');
        skillsContainer.innerHTML = '';
        
        skillsData.forEach((category, index) => {
            const categoryElement = createSkillCategory(category);
            skillsContainer.appendChild(categoryElement);
            categoryElement.style.setProperty('--delay', index * 0.1 + 's');
        });
    } catch (error) {
        console.error('Error loading skills:', error);
        document.getElementById('skillsContainer').innerHTML = 
            '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">Failed to load skills.</p>';
    }
}

function createSkillCategory(category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category';
    
    const skillsHTML = category.skills.map(skill => `
        <span class="skill-tag">${skill}</span>
    `).join('');
    
    categoryDiv.innerHTML = `
        <h3>${category.category}</h3>
        <div class="skill-tags-container">
            ${skillsHTML}
        </div>
    `;
    
    return categoryDiv;
}

document.addEventListener('DOMContentLoaded', loadSkills);

// ============================================
// LOAD CERTIFICATIONS FROM JSON
// ============================================

async function loadCertifications() {
    try {
        const response = await fetch('data/certifications.json');
        const certifications = await response.json();
        
        const certificationsContainer = document.getElementById('certificationsContainer');
        certificationsContainer.innerHTML = '';
        
        certifications.forEach((cert, index) => {
            const certElement = createCertificationItem(cert);
            certificationsContainer.appendChild(certElement);
            certElement.style.setProperty('--delay', index * 0.1 + 's');
        });
    } catch (error) {
        console.error('Error loading certifications:', error);
        document.getElementById('certificationsContainer').innerHTML = 
            '<p style="text-align: center; color: var(--text-secondary);">Failed to load certifications. Please check certifications.json file.</p>';
    }
}

function createCertificationItem(cert) {
    const certDiv = document.createElement('div');
    certDiv.className = 'certification-item';
    certDiv.dataset.searchText = (cert.title + ' ' + cert.issuer).toLowerCase();
    
    certDiv.innerHTML = `
        <div class="certification-title">${cert.title}</div>
        <div class="certification-issuer">${cert.issuer}</div>
        <div class="certification-date">${cert.date}</div>
        ${cert.link ? `<a href="${cert.link}" target="_blank" rel="noopener noreferrer" style="margin-top: 0.5rem; display: inline-block;">View Credential →</a>` : ''}
    `;
    
    return certDiv;
}

document.addEventListener('DOMContentLoaded', loadCertifications);

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Check if Formspree endpoint is configured
        const formAction = contactForm.getAttribute('action');
        if (formAction.includes('YOUR_FORM_ID')) {
            showFormMessage('Please configure the contact form with your Formspree form ID.', 'error');
            return;
        }
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch(contactForm.getAttribute('action'), {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
                contactForm.reset();
                submitBtn.textContent = 'Message Sent! ✓';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                showFormMessage('Something went wrong. Please try again later.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Network error. Please check your connection and try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.animation = 'fadeInUp 0.3s ease-out';
    
    const formContainer = contactForm.parentElement;
    const existingMessage = formContainer.querySelector(`.form-${type}`);
    if (existingMessage) {
        existingMessage.remove();
    }
    
    contactForm.insertAdjacentElement('beforebegin', messageDiv);
    
    // Auto remove error message after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PAGE INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateActiveNavLink();
    
    // Remove preload class to enable transitions
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 100);
});

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScroll = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedScroll);

console.log('✓ Portfolio website initialized');
