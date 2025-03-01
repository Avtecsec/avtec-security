
// Navigation Menu
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("nav-active");
    
    // Animate menu items
    const menuItems = document.querySelectorAll('.nav-menu ul li');
    menuItems.forEach((item, index) => {
        if (navMenu.classList.contains('nav-active')) {
            item.style.transitionDelay = `${index * 0.1}s`;
        } else {
            item.style.transitionDelay = '0s';
        }
    });
}

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

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Add delay to child elements for staggered animation
            const children = entry.target.querySelectorAll('.service-card, .product-card, .value-card, .team-member, .step');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
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
