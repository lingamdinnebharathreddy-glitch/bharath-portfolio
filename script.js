/**
 * Bharath Kumar Reddy Lingadinne - Professional Portfolio Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Dom Elements
    const header = document.getElementById('main-header');
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contact-form');
    const successToast = document.getElementById('success-toast');
    const closeToastBtn = document.getElementById('close-toast-btn');

    /* ==========================================================================
       1. FIXED HEADER & ACTIVE SECTION ON SCROLL
       ========================================================================== */
    window.addEventListener('scroll', () => {
        // Toggle Scrolled Header Style
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Toggle Scroll to Top Button Visibility
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Active Navigation Link Tracking
    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -60% 0px' // Trigger active state when section occupies mid-viewport
    });

    sections.forEach(section => {
        activeSectionObserver.observe(section);
    });

    /* ==========================================================================
       2. MOBILE HAMBURGER MENU DRAWER
       ========================================================================== */
    const toggleMobileMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : 'auto'; // Prevent body scroll when open
    };

    const closeMobileMenu = () => {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
    };

    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside the menu drawer
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    /* ==========================================================================
       3. SMOOTH SCROLL REVEAL ANIMATIONS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once revealed, no need to track it anymore
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Reveal slightly before entering viewport
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       4. SCROLL TO TOP FUNCTIONALITY
       ========================================================================== */
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       5. PROFESSIONAL CONTACT FORM VALIDATION & HANDLING
       ========================================================================== */
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const setInputError = (groupEl, show) => {
        if (show) {
            groupEl.classList.add('invalid');
        } else {
            groupEl.classList.remove('invalid');
        }
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameEl = document.getElementById('form-name');
            const emailEl = document.getElementById('form-email');
            const msgEl = document.getElementById('form-message');
            
            const nameGroup = nameEl.closest('.form-group');
            const emailGroup = emailEl.closest('.form-group');
            const msgGroup = msgEl.closest('.form-group');

            let isValid = true;

            // Name Validation
            if (!nameEl.value.trim()) {
                setInputError(nameGroup, true);
                isValid = false;
            } else {
                setInputError(nameGroup, false);
            }

            // Email Validation
            if (!emailEl.value.trim() || !validateEmail(emailEl.value)) {
                setInputError(emailGroup, true);
                isValid = false;
            } else {
                setInputError(emailGroup, false);
            }

            // Message Validation
            if (!msgEl.value.trim()) {
                setInputError(msgGroup, true);
                isValid = false;
            } else {
                setInputError(msgGroup, false);
            }

            if (isValid) {
                // Perform submitting state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalBtnContent = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span>Sending...</span>
                    <svg class="btn-spinner" width="16" height="16" viewBox="0 0 50 50" style="animation: spin 1s linear infinite; margin-left: 5px;">
                        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="80, 200" stroke-dashoffset="0"></circle>
                    </svg>
                `;

                // Add spinning styles inline if not in css
                const styleEl = document.createElement('style');
                styleEl.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
                document.head.appendChild(styleEl);

                // Simulate API call
                setTimeout(() => {
                    // Success!
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    
                    // Reset Form
                    contactForm.reset();
                    
                    // Show success Toast
                    showToast();
                }, 1500);
            }
        });
    }

    const showToast = () => {
        successToast.classList.add('active');
        // Auto hide toast after 5s
        setTimeout(closeToast, 5000);
    };

    const closeToast = () => {
        successToast.classList.remove('active');
    };

    if (closeToastBtn) {
        closeToastBtn.addEventListener('click', closeToast);
    }
});
