// =============================================================
// KIOSKRA EXHIBITIONS – Form Handler
// Validation, Submission, WhatsApp Notification, Lead Tracking
// =============================================================

(function () {
    'use strict';

    // =========================================================
    // VALIDATION RULES
    // =========================================================
    const validators = {
        name: (value) => {
            if (!value.trim()) return 'Full name is required';
            if (value.trim().length < 2) return 'Name must be at least 2 characters';
            return '';
        },
        email: (value) => {
            if (!value.trim()) return 'Email address is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
            return '';
        },
        phone: (value) => {
            if (!value.trim()) return 'Phone number is required';
            // Accept Indian mobile: +91XXXXXXXXXX, 91XXXXXXXXXX, 0XXXXXXXXXX, XXXXXXXXXX
            const cleaned = value.replace(/[\s\-\(\)]/g, '');
            const phoneRegex = /^(\+?91|0)?[6-9]\d{9}$/;
            if (!phoneRegex.test(cleaned)) return 'Please enter a valid Indian mobile number';
            return '';
        }
    };

    // =========================================================
    // FORM VALIDATION UI
    // =========================================================
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorEl = document.getElementById(fieldId + '-error');
        if (field) {
            field.classList.toggle('input-error', !!message);
            field.classList.toggle('input-valid', !message && field.value.trim());
        }
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = message ? 'block' : 'none';
        }
    }

    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field || !validators[fieldId]) return true;
        const error = validators[fieldId](field.value);
        showFieldError(fieldId, error);
        return !error;
    }

    function validateAllFields() {
        let isValid = true;
        for (const fieldId of Object.keys(validators)) {
            if (!validateField(fieldId)) {
                isValid = false;
            }
        }
        return isValid;
    }

    // =========================================================
    // LEAD TRACKING (localStorage)
    // =========================================================
    function storeLeadData(formData) {
        try {
            const leads = JSON.parse(localStorage.getItem('kioskra_leads') || '[]');
            const lead = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                name: formData.get('name') || '',
                email: formData.get('email') || '',
                phone: formData.get('phone') || '',
                company: formData.get('company') || '',
                booth_size: formData.get('booth_size') || '',
                budget_range: formData.get('budget_range') || '',
                exhibition_details: formData.get('exhibition_details') || '',
                message: formData.get('message') || '',
                contact_method: formData.get('contact_method') || 'email',
                source: window.location.pathname
            };
            leads.push(lead);
            localStorage.setItem('kioskra_leads', JSON.stringify(leads));
            return lead;
        } catch (e) {
            console.warn('Could not store lead data:', e);
            return null;
        }
    }

    // =========================================================
    // WHATSAPP NOTIFICATION
    // =========================================================
    function sendWhatsAppNotification(lead) {
        if (!lead) return;
        const lines = [
            '🔔 *New Exhibition Enquiry*',
            '',
            `*Name:* ${lead.name}`,
            `*Email:* ${lead.email}`,
            `*Phone:* ${lead.phone}`,
        ];
        if (lead.company) lines.push(`*Company:* ${lead.company}`);
        if (lead.booth_size) lines.push(`*Booth Size:* ${lead.booth_size}`);
        if (lead.budget_range) lines.push(`*Budget:* ${lead.budget_range}`);
        if (lead.exhibition_details) lines.push(`*Exhibition:* ${lead.exhibition_details}`);
        if (lead.message) lines.push(`*Message:* ${lead.message}`);
        lines.push(`*Preferred Contact:* ${lead.contact_method}`);
        lines.push('');
        lines.push('_Sent from kioskra.com_');

        const text = encodeURIComponent(lines.join('\n'));
        // Open WhatsApp in background tab so it doesn't disrupt user flow
        window.open(`https://wa.me/919643378735?text=${text}`, '_blank');
    }

    // =========================================================
    // FORM SUBMISSION HANDLER
    // =========================================================
    function initFormHandler() {
        const form = document.getElementById('form');
        if (!form) return;

        const submitBtn = document.getElementById('form-submit-btn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoader = submitBtn?.querySelector('.btn-loader');

        // Real-time validation on blur
        ['name', 'email', 'phone'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => validateField(fieldId));
                field.addEventListener('input', () => {
                    // Clear error on input
                    if (field.classList.contains('input-error')) {
                        validateField(fieldId);
                    }
                });
            }
        });

        // Submit handler
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate
            if (!validateAllFields()) {
                // Scroll to first error
                const firstError = form.querySelector('.input-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                return;
            }

            // Show loading state
            if (btnText) btnText.textContent = 'Sending...';
            if (btnLoader) btnLoader.style.display = 'inline-block';
            if (submitBtn) submitBtn.disabled = true;

            const formData = new FormData(form);
            formData.append('access_key', '6707ec36-3879-4a9e-9752-59eab3843d77');

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    // Store lead
                    const lead = storeLeadData(formData);

                    // Show success
                    if (typeof showPremiumAlert === 'function') {
                        showPremiumAlert(
                            'Enquiry Received!',
                            'Thank you for reaching out. Our exhibition team will contact you within 24 hours with custom design concepts.',
                            true,
                            () => {
                                form.reset();
                                // Clear validation states
                                form.querySelectorAll('.input-error, .input-valid').forEach(el => {
                                    el.classList.remove('input-error', 'input-valid');
                                });
                                form.querySelectorAll('.field-error').forEach(el => {
                                    el.style.display = 'none';
                                    el.textContent = '';
                                });
                                // Send WhatsApp notification
                                sendWhatsAppNotification(lead);
                                // Redirect to thank you page
                                window.location.href = 'thankyou.html';
                            }
                        );
                    } else {
                        const lead2 = storeLeadData(formData);
                        sendWhatsAppNotification(lead2);
                        form.reset();
                        window.location.href = 'thankyou.html';
                    }
                } else {
                    if (typeof showPremiumAlert === 'function') {
                        showPremiumAlert('Submission Error', data.message || 'Failed to send your enquiry. Please try again.', false);
                    } else {
                        alert(data.message || 'Failed to send. Please try again.');
                    }
                }
            } catch (error) {
                if (typeof showPremiumAlert === 'function') {
                    showPremiumAlert('Something went wrong', 'Please check your internet connection and try again.', false);
                } else {
                    alert('Network error. Please check your connection.');
                }
            } finally {
                if (btnText) btnText.textContent = 'Submit Enquiry';
                if (btnLoader) btnLoader.style.display = 'none';
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    // =========================================================
    // GLOBAL IMAGE ERROR HANDLER
    // =========================================================
    function initImageErrorHandler() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.classList.add('img-fallback');
                e.target.alt = e.target.alt || 'Image unavailable';
                // Don't try to load the image again
                e.target.removeAttribute('src');
            }
        }, true);

        // Add fade-in effect for images as they load
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    }

    // =========================================================
    // INIT
    // =========================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initFormHandler();
            initImageErrorHandler();
        });
    } else {
        initFormHandler();
        initImageErrorHandler();
    }
})();
