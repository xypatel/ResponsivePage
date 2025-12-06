// =====================================================
// MOBILE MENU TOGGLE
// =====================================================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// =====================================================
// NAVBAR SCROLL EFFECT
// =====================================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =====================================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// =====================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and key elements
document.querySelectorAll('section, .timeline-item, .skill-category, .highlight-item').forEach(el => {
    observer.observe(el);
});

// =====================================================
// CONTACT FORM HANDLING
// =====================================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:axaypatel.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Optional: Show success message
    showNotification('Opening your email client...', 'success');
});

// =====================================================
// NOTIFICATION SYSTEM
// =====================================================
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-tertiary);
        color: var(--text-primary);
        padding: 15px 25px;
        border-radius: 8px;
        border: 1px solid var(--accent-primary);
        box-shadow: 0 10px 40px rgba(6, 182, 212, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// =====================================================
// ACTIVE NAV LINK HIGHLIGHTING
// =====================================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// =====================================================
// TYPING EFFECT FOR HERO CODE
// =====================================================
function typeCode() {
    const codeElement = document.querySelector('.window-content code');
    if (!codeElement) return;
    
    const originalHTML = codeElement.innerHTML;
    codeElement.innerHTML = '';
    
    let charIndex = 0;
    const typingSpeed = 10; // Faster typing for better UX
    
    function type() {
        if (charIndex < originalHTML.length) {
            codeElement.innerHTML += originalHTML.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

// Uncomment to enable typing effect (can be performance intensive)
// window.addEventListener('load', typeCode);

// =====================================================
// SKILL ITEMS HOVER EFFECT
// =====================================================
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// =====================================================
// PARALLAX EFFECT FOR HERO SECTION
// =====================================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-visual');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// =====================================================
// INITIALIZE ON PAGE LOAD
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth entrance animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
    
    // Highlight current nav link on load
    highlightNavLink();
});

// =====================================================
// PREVENT FORM RESUBMISSION ON REFRESH
// =====================================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// =====================================================
// KEYBOARD NAVIGATION SUPPORT
// =====================================================
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// =====================================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// =====================================================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Use debounced scroll handlers
window.addEventListener('scroll', debounce(() => {
    highlightNavLink();
}, 10));

// =====================================================
// CONSOLE EASTER EGG
// =====================================================
console.log('%c👋 Hey there!', 'font-size: 20px; color: #06b6d4; font-weight: bold;');
console.log('%cInterested in the code? Check out the source at https://github.com/xypatel', 'font-size: 14px; color: #cbd5e1;');
console.log('%cLooking to connect? Email me at axaypatel.dev@gmail.com', 'font-size: 14px; color: #cbd5e1;');
