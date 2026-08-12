// =============================================================
// KIOSKRA – Interactive 2D Booth Configurator Logic
// Live SVG rendering, real-time cost, form submissions
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const widthInput = document.getElementById('config-width');
    const depthInput = document.getElementById('config-depth');
    const heightSelect = document.getElementById('config-height');
    const colorInput = document.getElementById('config-color');
    const colorHex = document.getElementById('color-hex');
    const shapeButtons = document.querySelectorAll('.shape-btn');
    const featureToggles = document.getElementById('featureToggles');
    const svgDrawGroup = document.getElementById('svg-draw-group');
    const configCost = document.getElementById('config-cost');
    const summaryList = document.getElementById('config-summary-list');
    const hiddenSpecs = document.getElementById('config-hidden-specs');
    const configForm = document.getElementById('config-form');

    if (!widthInput || !document.getElementById('live-svg') || !svgDrawGroup) return;

    let selectedShape = 'square';
    const baseRateSqFt = 2500; // Average premium custom rate

    // Easing helper for Indian rupee format
    function toIndianFormat(num) {
        return Math.round(num).toLocaleString('en-IN');
    }

    // Main Update Function
    function updateConfigurator() {
        const width = parseFloat(widthInput.value) || 20;
        const depth = parseFloat(depthInput.value) || 20;
        const height = parseFloat(heightSelect.value) || 8;
        const color = colorInput.value || '#0ea5e9';
        
        // Update color hex label
        if (colorHex) {
            colorHex.textContent = color.toUpperCase();
            colorHex.style.color = color;
        }

        // 1. Calculate Cost
        const area = width * depth;
        let baseCost = area * baseRateSqFt;
        
        // Height multiplier
        if (height === 10) baseCost *= 1.1;
        if (height === 12) baseCost *= 1.25;

        // Shape multiplier
        if (selectedShape === 'l-shape') baseCost *= 1.15;
        if (selectedShape === 'open-three') baseCost *= 1.1;

        let featuresCost = 0;
        const activeFeatures = [];

        if (featureToggles) {
            featureToggles.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
                featuresCost += parseFloat(cb.dataset.price) || 0;
                activeFeatures.push(cb.value);
            });
        }

        const totalMin = Math.round((baseCost + featuresCost) * 0.9);
        const totalMax = Math.round((baseCost + featuresCost) * 1.15);

        // Update cost text
        if (configCost) {
            configCost.textContent = `₹${toIndianFormat(totalMin)} – ₹${toIndianFormat(totalMax)}`;
        }

        // 2. Render 2D SVG preview
        drawBooth(width, depth, color, activeFeatures);

        // 3. Update Summary & Hidden Form Input
        updateSummary(width, depth, height, color, activeFeatures, totalMin, totalMax);
    }

    // In-canvas 2D rendering
    function drawBooth(w, d, brandColor, features) {
        // Clear drawing group
        svgDrawGroup.innerHTML = '';

        // Scale factors: Fit max 60ft width/depth inside ~300px
        const maxDim = Math.max(w, d);
        const scale = Math.min(300 / maxDim, 8); // Scale factor (px/ft)

        const pxW = w * scale;
        const pxD = d * scale;
        const halfW = pxW / 2;
        const halfD = pxD / 2;

        // Draw Booth Carpet/Floor
        const floor = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        floor.setAttribute('x', -halfW);
        floor.setAttribute('y', -halfD);
        floor.setAttribute('width', pxW);
        floor.setAttribute('height', pxD);
        floor.setAttribute('fill', 'rgba(255, 255, 255, 0.08)');
        floor.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
        floor.setAttribute('stroke-width', '1.5');
        svgDrawGroup.appendChild(floor);

        // Draw Walls depending on booth shape type
        const walls = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let wallPath = '';

        if (selectedShape === 'square') {
            // Standard back wall (Top wall) and one side wall (Left wall)
            wallPath = `M ${-halfW} ${halfD} L ${-halfW} ${-halfD} L ${halfW} ${-halfD}`;
        } else if (selectedShape === 'l-shape') {
            // Corner back wall (Top wall and Left wall) + inner divider
            wallPath = `M ${-halfW} ${halfD} L ${-halfW} ${-halfD} L ${halfW} ${-halfD}`;
        } else {
            // Open three sides (Only back wall / Top wall exists)
            wallPath = `M ${-halfW} ${-halfD} L ${halfW} ${-halfD}`;
        }

        walls.setAttribute('d', wallPath);
        walls.setAttribute('fill', 'none');
        walls.setAttribute('stroke', brandColor);
        walls.setAttribute('stroke-width', '6');
        walls.setAttribute('stroke-linecap', 'square');
        svgDrawGroup.appendChild(walls);

        // Feature Elements Renderings
        
        // 1. LED Video Wall (on the top back wall)
        if (features.includes('led')) {
            const led = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            led.setAttribute('x1', -halfW * 0.6);
            led.setAttribute('y1', -halfD + 1);
            led.setAttribute('x2', halfW * 0.6);
            led.setAttribute('y2', -halfD + 1);
            led.setAttribute('stroke', '#f43f5e'); // red light accent
            led.setAttribute('stroke-width', '4');
            svgDrawGroup.appendChild(led);

            const ledLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            ledLabel.setAttribute('x', 0);
            ledLabel.setAttribute('y', -halfD - 8);
            ledLabel.setAttribute('fill', '#f43f5e');
            ledLabel.setAttribute('font-size', '9');
            ledLabel.setAttribute('font-weight', 'bold');
            ledLabel.setAttribute('text-anchor', 'middle');
            ledLabel.textContent = 'LED VIDEO WALL';
            svgDrawGroup.appendChild(ledLabel);
        }

        // 2. Reception Counter (near front entry)
        if (features.includes('counter')) {
            const counter = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            const cWidth = Math.max(16, w * scale * 0.25);
            const cHeight = Math.max(8, d * scale * 0.1);
            
            counter.setAttribute('x', -cWidth / 2);
            counter.setAttribute('y', halfD * 0.5);
            counter.setAttribute('width', cWidth);
            counter.setAttribute('height', cHeight);
            counter.setAttribute('rx', '2');
            counter.setAttribute('fill', brandColor);
            counter.setAttribute('stroke', '#fff');
            counter.setAttribute('stroke-width', '1');
            svgDrawGroup.appendChild(counter);

            const counterLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            counterLabel.setAttribute('x', 0);
            counterLabel.setAttribute('y', (halfD * 0.5) + cHeight / 2 + 3);
            counterLabel.setAttribute('fill', '#fff');
            counterLabel.setAttribute('font-size', '7');
            counterLabel.setAttribute('text-anchor', 'middle');
            counterLabel.textContent = 'RECEPTION';
            svgDrawGroup.appendChild(counterLabel);
        }

        // 3. Discussion Lounge (table and 3 chairs)
        if (features.includes('lounge')) {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            // Place it in center right or center left
            const loungeX = pxW > pxD ? halfW * 0.4 : 0;
            const loungeY = pxW > pxD ? 0 : -halfD * 0.2;

            // Table
            const table = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            table.setAttribute('cx', loungeX);
            table.setAttribute('cy', loungeY);
            table.setAttribute('r', '14');
            table.setAttribute('fill', 'rgba(255, 255, 255, 0.25)');
            table.setAttribute('stroke', '#fff');
            table.setAttribute('stroke-width', '1');
            group.appendChild(table);

            // Chairs (3 around table)
            const angles = [0, 120, 240];
            angles.forEach(angle => {
                const rad = (angle * Math.PI) / 180;
                const chairX = loungeX + 22 * Math.cos(rad);
                const chairY = loungeY + 22 * Math.sin(rad);

                const chair = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                chair.setAttribute('cx', chairX);
                chair.setAttribute('cy', chairY);
                chair.setAttribute('r', '5');
                chair.setAttribute('fill', 'rgba(255,255,255,0.4)');
                chair.setAttribute('stroke', '#fff');
                chair.setAttribute('stroke-width', '0.8');
                group.appendChild(chair);
            });

            const loungeLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            loungeLabel.setAttribute('x', loungeX);
            loungeLabel.setAttribute('y', loungeY + 3);
            loungeLabel.setAttribute('fill', '#fff');
            loungeLabel.setAttribute('font-size', '6');
            loungeLabel.setAttribute('font-weight', 'bold');
            loungeLabel.setAttribute('text-anchor', 'middle');
            loungeLabel.textContent = 'LOUNGE';
            group.appendChild(loungeLabel);

            svgDrawGroup.appendChild(group);
        }

        // 4. Product Display Shelves (on Left side wall)
        if (features.includes('shelves')) {
            const shelf = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            shelf.setAttribute('x', -halfW + 2);
            shelf.setAttribute('y', -halfD * 0.4);
            shelf.setAttribute('width', '6');
            shelf.setAttribute('height', halfD * 0.8);
            shelf.setAttribute('fill', 'rgba(255,255,255,0.3)');
            shelf.setAttribute('stroke', brandColor);
            shelf.setAttribute('stroke-width', '1');
            svgDrawGroup.appendChild(shelf);

            const shelfLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            shelfLabel.setAttribute('x', -halfW + 15);
            shelfLabel.setAttribute('y', 0);
            shelfLabel.setAttribute('fill', 'rgba(255,255,255,0.6)');
            shelfLabel.setAttribute('font-size', '7');
            shelfLabel.setAttribute('transform', `rotate(-90, ${-halfW + 15}, 0)`);
            shelfLabel.setAttribute('text-anchor', 'middle');
            shelfLabel.textContent = 'SHELVES';
            svgDrawGroup.appendChild(shelfLabel);
        }

        // 5. Green Planters (in corners)
        if (features.includes('plants')) {
            // Corners list depending on visibility
            const corners = [
                { x: halfW - 12, y: -halfD + 12 },
                { x: -halfW + 12, y: halfD - 12 }
            ];

            corners.forEach(pos => {
                const plant = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                plant.setAttribute('cx', pos.x);
                plant.setAttribute('cy', pos.y);
                plant.setAttribute('r', '7');
                plant.setAttribute('fill', '#10b981'); // Green
                plant.setAttribute('stroke', '#047857');
                plant.setAttribute('stroke-width', '1');
                svgDrawGroup.appendChild(plant);

                const centerDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                centerDot.setAttribute('cx', pos.x);
                centerDot.setAttribute('cy', pos.y);
                centerDot.setAttribute('r', '2');
                centerDot.setAttribute('fill', '#064e3b');
                svgDrawGroup.appendChild(centerDot);
            });
        }
    }

    // Update the visual specs list
    function updateSummary(w, d, h, color, features, minCost, maxCost) {
        if (!summaryList) return;

        summaryList.innerHTML = '';
        const specs = [
            `Dimensions: ${w}ft × ${d}ft`,
            `Shape: ${selectedShape === 'square' ? 'Square / Rect' : selectedShape === 'l-shape' ? 'L-Corner' : '3-Side Open'}`,
            `Height: ${h} ft`,
            `Theme Color: ${color.toUpperCase()}`,
            `Features: ${features.length > 0 ? features.join(', ').toUpperCase() : 'NONE'}`
        ];

        specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            summaryList.appendChild(li);
        });

        // Set hidden input specs value for Web3Forms submit
        if (hiddenSpecs) {
            hiddenSpecs.value = JSON.stringify({
                dimensions: `${w}x${d} ft`,
                shape: selectedShape,
                height: `${h}ft`,
                color: color,
                features: features,
                estimated_price_range: `₹${toIndianFormat(minCost)} - ₹${toIndianFormat(maxCost)}`
            }, null, 2);
        }
    }

    // Event Listeners for controls
    if (widthInput) widthInput.addEventListener('input', updateConfigurator);
    if (depthInput) depthInput.addEventListener('input', updateConfigurator);
    if (heightSelect) heightSelect.addEventListener('change', updateConfigurator);
    if (colorInput) colorInput.addEventListener('input', updateConfigurator);

    // Shape selectors
    shapeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            shapeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedShape = btn.dataset.shape;
            updateConfigurator();
        });
    });

    // Feature Toggles checkbox triggers
    if (featureToggles) {
        featureToggles.querySelectorAll('.feature-toggle').forEach(label => {
            const cb = label.querySelector('input[type="checkbox"]');
            label.addEventListener('click', (e) => {
                if (e.target !== cb) {
                    cb.checked = !cb.checked;
                }
                label.classList.toggle('checked', cb.checked);
                updateConfigurator();
            });
        });
    }

    // Form Submission Handler
    if (configForm) {
        configForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('config-name').value.trim();
            const email = document.getElementById('config-email').value.trim();
            const phone = document.getElementById('config-phone').value.trim();

            if (!name || !email || !phone) return;

            const submitBtn = configForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Specs...';
            submitBtn.disabled = true;

            const formData = new FormData();
            formData.append('access_key', '6707ec36-3879-4a9e-9752-59eab3843d77');
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('subject', 'Interactive Configurator Booth Inquiry');
            formData.append('configuration_specs', hiddenSpecs.value);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    if (typeof showPremiumAlert === 'function') {
                        showPremiumAlert(
                            'Configuration Received!',
                            'Our design studio has logged your custom booth specifications. We will send you initial 3D renders matching your colors & size within 24 hours!',
                            true,
                            () => {
                                configForm.reset();
                                window.location.href = 'thankyou.html';
                            }
                        );
                    } else {
                        alert('Specs sent successfully!');
                        configForm.reset();
                        window.location.href = 'thankyou.html';
                    }
                } else {
                    const data = await response.json();
                    alert(data.message || 'Error sending configuration.');
                }
            } catch (err) {
                alert('Network error. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Initial Trigger
    updateConfigurator();
});
