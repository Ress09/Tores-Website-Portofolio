// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initNavigation();
    initLanguage();
    initTheme();
    initAnimations();
    initParticles();
    initGallery();
    initContact();
});

// ========== AOS ANIMATIONS ==========
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = getTransform(el.getAttribute('data-aos'));
        el.style.transition = 'all 0.8s ease';
        
        if (el.hasAttribute('data-aos-delay')) {
            el.style.transitionDelay = el.getAttribute('data-aos-delay') + 'ms';
        }
        
        observer.observe(el);
    });
}

function getTransform(animation) {
    const transforms = {
        'fade-up': 'translateY(30px)',
        'fade-down': 'translateY(-30px)',
        'fade-left': 'translateX(30px)',
        'fade-right': 'translateX(-30px)',
        'zoom-in': 'scale(0.8)',
        'flip-left': 'rotateY(-90deg)',
        'flip-up': 'rotateX(-90deg)'
    };
    return transforms[animation] || 'translateY(30px)';
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .aos-animate {
        opacity: 1 !important;
        transform: translate(0) scale(1) rotate(0) !important;
    }
`;
document.head.appendChild(style);

// ========== NAVIGATION ==========
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ========== LANGUAGE TOGGLE ==========
function initLanguage() {
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('language') || 'en';

    if (langToggle) {
        updateLanguage(currentLang);
        
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'id' : 'en';
            localStorage.setItem('language', currentLang);
            updateLanguage(currentLang);
            
            // Visual feedback
            langToggle.style.transform = 'scale(1.2)';
            setTimeout(() => {
                langToggle.style.transform = '';
            }, 200);
        });
    }
}

function updateLanguage(lang) {
    const flag = document.querySelector('.flag');
    if (flag) {
        flag.textContent = lang === 'en' ? '🇮🇩' : '🇬🇧';
    }
    
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-id');
        
        if (!text) return;
        
        if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
            element.value = text;
        } else if (element.classList.contains('support') || element.innerHTML.includes('<span')) {
            const heartSpan = element.querySelector('.heart');
            if (heartSpan) {
                const parts = text.split('♥');
                element.innerHTML = parts[0] + heartSpan.outerHTML + (parts[1] || '');
            } else {
                element.textContent = text;
            }
        } else {
            element.textContent = text;
        }
    });
}

// ========== THEME TOGGLE ==========
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themes = ['default', 'light-theme', 'blue-theme', 'green-theme'];
    const themeNames = ['Dark', 'Light', 'Blue', 'Green'];
    let currentThemeIndex = parseInt(localStorage.getItem('themeIndex')) || 0;

    // Apply saved theme
    if (themes[currentThemeIndex] !== 'default') {
        document.body.classList.add(themes[currentThemeIndex]);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Remove current theme
            document.body.classList.remove(...themes);
            
            // Move to next theme
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            localStorage.setItem('themeIndex', currentThemeIndex);
            
            // Apply new theme
            if (themes[currentThemeIndex] !== 'default') {
                document.body.classList.add(themes[currentThemeIndex]);
            }
            
            // Show notification
            showNotification(`Theme: ${themeNames[currentThemeIndex]}`);
            
            // Rotate animation
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add notification animations
const notifStyle = document.createElement('style');
notifStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(notifStyle);

// ========== ANIMATIONS ==========
function initAnimations() {
    // Animated counter
    animateCounters();
    
    // Smooth scroll
    initSmoothScroll();
    
    // Typing effect
    initTypingEffect();
    
    // Card animations
    initCardAnimations();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '0') {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle && window.location.pathname.includes('index')) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };
        
        setTimeout(type, 1500);
    }
}

function initCardAnimations() {
    // Project cards click effect
    document.querySelectorAll('.project-card-new').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });

    // Certificate cards ripple effect
    document.querySelectorAll('.cert-card-new').forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(99, 102, 241, 0.5);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    .cert-card-new {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// ========== PARTICLES ==========
function initParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5};
            animation: float-particle ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particles.appendChild(particle);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(100px, -100px); }
        50% { transform: translate(-50px, -150px); }
        75% { transform: translate(50px, -50px); }
    }
`;
document.head.appendChild(particleStyle);

// ========== EASTER EGGS ==========
console.log('%c🚀 Portfolio by Tores Fernando', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c💜 Supported by Angelica Xu', 'color: #8b5cf6; font-size: 18px;');
console.log('%c✨ Built with passion and precision', 'color: #64ffda; font-size: 14px;');

// Konami code easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    showNotification('🎉 Easter Egg Activated!');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(easterEggStyle);

// ========== GALLERY ==========
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hide');
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // Lightbox functionality
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const imgWrapper = btn.closest('.gallery-img-wrapper');
            const img = imgWrapper.querySelector('.gallery-img');
            const title = imgWrapper.querySelector('h3').textContent;
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = title;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// ========== CONTACT / WHATSAPP ==========
function initContact() {
    const waSendBtn = document.getElementById('waSendBtn');
    
    if (waSendBtn) {
        waSendBtn.addEventListener('click', sendWhatsAppMessage);
    }
}

function sendWhatsAppMessage() {
    const name = document.getElementById('waName').value.trim();
    const email = document.getElementById('waEmail').value.trim();
    const subject = document.getElementById('waSubject').value;
    const message = document.getElementById('waMessage').value.trim();

    // Validation
    if (!name || !message) {
        showNotification('❌ Please fill in your name and message!');
        return;
    }

    // Compose WhatsApp message
    let waMessage = `*Hi! I'm ${name}*\n\n`;
    
    if (email) {
        waMessage += `📧 Email: ${email}\n`;
    }
    
    waMessage += `📌 Subject: ${subject}\n\n`;
    waMessage += `📝 Message:\n${message}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(waMessage);
    
    // WhatsApp number (GANTI DENGAN NOMOR WHATSAPP KAMU!)
    const phoneNumber = '6282268423865'; // Format: country code + number (tanpa +)
    
    // Open WhatsApp
    const waURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(waURL, '_blank');

    // Show success notification
    showNotification('✅ Opening WhatsApp...');

    // Optional: Clear form
    setTimeout(() => {
        if (confirm('Message sent! Clear the form?')) {
            document.getElementById('waName').value = '';
            document.getElementById('waEmail').value = '';
            document.getElementById('waMessage').value = '';
        }
    }, 1000);
}
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}