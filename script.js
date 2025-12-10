// Scroll Animation for Containers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Animate only once
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Select all sections/containers to animate
const sections = document.querySelectorAll('.hero-section, .about-section, .skills-section, .experience-section, .projects-section, .contact-section');

sections.forEach(section => {
    section.classList.add('fade-in'); // Add initial state
    observer.observe(section);
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelector('.nav-items');
const resumeBtnOutside = document.querySelector('.nav-sec > .btn'); // Only the button outside nav-items

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navItems.classList.toggle('active');
    if (resumeBtnOutside) {
        resumeBtnOutside.classList.toggle('active');
    }
});

// Smooth Scroll to Section and Close Menu
document.querySelectorAll('.nav-items li a, .nav-items .btn').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only prevent default if it's an anchor link (starts with #)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (href === '#') {
                // Scroll to top for home
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
        
        // Close hamburger menu
        hamburger.classList.remove('active');
        navItems.classList.remove('active');
        if (resumeBtnOutside) {
            resumeBtnOutside.classList.remove('active');
        }
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav.container');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Highlight active nav link on scroll
const sectionsForNav = document.querySelectorAll('section[id], .hero-section');
const navLinks = document.querySelectorAll('.nav-items li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sectionsForNav.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id') || 'home';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if ((current === 'home' && href === '#') || 
            (href === `#${current}`)) {
            link.classList.add('active');
        }
    });
});