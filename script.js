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
const resumeBtn = document.querySelectorAll('.btn');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navItems.classList.toggle('active');
    resumeBtn.forEach(btn => btn.classList.toggle('active'));
});

// Smooth Scroll to Section
document.querySelectorAll('.nav-items li a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only prevent default if it's an anchor link (starts with #)
        if (href.startsWith('#')) {
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
        resumeBtn.forEach(btn => btn.classList.remove('active'));
    });
});