// Navbar Toggle for Mobile
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".navbar ul");

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// Form Validation
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            const name = document.querySelector("#name").value;
            const email = document.querySelector("#email").value;
            const message = document.querySelector("#message").value;

            if (name === "" || email === "" || message === "") {
                e.preventDefault();
                alert("Please fill in all fields.");
            }
        });
    }
});

// Fade-in Effect on Scroll
const fadeElements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", function () {
    fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 50) {
            element.classList.add("visible");
        }
    });
});
