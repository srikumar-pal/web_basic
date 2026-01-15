/* ================= DARK MODE ================= */
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
    });
}

/* ================= HERO SCROLL ================= */
const heroBtn = document.querySelector(".primary-btn");
if (heroBtn) {
    heroBtn.addEventListener("click", () => {
        document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
    });
}

/* ================= RESUME MODAL ================= */
const modal = document.getElementById("resumeModal");
const openBtn = document.getElementById("openResume");
const closeBtn = document.querySelector(".close");

if (modal && openBtn && closeBtn) {
    openBtn.onclick = () => modal.style.display = "flex";
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
}

/* ================= MOBILE MENU ================= */
const menuBtn = document.querySelector(".menu-btn");
const navLinksBox = document.querySelector(".nav-links");

if (menuBtn && navLinksBox) {
    menuBtn.onclick = () => {
        navLinksBox.classList.toggle("show");
    };
}

/* ================= SCROLL FEATURES ================= */
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const progressBar = document.getElementById("progressBar");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    /* Scroll progress bar */
    if (progressBar) {
        progressBar.style.width = (scrollTop / docHeight) * 100 + "%";
    }

    /* Sticky navbar shadow */
    if (navbar) {
        if (scrollTop > 10) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        /* Hide / show navbar */
        if (scrollTop > lastScrollY && scrollTop > 120) {
            navbar.classList.add("hide");
        } else {
            navbar.classList.remove("hide");
        }
    }

    /* Active nav link */
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        if (scrollTop >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

    lastScrollY = scrollTop;
});

/* ================= CONTACT FORM ================= */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    const submitBtn = contactForm.querySelector(".submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const loader = submitBtn.querySelector(".loader");
    const successText = contactForm.querySelector(".success-text");
    const fields = contactForm.querySelectorAll(".field input, .field textarea");

    contactForm.addEventListener("submit", e => {
        e.preventDefault();
        let hasError = false;

        /* Validation */
        fields.forEach(input => {
            const fieldWrapper = input.parentElement;
            fieldWrapper.classList.remove("error");

            if (!input.value.trim()) {
                fieldWrapper.classList.add("error");
                hasError = true;
            }

            if (input.type === "email") {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    fieldWrapper.classList.add("error");
                    hasError = true;
                }
            }
        });

        if (hasError) return;

        /* Loading state */
        btnText.style.opacity = "0";
        loader.style.display = "block";
        successText.style.display = "none";

        setTimeout(() => {
            loader.style.display = "none";
            btnText.style.opacity = "1";
            successText.style.display = "block";
            contactForm.reset();
        }, 1500);
    });
}
