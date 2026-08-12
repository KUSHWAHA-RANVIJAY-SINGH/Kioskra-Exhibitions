// =============================================================
// KIOSKRA – Booth Cost Calculator
// Real-time calculation, PDF generation, lead tracking
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
    const widthInput = document.getElementById('calc-width');
    const depthInput = document.getElementById('calc-depth');
    const boothTypes = document.getElementById('boothTypes');
    const calcFeatures = document.getElementById('calcFeatures');
    const locationSelect = document.getElementById('calc-location');
    const resultPrice = document.getElementById('resultPrice');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');

    if (!widthInput || !resultPrice) return;

    let selectedRate = 2000;
    let selectedType = 'Basic';

    // Format number to Indian notation
    function formatIndian(num) {
        const str = Math.round(num).toString();
        let result = '';
        let count = 0;
        for (let i = str.length - 1; i >= 0; i--) {
            count++;
            result = str[i] + result;
            if (count === 3 && i > 0) {
                result = ',' + result;
                count = 0;
            } else if (count === 2 && result.indexOf(',') !== -1 && i > 0) {
                result = ',' + result;
                count = 0;
            }
        }
        return result;
    }

    function toIndianFormat(num) {
        return num.toLocaleString('en-IN');
    }

    // Calculate cost
    function calculateCost() {
        const width = parseFloat(widthInput.value) || 10;
        const depth = parseFloat(depthInput.value) || 10;
        const area = width * depth;
        const locationMultiplier = parseFloat(locationSelect.value) || 1.0;

        // Base cost
        let baseCost = area * selectedRate * locationMultiplier;

        // Feature add-ons
        let featureCost = 0;
        const checkboxes = calcFeatures.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(cb => {
            featureCost += parseFloat(cb.dataset.price) || 0;
        });

        const totalMin = Math.round((baseCost + featureCost) * 0.9);
        const totalMax = Math.round((baseCost + featureCost) * 1.15);

        resultPrice.textContent = `₹${toIndianFormat(totalMin)} – ₹${toIndianFormat(totalMax)}`;

        // Track features selected
        trackFeatureSelection(checkboxes);

        return { width, depth, area, selectedType, selectedRate, locationMultiplier, featureCost, totalMin, totalMax, features: Array.from(checkboxes).map(cb => cb.value) };
    }

    // Track which features are most selected
    function trackFeatureSelection(checkboxes) {
        try {
            const tracking = JSON.parse(localStorage.getItem('kioskra_calc_tracking') || '{}');
            tracking.views = (tracking.views || 0) + 1;
            tracking.lastUsed = new Date().toISOString();
            if (!tracking.features) tracking.features = {};
            checkboxes.forEach(cb => {
                tracking.features[cb.value] = (tracking.features[cb.value] || 0) + 1;
            });
            localStorage.setItem('kioskra_calc_tracking', JSON.stringify(tracking));
        } catch (e) { /* silent */ }
    }

    // Booth type selection
    if (boothTypes) {
        boothTypes.querySelectorAll('.calc-type-card').forEach(card => {
            card.addEventListener('click', () => {
                boothTypes.querySelectorAll('.calc-type-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                selectedRate = parseInt(card.dataset.rate);
                selectedType = card.querySelector('h4').textContent;
                calculateCost();
            });
        });
    }

    // Feature checkboxes
    if (calcFeatures) {
        calcFeatures.querySelectorAll('.calc-feature-item').forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            item.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                item.classList.toggle('checked', checkbox.checked);
                calculateCost();
            });
        });
    }

    // Input change listeners
    [widthInput, depthInput].forEach(input => {
        if (input) input.addEventListener('input', calculateCost);
    });
    if (locationSelect) locationSelect.addEventListener('change', calculateCost);

    // Initial calculation
    calculateCost();

    // PDF Download
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            const data = calculateCost();
            generatePDF(data);
        });
    }

    function generatePDF(data) {
        try {
            const { jsPDF } = window.jspdf;
            if (!jsPDF) {
                alert('PDF library loading. Please try again in a moment.');
                return;
            }

            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();

            // Header
            doc.setFillColor(7, 10, 19);
            doc.rect(0, 0, pageWidth, 45, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text('Kioskra Exhibitions', 20, 22);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('Premium Exhibition Design & Execution', 20, 32);
            doc.text('www.kioskra.com | +91 9643378735', 20, 39);

            // Title
            doc.setTextColor(15, 23, 42);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Exhibition Booth Cost Estimate', 20, 62);

            doc.setDrawColor(14, 165, 233);
            doc.setLineWidth(0.8);
            doc.line(20, 66, 100, 66);

            // Date
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 116, 139);
            doc.text(`Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, 74);

            // Details
            let y = 88;
            const lineHeight = 10;

            doc.setFontSize(11);
            doc.setTextColor(15, 23, 42);

            const details = [
                ['Booth Dimensions', `${data.width} ft × ${data.depth} ft (${data.area} sq ft)`],
                ['Booth Type', data.selectedType],
                ['Rate per sq ft', `₹${toIndianFormat(data.selectedRate)}`],
                ['Location Multiplier', `${data.locationMultiplier}x`],
            ];

            if (data.features.length > 0) {
                details.push(['Add-on Features', data.features.join(', ')]);
                details.push(['Add-on Cost', `₹${toIndianFormat(data.featureCost)}`]);
            }

            details.forEach(([label, value]) => {
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(100, 116, 139);
                doc.text(label, 20, y);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(15, 23, 42);
                doc.text(value, 90, y);
                y += lineHeight;
            });

            // Estimate Box
            y += 10;
            doc.setFillColor(240, 249, 255);
            doc.roundedRect(20, y - 5, pageWidth - 40, 30, 4, 4, 'F');
            doc.setFontSize(10);
            doc.setTextColor(100, 116, 139);
            doc.text('ESTIMATED COST RANGE', 25, y + 5);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(14, 165, 233);
            doc.text(`₹${toIndianFormat(data.totalMin)} – ₹${toIndianFormat(data.totalMax)}`, 25, y + 19);

            // Disclaimer
            y += 42;
            doc.setFontSize(8);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(148, 163, 184);
            doc.text('* This is an indicative estimate. Final pricing depends on design complexity, material selection,', 20, y);
            doc.text('  and on-site logistics. Contact us for a detailed quotation with 3D design concepts.', 20, y + 5);

            // Footer
            y += 20;
            doc.setDrawColor(226, 232, 240);
            doc.line(20, y, pageWidth - 20, y);
            y += 10;
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 116, 139);
            doc.text('For a detailed quote with 3D design, contact:', 20, y);
            y += 6;
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(14, 165, 233);
            doc.text('Email: info@kioskra.com | Phone: +91 9643378735 | WhatsApp: +91 9643378735', 20, y);

            doc.save('Kioskra-Booth-Estimate.pdf');

        } catch (e) {
            console.error('PDF generation error:', e);
            alert('Could not generate PDF. Please try again.');
        }
    }
});
