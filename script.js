document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Hamburger Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navLinksA = document.querySelectorAll(".nav-links a");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
            const expanded = hamburger.classList.contains("active");
            hamburger.setAttribute("aria-expanded", expanded);
        });

        navLinksA.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // --- Homepage Video Loop ---
    const heroVideo = document.getElementById('heroVideo');
    const videos = ['Video/hero.mp4', 'Video/Hero2.mp4', 'Video/hero3.mp4'];
    let currentVideoIndex = 0;

    if (heroVideo) {
        heroVideo.addEventListener('ended', () => {
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            heroVideo.src = videos[currentVideoIndex];
            heroVideo.play().catch(err => console.log("Video auto-play interrupted:", err));
        });
    }

    // --- Portfolio Gallery Filter Logic ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove("active"));
                // Add active class to clicked button
                button.classList.add("active");

                const filterValue = button.getAttribute("data-filter");

                galleryItems.forEach(item => {
                    if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                        item.classList.remove("hidden");
                    } else {
                        item.classList.add("hidden");
                    }
                });
            });
        });
    }

    // --- Portfolio Lightbox Logic ---
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentImageIndex = 0;
    let visibleGalleryItems = [];

    // Get visible items based on current active filter
    function updateVisibleItems() {
        visibleGalleryItems = Array.from(galleryItems).filter(item => !item.classList.contains("hidden"));
    }

    if (lightbox && galleryItems.length > 0) {
        // Open Lightbox
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                updateVisibleItems();
                const clickedImg = item.querySelector("img");
                currentImageIndex = visibleGalleryItems.indexOf(item);
                
                showLightboxImage(clickedImg.src, clickedImg.alt);
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden"; // Prevent scrolling background
            });
        });

        // Show Image
        function showLightboxImage(src, alt) {
            lightboxImg.src = src;
            lightboxCaption.textContent = alt || "Kioskra Exhibition Stall Design";
        }

        // Close Lightbox
        const closeLightbox = () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
        };

        if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Navigate Lightbox
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

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") navigateImage(-1);
            if (e.key === "ArrowRight") navigateImage(1);
        });
    }

    // --- 3D Walkthrough Video Section Carousel (on Portfolio) ---
    const vidSlides = document.querySelectorAll('.video-item');
    const prevVidBtn = document.querySelector('.video-container .prev');
    const nextVidBtn = document.querySelector('.video-container .next');
    let vidIdx = 0;

    function changeVideo(n) {
        if (vidSlides.length === 0) return;
        
        // Pause current video
        const currentVid = vidSlides[vidIdx].querySelector('video');
        if (currentVid) {
            currentVid.pause();
            currentVid.currentTime = 0;
        }
        vidSlides[vidIdx].classList.remove('active');

        // Update index
        vidIdx = (vidIdx + n + vidSlides.length) % vidSlides.length;

        // Show and play next video
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

    // Auto-play the first video on portfolio load
    if (vidSlides.length > 0) {
        const firstVid = vidSlides[0].querySelector('video');
        if (firstVid) {
            firstVid.play().catch(error => {});
        }
    }

    // --- Web3Forms AJAX Form Submission ---
    const form = document.getElementById('form');
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            formData.append("access_key", "6707ec36-3879-4a9e-9752-59eab3843d77");

            const originalText = submitBtn.textContent;

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    showPremiumAlert("Success!", "Your message has been sent successfully.", true, () => {
                        form.reset();
                        window.location.href = "thankyou.html";
                    });
                } else {
                    showPremiumAlert("Error", data.message || "Failed to send message.", false);
                }

            } catch (error) {
                showPremiumAlert("Something went wrong", "Please check your connection and try again.", false);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- Dynamic WhatsApp Link Builder for Floater ---
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

// --- WhatsApp Enquiry Form Submission helper ---
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

// --- Premium Custom Alert Modal Helper ---
function showPremiumAlert(title, message, isSuccess = true, callback = null) {
    // Remove existing alert if any
    const existingAlert = document.querySelector('.custom-alert-overlay');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create overlay container
    const overlay = document.createElement('div');
    overlay.className = 'custom-alert-overlay';
    
    // Choose icon based on state
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

    // Trigger transition
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });

    // Close alert function
    const closeAlert = () => {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
            if (callback) callback();
        }, 300);
    };

    // Close on button click
    overlay.querySelector('.custom-alert-btn').addEventListener('click', closeAlert);

    // Close on click outside the alert box
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeAlert();
        }
    });

    // Keyboard controls (Enter or Escape to close)
    const handleKeydown = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            document.removeEventListener('keydown', handleKeydown);
            closeAlert();
        }
    };
    document.addEventListener('keydown', handleKeydown);
}
