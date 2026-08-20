// =============================================================
// KIOSKRA EXHIBITIONS – Stall Layout System
// Proportional Canvas Grid, Lead Generation & Quote Flow
// =============================================================

class StallLayoutSystem {
    constructor() {
        this.baseRatePerSqm = 8000; // ₹8,000 per sqm
        
        // State variables
        this.unit = 'meter';
        this.width = 6;
        this.length = 3;
        this.stallType = 'custom';
        this.layoutShape = 'square';
        this.features = [];
        this.receptionPos = 'center';
        
        this.isUnlocked = false;

        this.init();
    }

    init() {
        // Cache DOM elements
        this.unitSelect = document.getElementById('stall-unit');
        this.widthInput = document.getElementById('stall-width');
        this.lengthInput = document.getElementById('stall-length');
        this.areaDisplay = document.getElementById('stall-area-val');
        this.areaFtDisplay = document.getElementById('stall-area-ft-val');
        
        this.canvas = document.getElementById('layout-canvas');
        this.ctx = this.canvas?.getContext('2d');

        this.leadForm = document.getElementById('quote-lead-form');
        this.emailInput = document.getElementById('quote-email');
        this.submitBtn = document.getElementById('quote-submit-btn');
        this.btnText = this.submitBtn?.querySelector('.btn-text');
        this.btnLoader = this.submitBtn?.querySelector('.btn-loader');
        
        this.teaserBox = document.getElementById('quote-teaser-box');
        this.unlockedBox = document.getElementById('quote-unlocked-box');
        this.priceDisplay = document.getElementById('unlocked-price-display');
        
        this.btnRequestFinal = document.getElementById('btn-request-final');
        this.btnWhatsAppQuote = document.getElementById('btn-whatsapp-quote');
        this.receptionPositionBlock = document.getElementById('reception-position-block');

        if (!this.canvas) return; // Guard clause if elements not loaded

        // Bind events
        this.bindEvents();
        
        // Initial setup and draw
        this.updateDimensions();
        this.draw();
    }

    bindEvents() {
        // Selectors for Stall Type
        document.querySelectorAll('input[name="stall-type"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.stallType = e.target.value;
                this.draw();
            });
        });

        // Selectors for Layout Shape
        document.querySelectorAll('input[name="layout-shape"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.layoutShape = e.target.value;
                this.draw();
            });
        });

        // Dimension inputs
        this.unitSelect.addEventListener('change', (e) => {
            this.unit = e.target.value;
            // Update min/max/default value based on unit
            if (this.unit === 'feet') {
                this.widthInput.min = 10;
                this.widthInput.max = 100;
                this.widthInput.value = 20;
                this.lengthInput.min = 10;
                this.lengthInput.max = 100;
                this.lengthInput.value = 10;
            } else {
                this.widthInput.min = 3;
                this.widthInput.max = 30;
                this.widthInput.value = 6;
                this.lengthInput.min = 3;
                this.lengthInput.max = 30;
                this.lengthInput.value = 3;
            }
            this.updateDimensions();
        });

        const handleDimensionChange = () => {
            let w = parseFloat(this.widthInput.value) || 0;
            let l = parseFloat(this.lengthInput.value) || 0;
            
            // Boundary enforcement
            const minW = parseInt(this.widthInput.min);
            const maxW = parseInt(this.widthInput.max);
            const minL = parseInt(this.lengthInput.min);
            const maxL = parseInt(this.lengthInput.max);

            if (w < minW) w = minW;
            if (w > maxW) w = maxW;
            if (l < minL) l = minL;
            if (l > maxL) l = maxL;

            this.widthInput.value = w;
            this.lengthInput.value = l;
            
            this.width = w;
            this.length = l;
            this.updateDimensions();
        };

        this.widthInput.addEventListener('change', handleDimensionChange);
        this.lengthInput.addEventListener('change', handleDimensionChange);

        // Feature checklist
        document.querySelectorAll('.features-checkbox-grid input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateFeatures();
                this.draw();
            });
        });

        // Reception positions
        document.querySelectorAll('input[name="reception-pos"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.receptionPos = e.target.value;
                this.draw();
            });
        });

        // Lead submission
        this.leadForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitLead();
        });

        // Secondary CTA buttons
        this.btnRequestFinal?.addEventListener('click', () => {
            this.requestFinalQuote();
        });

        this.btnWhatsAppQuote?.addEventListener('click', () => {
            this.openWhatsApp();
        });

        // Redraw canvas dynamically on theme change
        window.addEventListener('kioskra-theme-change', () => {
            this.draw();
        });
    }

    getThemeColor(varName, fallback) {
        try {
            const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
            return val || fallback;
        } catch (e) {
            return fallback;
        }
    }

    updateDimensions() {
        this.width = parseFloat(this.widthInput.value) || 6;
        this.length = parseFloat(this.lengthInput.value) || 3;

        let areaSqm = 0;
        let areaSqft = 0;

        if (this.unit === 'feet') {
            areaSqft = this.width * this.length;
            areaSqm = areaSqft * 0.092903; // Convert sqft to sqm
            this.areaDisplay.textContent = areaSqm.toFixed(2);
            this.areaFtDisplay.textContent = `(${areaSqft.toFixed(0)} sq ft)`;
        } else {
            areaSqm = this.width * this.length;
            areaSqft = areaSqm * 10.7639; // Convert sqm to sqft
            this.areaDisplay.textContent = areaSqm.toFixed(2);
            this.areaFtDisplay.textContent = `(${areaSqft.toFixed(0)} sq ft)`;
        }

        // Trigger redraw
        this.draw();
    }

    updateFeatures() {
        this.features = [];
        document.querySelectorAll('.features-checkbox-grid input[type="checkbox"]').forEach(checkbox => {
            if (checkbox.checked) {
                this.features.push(checkbox.value);
            }
        });

        // Show/hide reception position sub-menu
        if (this.features.includes('reception')) {
            this.receptionPositionBlock.style.display = 'flex';
        } else {
            this.receptionPositionBlock.style.display = 'none';
        }
    }

    calculatePrice() {
        let areaSqm = 0;
        if (this.unit === 'feet') {
            areaSqm = (this.width * this.length) * 0.092903;
        } else {
            areaSqm = this.width * this.length;
        }
        
        // Base rate formula: Base Price = Area * ₹8,000
        const startingPrice = areaSqm * this.baseRatePerSqm;
        return startingPrice;
    }

    draw() {
        if (!this.ctx) return;

        const cw = this.canvas.width;
        const ch = this.canvas.height;

        // Resolve theme colors dynamically
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isDark = currentTheme !== 'light' && currentTheme !== 'monochrome';
        const themeTeal = this.getThemeColor('--accent-teal', '#0d9488');
        const themeCyan = this.getThemeColor('--accent-cyan', '#0ea5e9');
        const bgCanvas = isDark ? '#0a101d' : '#ffffff';
        const bgLight = isDark ? '#111a2e' : '#f8fafc';
        const textDark = isDark ? '#f8fafc' : '#0f172a';
        const textMuted = isDark ? '#94a3b8' : '#64748b';
        const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
        const wallColor = isDark ? '#38bdf8' : '#0f172a';
        const plantColor = isDark ? '#10b981' : '#16a34a';
        const plantTextColor = isDark ? '#34d399' : '#15803d';

        // 1. Clear Canvas & Draw Blueprint Grid Backdrop
        this.ctx.fillStyle = bgCanvas;
        this.ctx.fillRect(0, 0, cw, ch);

        // Technical drafting grid lines
        this.ctx.strokeStyle = isDark ? 'rgba(14, 165, 233, 0.08)' : '#f1f5f9';
        this.ctx.lineWidth = 1;
        const mainGridSize = 25;
        for (let x = 0; x < cw; x += mainGridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, ch);
            this.ctx.stroke();
        }
        for (let y = 0; y < ch; y += mainGridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(cw, y);
            this.ctx.stroke();
        }

        // 2. Proportional Scaling Logic
        const maxDrawWidth = 260;
        const maxDrawHeight = 210;
        const centerX = cw / 2;
        const centerY = ch / 2 - 15; // Shift up slightly to fit bottom labels

        const ratio = this.width / this.length;
        let scale = 1;

        if (ratio > (maxDrawWidth / maxDrawHeight)) {
            scale = maxDrawWidth / this.width;
        } else {
            scale = maxDrawHeight / this.length;
        }

        const boothWidth = this.width * scale;
        const boothHeight = this.length * scale;
        const boothX = centerX - boothWidth / 2;
        const boothY = centerY - boothHeight / 2;

        // 3. Draw Booth Border Floor Boundary (Dashed lines representing open sides)
        this.ctx.strokeStyle = themeTeal;
        this.ctx.lineWidth = 1.5;
        this.ctx.setLineDash([5, 5]);
        this.ctx.strokeRect(boothX, boothY, boothWidth, boothHeight);
        this.ctx.setLineDash([]); // Reset to solid line

        // Draw light floor color inside the booth
        this.ctx.fillStyle = bgLight;
        this.ctx.fillRect(boothX, boothY, boothWidth, boothHeight);

        // 4. Draw Proportional Internal Grid inside the booth boundary
        this.ctx.strokeStyle = cardBorder;
        this.ctx.lineWidth = 1;
        
        // Define grid intervals based on unit & dimensions
        // If meters, draw every 1m. If feet, draw every 5ft.
        const gridInterval = this.unit === 'meter' ? 1 : 5;
        const gridStep = gridInterval * scale;

        // Vertical internal lines
        for (let i = gridInterval; i < this.width; i += gridInterval) {
            const lineX = boothX + i * scale;
            this.ctx.beginPath();
            this.ctx.moveTo(lineX, boothY);
            this.ctx.lineTo(lineX, boothY + boothHeight);
            this.ctx.stroke();
        }
        // Horizontal internal lines
        for (let j = gridInterval; j < this.length; j += gridInterval) {
            const lineY = boothY + j * scale;
            this.ctx.beginPath();
            this.ctx.moveTo(boothX, lineY);
            this.ctx.lineTo(boothX + boothWidth, lineY);
            this.ctx.stroke();
        }

        // 5. Draw Walls based on Layout Shape (solid, thick structures)
        this.ctx.strokeStyle = wallColor;
        this.ctx.fillStyle = wallColor;
        this.ctx.lineWidth = 5;

        // Shapes: square (island, 4 open sides, no walls), l-shape, 3-side-open
        if (this.layoutShape === 'l-shape') {
            // Wall on Top (Back) & Left sides
            this.ctx.beginPath();
            this.ctx.moveTo(boothX - 2.5, boothY + boothHeight);
            this.ctx.lineTo(boothX - 2.5, boothY - 2.5);
            this.ctx.lineTo(boothX + boothWidth, boothY - 2.5);
            this.ctx.stroke();
        } else if (this.layoutShape === '3-side-open') {
            // Wall on Top (Back) side only
            this.ctx.beginPath();
            this.ctx.moveTo(boothX, boothY - 2.5);
            this.ctx.lineTo(boothX + boothWidth, boothY - 2.5);
            this.ctx.stroke();
        } else if (this.layoutShape === 'square') {
            // Island setup: no outer solid walls, draw 4 corner support pillars
            this.ctx.fillStyle = wallColor;
            const pillarSize = Math.max(6, Math.min(10, scale * 0.4));
            this.ctx.fillRect(boothX - pillarSize/2, boothY - pillarSize/2, pillarSize, pillarSize);
            this.ctx.fillRect(boothX + boothWidth - pillarSize/2, boothY - pillarSize/2, pillarSize, pillarSize);
            this.ctx.fillRect(boothX - pillarSize/2, boothY + boothHeight - pillarSize/2, pillarSize, pillarSize);
            this.ctx.fillRect(boothX + boothWidth - pillarSize/2, boothY + boothHeight - pillarSize/2, pillarSize, pillarSize);
        }

        // 6. Draw Selected Features (visual shapes styled with technical detail)
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Feature: LED Wall
        if (this.features.includes('led-wall')) {
            // Placed centered along the back (top) wall
            const ledWidth = boothWidth * 0.6;
            const ledHeight = 8;
            const ledX = centerX - ledWidth / 2;
            const ledY = boothY - 4;
            
            // Draw LED blue/accent glowing bar
            this.ctx.fillStyle = themeCyan;
            this.ctx.fillRect(ledX, ledY, ledWidth, ledHeight);
            this.ctx.strokeStyle = bgWhite;
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(ledX, ledY, ledWidth, ledHeight);
            
            // Text Label
            this.ctx.fillStyle = themeCyan;
            this.ctx.font = 'bold 9px sans-serif';
            this.ctx.fillText('LED VIDEO WALL', centerX, boothY - 14);
        }

        // Feature: Reception Counter
        if (this.features.includes('reception')) {
            const counterW = Math.max(35, Math.min(50, scale * 1.5));
            const counterH = Math.max(14, Math.min(20, scale * 0.6));
            let counterX = centerX - counterW / 2;
            const counterY = boothY + boothHeight - counterH - 12;

            if (this.receptionPos === 'left') {
                counterX = boothX + 15;
            } else if (this.receptionPos === 'right') {
                counterX = boothX + boothWidth - counterW - 15;
            }

            // Draw desk shape
            this.ctx.fillStyle = bgLight;
            this.ctx.strokeStyle = textDark;
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.roundRect(counterX, counterY, counterW, counterH, 4);
            this.ctx.fill();
            this.ctx.stroke();

            // Label text
            this.ctx.fillStyle = textDark;
            this.ctx.font = '9px sans-serif';
            this.ctx.fillText('REC', counterX + counterW / 2, counterY + counterH / 2);
        }

        // Feature: Discussion Lounge (Table + 3 Chairs)
        if (this.features.includes('lounge')) {
            // Placed at top-right corner if open, or center depending on wall
            const loungeRadius = Math.max(12, Math.min(20, scale * 0.6));
            let loungeX = boothX + boothWidth - loungeRadius - 20;
            let loungeY = boothY + loungeRadius + 20;
            
            if (this.layoutShape === 'l-shape') {
                // Shift down/left slightly if corner walls block
                loungeX = boothX + boothWidth - loungeRadius - 25;
                loungeY = boothY + loungeRadius + 25;
            }

            // Draw table circle
            this.ctx.fillStyle = bgWhite;
            this.ctx.strokeStyle = textMuted;
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.arc(loungeX, loungeY, loungeRadius, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();

            // Draw chairs (small circles around table)
            this.ctx.fillStyle = themeTeal;
            const chairRadius = loungeRadius * 0.35;
            const angles = [0, 2.1, 4.2]; // 120 deg apart
            angles.forEach(angle => {
                const cx = loungeX + Math.cos(angle) * (loungeRadius + 5);
                const cy = loungeY + Math.sin(angle) * (loungeRadius + 5);
                this.ctx.beginPath();
                this.ctx.arc(cx, cy, chairRadius, 0, 2 * Math.PI);
                this.ctx.fill();
            });

            // Label
            this.ctx.fillStyle = textMuted;
            this.ctx.font = '8px sans-serif';
            this.ctx.fillText('LOUNGE', loungeX, loungeY);
        }

        // Feature: Product Display (Podiums/Shelves)
        if (this.features.includes('display')) {
            const shelfW = Math.max(12, Math.min(20, scale * 0.6));
            const shelfH = Math.max(12, Math.min(20, scale * 0.6));
            
            // Placed on left/right walls/sides
            const leftShelfX = boothX + 10;
            const rightShelfX = boothX + boothWidth - shelfW - 10;
            const midShelfY = boothY + boothHeight / 2 - shelfH / 2;

            this.ctx.fillStyle = bgWhite;
            this.ctx.strokeStyle = textMuted;
            this.ctx.lineWidth = 1.5;

            // Draw Left shelf
            this.ctx.fillRect(leftShelfX, midShelfY, shelfW, shelfH);
            this.ctx.strokeRect(leftShelfX, midShelfY, shelfW, shelfH);
            
            // Draw Right shelf
            this.ctx.fillRect(rightShelfX, midShelfY, shelfW, shelfH);
            this.ctx.strokeRect(rightShelfX, midShelfY, shelfW, shelfH);

            this.ctx.fillStyle = textMuted;
            this.ctx.font = '8px sans-serif';
            this.ctx.fillText('DSP', leftShelfX + shelfW / 2, midShelfY + shelfH / 2);
            this.ctx.fillText('DSP', rightShelfX + shelfW / 2, midShelfY + shelfH / 2);
        }

        // Feature: Planters & Greenery
        if (this.features.includes('greenery')) {
            const plantR = Math.max(6, Math.min(10, scale * 0.3));
            
            // Placed in empty corners (bottom corners)
            const leftPlantX = boothX + plantR + 10;
            const rightPlantX = boothX + boothWidth - plantR - 10;
            const plantY = boothY + plantR + 10; // Top corner placement to not overlap counter

            this.ctx.fillStyle = plantColor;
            
            this.ctx.beginPath();
            this.ctx.arc(leftPlantX, plantY, plantR, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(rightPlantX, plantY, plantR, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.fillStyle = plantTextColor;
            this.ctx.font = '8px sans-serif';
            this.ctx.fillText('PLANT', leftPlantX, plantY - plantR - 4);
            this.ctx.fillText('PLANT', rightPlantX, plantY - plantR - 4);
        }

        // Feature: Interactive Touch Panel
        if (this.features.includes('touch-screen')) {
            const panelW = 14;
            const panelH = 10;
            const panelX = boothX + 15;
            const panelY = boothY + boothHeight - 40;

            // Draw panel icon stand
            this.ctx.fillStyle = themeTeal;
            this.ctx.fillRect(panelX, panelY, panelW, panelH);
            this.ctx.strokeStyle = bgWhite;
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(panelX, panelY, panelW, panelH);

            this.ctx.fillStyle = textMuted;
            this.ctx.font = '7px sans-serif';
            this.ctx.fillText('TOUCH', panelX + panelW / 2, panelY + panelH / 2);
        }

        // 7. Draw Technical Dimension Labels outside boundary
        this.ctx.fillStyle = textDark;
        this.ctx.font = '500 11px sans-serif';
        this.ctx.strokeStyle = textMuted;
        this.ctx.lineWidth = 1;

        const labelOffset = 25;
        const arrowSize = 4;

        // A. Width Dimension Line (drawn above the booth top wall)
        const dimY = boothY - labelOffset;
        this.ctx.beginPath();
        this.ctx.moveTo(boothX, dimY);
        this.ctx.lineTo(boothX + boothWidth, dimY);
        this.ctx.stroke();

        // Draw left/right limit hashes
        this.ctx.beginPath();
        this.ctx.moveTo(boothX, dimY - 4);
        this.ctx.lineTo(boothX, dimY + 4);
        this.ctx.moveTo(boothX + boothWidth, dimY - 4);
        this.ctx.lineTo(boothX + boothWidth, dimY + 4);
        this.ctx.stroke();

        // Draw arrowheads
        this.drawArrowhead(boothX, dimY, Math.PI);
        this.drawArrowhead(boothX + boothWidth, dimY, 0);

        // Text label
        const widthText = `${this.width} ${this.unit === 'meter' ? 'm' : 'ft'}`;
        this.ctx.fillStyle = bgCanvas;
        this.ctx.fillRect(centerX - 25, dimY - 7, 50, 14); // Text backdrop box
        this.ctx.fillStyle = textDark;
        this.ctx.fillText(widthText, centerX, dimY);

        // B. Length Dimension Line (drawn to the left side)
        const dimX = boothX - labelOffset;
        this.ctx.beginPath();
        this.ctx.moveTo(dimX, boothY);
        this.ctx.lineTo(dimX, boothY + boothHeight);
        this.ctx.stroke();

        // Draw top/bottom limit hashes
        this.ctx.beginPath();
        this.ctx.moveTo(dimX - 4, boothY);
        this.ctx.lineTo(dimX + 4, boothY);
        this.ctx.moveTo(dimX - 4, boothY + boothHeight);
        this.ctx.lineTo(dimX + 4, boothY + boothHeight);
        this.ctx.stroke();

        // Draw arrowheads
        this.drawArrowhead(dimX, boothY, -Math.PI / 2);
        this.drawArrowhead(dimX, boothY + boothHeight, Math.PI / 2);

        // Text label
        const lengthText = `${this.length} ${this.unit === 'meter' ? 'm' : 'ft'}`;
        this.ctx.save();
        this.ctx.translate(dimX, centerY);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillStyle = bgCanvas;
        this.ctx.fillRect(-25, -7, 50, 14);
        this.ctx.fillStyle = textDark;
        this.ctx.fillText(lengthText, 0, 0);
        this.ctx.restore();
    }

    drawArrowhead(x, y, angle) {
        if (!this.ctx) return;
        const size = 5;
        this.ctx.fillStyle = this.getThemeColor('--accent-teal', '#666666');
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-size, -size / 2);
        this.ctx.lineTo(-size, size / 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    async submitLead() {
        const email = this.emailInput.value.trim();
        if (!email) return;

        // Simple validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show loading state
        if (this.btnText) this.btnText.textContent = 'Sending Quote...';
        if (this.btnLoader) this.btnLoader.style.display = 'inline-block';
        if (this.submitBtn) this.submitBtn.disabled = true;

        // Build specifications payload
        const specsText = `
Stall Type: ${this.stallType}
Shape Layout: ${this.layoutShape}
Dimensions: ${this.width} x ${this.length} ${this.unit === 'meter' ? 'meters' : 'feet'}
Total Area: ${this.areaDisplay.textContent} sqm
Features Selected: ${this.features.join(', ') || 'None'}
Reception Desk Position: ${this.features.includes('reception') ? this.receptionPos : 'N/A'}
Starting Base Price: ₹${this.formatCurrency(this.calculatePrice())}
        `.trim();

        // Web3Forms Lead Submission
        const formData = new FormData();
        formData.append('access_key', '6707ec36-3879-4a9e-9752-59eab3843d77');
        formData.append('email', email);
        formData.append('subject', 'New Stall Layout Lead Quote Request');
        formData.append('configuration_details', specsText);
        formData.append('name', 'Stall Planner User');
        formData.append('phone', 'N/A');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                // Success: Unlock quote
                this.isUnlocked = true;
                this.revealUnlockedQuote();
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Lead Submission Error:', error);
            // Error handling
            alert('Lead submission failed. You can connect with our design experts directly via WhatsApp to get your quote!');
            this.showWhatsAppFallback();
        } finally {
            if (this.btnText) this.btnText.textContent = 'Reveal Quote →';
            if (this.btnLoader) this.btnLoader.style.display = 'none';
            if (this.submitBtn) this.submitBtn.disabled = false;
        }
    }

    revealUnlockedQuote() {
        const quoteVal = this.calculatePrice();
        this.priceDisplay.textContent = `Starting from ₹${this.formatCurrency(quoteVal)}`;

        // Smooth transition
        this.teaserBox.style.display = 'none';
        this.unlockedBox.classList.add('active');

        // Alert user
        if (typeof showPremiumAlert === 'function') {
            showPremiumAlert('Quotation Unlocked!', `Estimated starting cost is ₹${this.formatCurrency(quoteVal)}. A copy has been logged and our studio team will review your specifications.`, true);
        }
    }

    showWhatsAppFallback() {
        // Unhide a clean fallback button under the lead box
        const fallbackText = document.createElement('div');
        fallbackText.style.marginTop = '15px';
        fallbackText.style.fontSize = '0.85rem';
        fallbackText.style.color = '#ef4444';
        fallbackText.innerHTML = `
            Could not submit. <a href="#" id="wa-retry-link" style="text-decoration: underline; font-weight: 600; color: #25d366;">Click here to get quote on WhatsApp →</a>
        `;
        
        const existingFallback = this.teaserBox.querySelector('.wa-fallback');
        if (existingFallback) existingFallback.remove();
        
        fallbackText.className = 'wa-fallback';
        this.teaserBox.appendChild(fallbackText);
        
        document.getElementById('wa-retry-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openWhatsApp();
        });
    }

    formatCurrency(val) {
        return Math.round(val).toLocaleString('en-IN');
    }

    requestFinalQuote() {
        // Scrolls down to final contact form and pre-populates message
        const contactSection = document.getElementById('contact-section');
        const messageField = document.getElementById('message');
        
        if (messageField) {
            messageField.value = `I designed a booth layout:\n` +
                `- Type: ${this.stallType}\n` +
                `- Shape: ${this.layoutShape}\n` +
                `- Dimensions: ${this.width}x${this.length} ${this.unit}\n` +
                `- Features: ${this.features.join(', ') || 'None'}\n` +
                `Please prepare a final 3D design and quotation.`;
        }

        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    openWhatsApp() {
        const price = this.formatCurrency(this.calculatePrice());
        const message = `Hi Kioskra, I configured a ${this.stallType} stall with dimensions ${this.width}x${this.length} ${this.unit} (${this.layoutShape}). Features: ${this.features.join(', ') || 'None'}. The starting estimate is ₹${price}. Please provide a detailed quote and 3D Mock-up. My email: ${this.emailInput.value || 'N/A'}`;
        const whatsappLink = `https://wa.me/919643378735?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.stallLayout = new StallLayoutSystem();
    });
} else {
    window.stallLayout = new StallLayoutSystem();
}
