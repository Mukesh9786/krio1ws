// Smooth scrolling for anchor links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('.section:not(#hero)').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Parallax effect on scroll
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('#hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        hero.style.opacity = 1 - (scrollY / window.innerHeight);
    }
    
    lastScrollY = scrollY;
});

// Add cursor trail effect
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            border-radius: 50%;
            pointer-events: none;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            transform: translate(-50%, -50%);
            opacity: 0.6;
            z-index: 9999;
            animation: fadeOut 1s ease forwards;
        `;
        
        document.body.appendChild(dot);
        
        setTimeout(() => {
            dot.remove();
        }, 1000);
    });
};

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
        }
    }
`;
document.head.appendChild(style);

// Initialize cursor trail
createCursorTrail();

// Add work card click animations
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

console.log('✨ Portfolio loaded successfully!');
