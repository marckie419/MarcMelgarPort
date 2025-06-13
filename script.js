// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
let observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Profile image
    const profileImage = document.querySelector('.profile-image-placeholder');
    if (profileImage) {
        observer.observe(profileImage);
    }

    // Hero section elements
    const heroElements = document.querySelectorAll('.hero h1, .hero .subtitle, .hero-cta');
    heroElements.forEach(element => observer.observe(element));

    // Skills cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Contact content
    const contactContent = document.querySelector('.contact-content');
    if (contactContent) {
        observer.observe(contactContent);
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.transform = `scaleX(${scrolled / 100})`;
});

// Intersection Observer configuration
const observerConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Main animation observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skill-card')) {
                entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}s`;
            }
        }
    });
}, observerConfig);

// Observe elements
document.querySelectorAll('.hero h1, .hero .subtitle, .hero-cta, .profile-image-placeholder').forEach(el => {
    el.classList.add('fade-up');
    animationObserver.observe(el);
});

document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.dataset.delay = index * 0.1;
    animationObserver.observe(card);
});

document.querySelectorAll('.certification-card').forEach((card, index) => {
    card.classList.add('fade-up');
    card.style.transitionDelay = `${index * 0.2}s`;
    animationObserver.observe(card);
});

document.querySelectorAll('.experience-item, .project-card').forEach(el => {
    el.classList.add('fade-up');
    animationObserver.observe(el);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Smooth scroll for navigation links
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

// Typing effect for hero subtitle
const subtitle = document.querySelector('.hero .subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing effect when element is in view
    const subtitleObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            subtitleObserver.disconnect();
        }
    }, observerConfig);

    subtitleObserver.observe(subtitle);
}

// Interactive skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const overlay = card.querySelector('.project-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        }
    });

    card.addEventListener('mouseleave', () => {
        const overlay = card.querySelector('.project-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(20px)';
        }
    });
});

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.textContent);
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            const counter = setInterval(() => {
                count += increment;
                if (count >= target) {
                    statNumber.textContent = target;
                    clearInterval(counter);
                } else {
                    statNumber.textContent = Math.floor(count);
                }
            }, 16);

            statsObserver.unobserve(entry.target);
        }
    });
}, observerConfig);

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effect to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '↑';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    const menuLinks = document.querySelectorAll('.menu-links a');

    menuBtn.addEventListener('click', function () {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', function () {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Optional: close menu when clicking outside menu content
    menuOverlay.addEventListener('click', function (e) {
        if (e.target === menuOverlay) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Make menu links close the menu and scroll smoothly
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                const target = document.querySelector(href);
                if (target) {
                    setTimeout(function () {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }, 300); // Wait for menu to fade out
                }
            }
        });
    });

    // Modal for experience image
    const expImg = document.querySelector('.experience-img');
    const modal = document.getElementById('experienceModal');
    const modalClose = document.getElementById('modalClose');
    if (expImg && modal && modalClose) {
        expImg.addEventListener('click', function () {
            modal.classList.add('active');
        });
        modalClose.addEventListener('click', function () {
            modal.classList.remove('active');
        });
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Navbar visible bar on scroll
    const navbar = document.querySelector('.minimal-navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Particle Background Animation
(function () {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    const PARTICLE_COUNT = 36;
    const COLORS = [
        'rgba(224,231,239,0.7)', // blue
        'rgba(231,230,247,0.7)', // purple
        'rgba(248,225,231,0.7)', // pink
        'rgba(255,255,255,0.5)'
    ];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    function randomBetween(a, b) {
        return a + Math.random() * (b - a);
    }

    function createParticle() {
        const radius = randomBetween(18, 48);
        return {
            x: randomBetween(0, width),
            y: randomBetween(0, height),
            vx: randomBetween(-0.15, 0.15),
            vy: randomBetween(-0.08, 0.08),
            radius,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
    }

    function updateParticle(p) {
        p.x += p.vx;
        p.y += p.vy;
        // Bounce off edges
        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;
    }

    function drawParticle(p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 24;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            updateParticle(p);
            drawParticle(p);
        }
        requestAnimationFrame(animate);
    }

    // Initialize particles
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    animate();
})(); 