// Toggle menu function
function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("nav-active");
}

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fadeIn');
    }

    // Animate cards on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll .service-card, .animate-on-scroll .product-card, .animate-on-scroll h2');

        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                // Alternate between left and right animations for cards
                if (element.classList.contains('service-card') || element.classList.contains('product-card')) {
                    if (index % 2 === 0) {
                        element.classList.add('slideInLeft');
                    } else {
                        element.classList.add('slideInRight');
                    }
                } else {
                    element.classList.add('fadeIn');
                }
            }
        });
    };

    // Initial check
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});


// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });

            // Close menu after click
            const navMenu = document.getElementById("navMenu");
            if (navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
            }
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById("navMenu");
    const menuIcon = document.querySelector(".menu-icon");

    if (navMenu.classList.contains('nav-active') &&
        !navMenu.contains(event.target) &&
        !menuIcon.contains(event.target)) {
        navMenu.classList.remove('nav-active');
    }
});

// Service/Product Card Hover Effect
document.querySelectorAll('.service-card, .product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (!name.value.trim()) {
            setError(name, 'Name is required');
            valid = false;
        } else {
            clearError(name);
        }

        if (!email.value.trim()) {
            setError(email, 'Email is required');
            valid = false;
        } else if (!isValidEmail(email.value)) {
            setError(email, 'Please enter a valid email');
            valid = false;
        } else {
            clearError(email);
        }

        if (!message.value.trim()) {
            setError(message, 'Message is required');
            valid = false;
        } else {
            clearError(message);
        }

        if (valid) {
            // Submit form logic here
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        }
    });
}

function setError(element, message) {
    const formGroup = element.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message') || document.createElement('div');

    errorDisplay.className = 'error-message';
    errorDisplay.textContent = message;

    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDisplay);
    }

    element.classList.add('error-input');
}

function clearError(element) {
    const formGroup = element.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message');

    if (errorDisplay) {
        formGroup.removeChild(errorDisplay);
    }

    element.classList.remove('error-input');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}