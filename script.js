// ==========================================================================
// Navigation Functionality
// ==========================================================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');

        // Reset hamburger icon
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==========================================================================
// Navbar Scroll Effect
// ==========================================================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow when scrolled
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop;
});

// ==========================================================================
// Active Link Highlighting
// ==========================================================================

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            correspondingLink?.classList.add('active');
        } else {
            correspondingLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ==========================================================================
// Smooth Scroll for Navigation Links
// ==========================================================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================================================
// Intersection Observer for Scroll Animations
// ==========================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe sections and cards
const animateElements = document.querySelectorAll(
    '.skill-category, .project-card, .presentation-card, .contact-card, .about-content'
);

animateElements.forEach(element => {
    observer.observe(element);
});

// ==========================================================================
// Dynamic Year in Footer
// ==========================================================================

const updateFooterYear = () => {
    const footerYear = document.querySelector('.footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${currentYear} Avani Gupta. All rights reserved.`;
    }
};

updateFooterYear();

// ==========================================================================
// Typing Effect for Hero Title (Optional Enhancement)
// ==========================================================================

function createTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    const textWithoutEmoji = 'Hello there , I am Avani';
    const wave = '<span class="wave">👋</span>';

    // Only run on first load
    if (!sessionStorage.getItem('typingEffectShown')) {
        heroTitle.innerHTML = '';
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < textWithoutEmoji.length) {
                if (textWithoutEmoji[charIndex] === ',') {
                    heroTitle.innerHTML += wave;
                } else {
                    heroTitle.innerHTML += textWithoutEmoji[charIndex];
                }
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);

        sessionStorage.setItem('typingEffectShown', 'true');
    }
}

// Uncomment to enable typing effect
// createTypingEffect();

// ==========================================================================
// Particle Background Effect (Lightweight)
// ==========================================================================

function createParticles() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positioning
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomSize = Math.random() * 3 + 1;
        const randomDuration = Math.random() * 20 + 10;
        const randomDelay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            left: ${randomX}%;
            top: ${randomY}%;
            width: ${randomSize}px;
            height: ${randomSize}px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
            border-radius: 50%;
            animation: float ${randomDuration}s ease-in-out ${randomDelay}s infinite;
            pointer-events: none;
        `;

        heroBg.appendChild(particle);
    }

    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            50% {
                transform: translateY(-100px) translateX(50px);
            }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ==========================================================================
// Skills Progress Animation
// ==========================================================================

function animateSkillsOnScroll() {
    const skillCategories = document.querySelectorAll('.skill-category');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'all 0.6s ease';
        skillObserver.observe(category);
    });
}

animateSkillsOnScroll();

// ==========================================================================
// Project Card Hover Effect Enhancement
// ==========================================================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
    });

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `
            translateY(-10px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
    });
});

// ==========================================================================
// Lazy Loading for GitHub Stats Images
// ==========================================================================

const statImages = document.querySelectorAll('.stat-card');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';

            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });

            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

statImages.forEach(img => {
    imageObserver.observe(img);
});

// ==========================================================================
// Scroll to Top Button (Optional)
// ==========================================================================

function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');

    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        z-index: 999;
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.6)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
    });
}

createScrollToTopButton();

// ==========================================================================
// Performance Optimization
// ==========================================================================

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

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(highlightNavLink, 100));

// ==========================================================================
// Accessibility Enhancements
// ==========================================================================

// Skip to main content link
function createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';

    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #6366f1;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

createSkipLink();

// ==========================================================================
// Console Message (Easter Egg)
// ==========================================================================

console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/avani17101', 'font-size: 14px; color: #cbd5e1;');
console.log('%cLet\'s connect! 🚀', 'font-size: 14px; color: #ec4899;');

// ==========================================================================
// Initialize on DOM Load
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully! ✨');
});
