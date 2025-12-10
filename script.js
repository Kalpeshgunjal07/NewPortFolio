
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); 
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);


const sections = document.querySelectorAll('.hero-section, .about-section, .skills-section, .experience-section, .projects-section, .contact-section');

sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});


const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelector('.nav-items');
const resumeBtn = document.querySelectorAll('.btn');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navItems.classList.toggle('active');
    resumeBtn.forEach(btn => btn.classList.toggle('active'));
});


document.querySelectorAll('.nav-items li a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');


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
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }


        hamburger.classList.remove('active');
        navItems.classList.remove('active');
        resumeBtn.forEach(btn => btn.classList.remove('active'));
    });ll
    const sections = document.querySelectorAll('section[id], .hero-section');
    const navLinks = document.querySelectorAll('.nav-items li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
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
});
