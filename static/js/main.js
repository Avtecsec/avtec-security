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

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Form Validation
function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // Reset errors
    clearErrors();
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }
    
    if (isValid) {
        // Submit form
        submitForm();
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    input.classList.add('error');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
}

function submitForm() {
    // Add loading state
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        document.getElementById('contactForm').reset();
        
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }, 2000);
    }, 1500);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add form validation listener
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }
});
