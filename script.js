// =============================================================
// KIOSKRA EXHIBITIONS - Premium Script
// GSAP Animations | Lenis Smooth Scroll | Slider | Accordion
// =============================================================

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // 1. LENIS SMOOTH SCROLLING
    // =========================================================
    let lenis;
    try {
        if (typeof Lenis !== 'undefined') {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);

            // Integrate Lenis with GSAP ScrollTrigger
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add((time) => {
                    lenis.raf(time * 1000);
                });
                gsap.ticker.lagSmoothing(0);
            }

            // Handle anchor links with Lenis
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href');
                    if (targetId === '#') return;
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        lenis.scrollTo(target, { offset: -70 });
                    }
                });
            });
        }
    } catch (err) {
        console.log('Lenis not loaded, using native scroll:', err);
    }

    // =========================================================
    // 2. MOBILE HAMBURGER MENU
    // =========================================================
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navLinksA = document.querySelectorAll(".nav-links a");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
            const expanded = hamburger.classList.contains("active");
            hamburger.setAttribute("aria-expanded", expanded);
            
            // Prevent body scroll when menu is open
            if (expanded) {
                document.body.style.overflow = 'hidden';
                if (lenis) lenis.stop();
            } else {
                document.body.style.overflow = '';
                if (lenis) lenis.start();
            }
        });

        navLinksA.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
                document.body.style.overflow = '';
                if (lenis) lenis.start();
            });
        });
    }

    // =========================================================
    // 3. HEADER SCROLL EFFECT (Transparent → Solid)
    // =========================================================
    const header = document.querySelector("header");
    const isHomepage = document.body.getAttribute('data-page') === 'home';
    
    if (header) {
        function handleHeaderScroll() {
            if (window.scrollY > 60) {
                header.classList.add("scrolled");
                if (isHomepage) header.classList.remove("header--transparent");
            } else {
                header.classList.remove("scrolled");
                if (isHomepage) header.classList.add("header--transparent");
            }
        }
        
        // Initial state
        handleHeaderScroll();
        window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    }

    // =========================================================
    // 4. GSAP HERO ANIMATION
    // =========================================================
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const heroH1 = document.querySelector('.video-hero .hero-content h1');
        const heroP = document.querySelector('.video-hero .hero-content p');
        const heroButtons = document.querySelector('.video-hero .hero-content .hero-buttons');

        if (heroH1) {
            const heroTl = gsap.timeline({ delay: 0.2 });
            
            // Set initial state via GSAP
            gsap.set([heroH1, heroP, heroButtons], { opacity: 0, y: 30 });

            heroTl.to(heroH1, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            })
            .to(heroP, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out"
            }, "-=0.4")
            .to(heroButtons, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out"
            }, "-=0.4");
        }

    } // end GSAP check

    // =========================================================
    // 5. FAIL-SAFE SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    // =========================================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for very old browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // Safety fallback: Ensure everything becomes visible after 1 second regardless
    setTimeout(() => {
        revealElements.forEach(el => el.classList.add('revealed'));
    }, 1000);

    // =========================================================
    // 6. COUNTER ANIMATION (Stats)
    // =========================================================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length > 0) {
        const animateStats = () => {
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const suffix = num.getAttribute('data-suffix') || '+';
                let current = 0;
                const increment = Math.max(1, Math.ceil(target / 40));
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    num.textContent = current + suffix;
                }, 35);
            });
        };

        const statsSection = document.querySelector('.stats-section');
        if (statsSection && 'IntersectionObserver' in window) {
            const statsObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            statsObserver.observe(statsSection);
        } else {
            animateStats();
        }
    }



    // =========================================================
    // 9. TESTIMONIALS SLIDER
    // =========================================================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    const testimonialDotsContainer = document.getElementById('testimonialDots');
    
    if (testimonialTrack) {
        const slides = testimonialTrack.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;
        let autoPlayTimer;
        const totalSlides = slides.length;

        // Create dots
        if (testimonialDotsContainer) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
                dot.addEventListener('click', () => goToSlide(i));
                testimonialDotsContainer.appendChild(dot);
            }
        }

        function goToSlide(index) {
            currentSlide = index;
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            const dots = testimonialDotsContainer?.querySelectorAll('.testimonial-dot');
            dots?.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });

            resetAutoPlay();
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % totalSlides);
        }

        function prevSlide() {
            goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }

        if (testimonialPrev) testimonialPrev.addEventListener('click', prevSlide);
        if (testimonialNext) testimonialNext.addEventListener('click', nextSlide);

        // Auto-play
        function startAutoPlay() {
            autoPlayTimer = setInterval(nextSlide, 5000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        }

        startAutoPlay();

        // Pause on hover
        const sliderWrapper = testimonialTrack.closest('.testimonial-slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
            sliderWrapper.addEventListener('mouseleave', startAutoPlay);
        }

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        testimonialTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
        }, { passive: true });
    }

    // =========================================================
    // 10. FAQ ACCORDION
    // =========================================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                });

                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // =========================================================
    // 11. PORTFOLIO GALLERY FILTER LOGIC
    // =========================================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filterValue = button.getAttribute("data-filter");

                galleryItems.forEach(item => {
                    if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                        item.classList.remove("hidden");
                        // GSAP animation on show
                        if (typeof gsap !== 'undefined') {
                            gsap.from(item, {
                                opacity: 0,
                                scale: 0.9,
                                duration: 0.4,
                                ease: "power2.out",
                            });
                        }
                    } else {
                        item.classList.add("hidden");
                    }
                });
            });
        });
    }

    // =========================================================
    // 12. PORTFOLIO LIGHTBOX LOGIC
    // =========================================================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentImageIndex = 0;
    let visibleGalleryItems = [];

    function updateVisibleItems() {
        visibleGalleryItems = Array.from(galleryItems).filter(item => !item.classList.contains("hidden"));
    }

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                updateVisibleItems();
                const clickedImg = item.querySelector("img");
                currentImageIndex = visibleGalleryItems.indexOf(item);
                
                showLightboxImage(clickedImg.src, clickedImg.alt);
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
                if (lenis) lenis.stop();
            });
        });

        function showLightboxImage(src, alt) {
            lightboxImg.src = src;
            lightboxCaption.textContent = alt || "Kioskra Exhibition Stall Design";
        }

        const closeLightbox = () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
            if (lenis) lenis.start();
        };

        if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        const navigateImage = (direction) => {
            updateVisibleItems();
            if (visibleGalleryItems.length === 0) return;
            
            currentImageIndex = (currentImageIndex + direction + visibleGalleryItems.length) % visibleGalleryItems.length;
            const nextItem = visibleGalleryItems[currentImageIndex];
            const nextImg = nextItem.querySelector("img");
            showLightboxImage(nextImg.src, nextImg.alt);
        };

        if (lightboxPrev) lightboxPrev.addEventListener("click", () => navigateImage(-1));
        if (lightboxNext) lightboxNext.addEventListener("click", () => navigateImage(1));

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") navigateImage(-1);
            if (e.key === "ArrowRight") navigateImage(1);
        });
    }

    // =========================================================
    // 13. 3D WALKTHROUGH VIDEO CAROUSEL (Portfolio)
    // =========================================================
    const vidSlides = document.querySelectorAll('.video-item');
    const prevVidBtn = document.querySelector('.video-container .prev');
    const nextVidBtn = document.querySelector('.video-container .next');
    let vidIdx = 0;

    function changeVideo(n) {
        if (vidSlides.length === 0) return;
        
        const currentVid = vidSlides[vidIdx].querySelector('video');
        if (currentVid) {
            currentVid.pause();
            currentVid.currentTime = 0;
        }
        vidSlides[vidIdx].classList.remove('active');

        vidIdx = (vidIdx + n + vidSlides.length) % vidSlides.length;

        vidSlides[vidIdx].classList.add('active');
        const nextVid = vidSlides[vidIdx].querySelector('video');
        if (nextVid) {
            nextVid.play().catch(error => {
                console.log("Auto-play was prevented. Interaction required.");
            });
        }
    }

    if (prevVidBtn) prevVidBtn.addEventListener("click", () => changeVideo(-1));
    if (nextVidBtn) nextVidBtn.addEventListener("click", () => changeVideo(1));

    if (vidSlides.length > 0) {
        const firstVid = vidSlides[0].querySelector('video');
        if (firstVid) {
            firstVid.play().catch(error => {});
        }
    }

    // =========================================================
    // 14. FORM SUBMISSION — Handled by form-handler.js
    // =========================================================

    // =========================================================
    // 15. DYNAMIC WHATSAPP LINK BUILDER
    // =========================================================
    const whatsappFloat = document.querySelector(".whatsapp-float");
    const nameInput = document.getElementById("name");
    const companyInput = document.getElementById("company");
    const phoneInput = document.getElementById("phone");
    const cityInput = document.getElementById("city");
    const messageInput = document.getElementById("message");

    const defaultText = "Hi Kioskra Exhibitions, I visited your website and would like to get a free design consultation for an upcoming exhibition. Please connect with me.";
    
    function updateWhatsAppFloatLink() {
        if (!whatsappFloat) return;

        const name = nameInput ? nameInput.value.trim() : "";
        const company = companyInput ? companyInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const city = cityInput ? cityInput.value.trim() : "";
        const message = messageInput ? messageInput.value.trim() : "";

        if (name || company || phone || city || message) {
            let customText = `New Exhibition Enquiry:\n`;
            if (name) customText += `Name: ${name}\n`;
            if (company) customText += `Company: ${company}\n`;
            if (phone) customText += `Phone: ${phone}\n`;
            if (city) customText += `City: ${city}\n`;
            if (message) customText += `Requirement: ${message}`;
            
            whatsappFloat.href = `https://wa.me/919643378735?text=${encodeURIComponent(customText)}`;
        } else {
            whatsappFloat.href = `https://wa.me/919643378735?text=${encodeURIComponent(defaultText)}`;
        }
    }

    [nameInput, companyInput, phoneInput, cityInput, messageInput].forEach(input => {
        if (input) {
            input.addEventListener("input", updateWhatsAppFloatLink);
        }
    });
});

// =============================================================
// WHATSAPP ENQUIRY FORM HELPER (Global)
// =============================================================
function sendWhatsApp() {
    const name = document.getElementById("name") ? document.getElementById("name").value.trim() : "";
    const company = document.getElementById("company") ? document.getElementById("company").value.trim() : "";
    const phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";
    const city = document.getElementById("city") ? document.getElementById("city").value.trim() : "";
    const message = document.getElementById("message") ? document.getElementById("message").value.trim() : "";

    if (!name || !phone) {
        showPremiumAlert("Required Fields", "Please fill in your Name and Phone Number.", false);
        return;
    }

    const text = `New Exhibition Enquiry:%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Company: ${encodeURIComponent(company)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
        `City: ${encodeURIComponent(city)}%0A` +
        `Requirement: ${encodeURIComponent(message)}`;

    window.open(`https://wa.me/919643378735?text=${text}`, "_blank");
}

// =============================================================
// PREMIUM CUSTOM ALERT MODAL (Global)
// =============================================================
function showPremiumAlert(title, message, isSuccess = true, callback = null) {
    const existingAlert = document.querySelector('.custom-alert-overlay');
    if (existingAlert) {
        existingAlert.remove();
    }

    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    
    const iconSVG = isSuccess 
        ? `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>`
        : `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
    
    const iconClass = isSuccess ? 'custom-alert-icon' : 'custom-alert-icon error';

    overlay.innerHTML = `
        <div class="custom-alert-box">
            <div class="${iconClass}">
                ${iconSVG}
            </div>
            <div class="custom-alert-title">${title}</div>
            <div class="custom-alert-message">${message}</div>
            <button class="custom-alert-btn">OK</button>
        </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });

    const closeAlert = () => {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
            if (callback) callback();
        }, 300);
    };

    overlay.querySelector('.custom-alert-btn').addEventListener('click', closeAlert);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeAlert();
        }
    });

    const handleKeydown = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            document.removeEventListener('keydown', handleKeydown);
            closeAlert();
        }
    };
    document.addEventListener('keydown', handleKeydown);
}
