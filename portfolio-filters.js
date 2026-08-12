// =============================================================
// KIOSKRA – Portfolio Advanced Filtering & Shareable Views
// =============================================================

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
        const filterIndustry = document.getElementById('filter-industry');
        const filterSize = document.getElementById('filter-size');
        const filterBudget = document.getElementById('filter-budget');
        const filterYear = document.getElementById('filter-year');
        const btnReset = document.getElementById('btn-reset-filters');
        const resultCount = document.getElementById('result-count');
        const noResultsMessage = document.getElementById('no-results-message');
        const categoryButtons = document.querySelectorAll('.filter-btn');

        let activeCategory = 'all';

        // Lists of possible mock values for data enrichment
        const industries = ['electronics', 'fmcg', 'industrial', 'auto', 'pharma'];
        const sizes = ['small', 'medium', 'large'];
        const budgets = ['economy', 'mid-range', 'premium'];
        const years = ['2026', '2025', '2024', '2023'];

        // Helper to consistently assign mock data based on item title or index
        function enrichItemMetadata() {
            galleryItems.forEach((item, index) => {
                // If attributes are not manually defined in HTML, assign realistically based on index
                if (!item.getAttribute('data-industry')) {
                    const ind = industries[index % industries.length];
                    item.setAttribute('data-industry', ind);
                }
                if (!item.getAttribute('data-booth-size')) {
                    // Make some sizes correlate with categories or indexes
                    const sz = sizes[index % sizes.length];
                    item.setAttribute('data-booth-size', sz);
                }
                if (!item.getAttribute('data-budget')) {
                    const bg = budgets[index % budgets.length];
                    item.setAttribute('data-budget', bg);
                }
                if (!item.getAttribute('data-year')) {
                    const yr = years[index % years.length];
                    item.setAttribute('data-year', yr);
                }
            });
        }

        // Apply filters
        function applyFilters() {
            const indVal = filterIndustry ? filterIndustry.value : 'all';
            const szVal = filterSize ? filterSize.value : 'all';
            const bgVal = filterBudget ? filterBudget.value : 'all';
            const yrVal = filterYear ? filterYear.value : 'all';

            let visibleCount = 0;

            galleryItems.forEach(item => {
                const itemCat = item.getAttribute('data-category');
                const itemInd = item.getAttribute('data-industry');
                const itemSize = item.getAttribute('data-booth-size');
                const itemBg = item.getAttribute('data-budget');
                const itemYr = item.getAttribute('data-year');

                const matchesCategory = (activeCategory === 'all' || itemCat === activeCategory);
                const matchesIndustry = (indVal === 'all' || itemInd === indVal);
                const matchesSize = (szVal === 'all' || itemSize === szVal);
                const matchesBudget = (bgVal === 'all' || itemBg === bgVal);
                const matchesYear = (yrVal === 'all' || itemYr === yrVal);

                const isVisible = matchesCategory && matchesIndustry && matchesSize && matchesBudget && matchesYear;

                if (isVisible) {
                    if (item.classList.contains('hidden')) {
                        item.classList.remove('hidden');
                        // Smooth transition in
                        if (typeof gsap !== 'undefined') {
                            gsap.fromTo(item, 
                                { opacity: 0, scale: 0.9 },
                                { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
                            );
                        }
                    }
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Update UI count
            if (resultCount) {
                if (visibleCount === galleryItems.length) {
                    resultCount.textContent = `Showing all ${galleryItems.length} projects`;
                } else {
                    resultCount.textContent = `Showing ${visibleCount} of ${galleryItems.length} matching projects`;
                }
            }

            // Show empty state if none visible
            if (noResultsMessage) {
                if (visibleCount === 0) {
                    noResultsMessage.classList.add('visible');
                } else {
                    noResultsMessage.classList.remove('visible');
                }
            }

            // Update shareable URL query string
            updateURLParams(indVal, szVal, bgVal, yrVal);
        }

        // Shareable URL Parameters
        function updateURLParams(industry, size, budget, year) {
            try {
                const url = new URL(window.location.href);
                
                if (industry !== 'all') url.searchParams.set('industry', industry);
                else url.searchParams.delete('industry');

                if (size !== 'all') url.searchParams.set('size', size);
                else url.searchParams.delete('size');

                if (budget !== 'all') url.searchParams.set('budget', budget);
                else url.searchParams.delete('budget');

                if (year !== 'all') url.searchParams.set('year', year);
                else url.searchParams.delete('year');

                if (activeCategory !== 'all') url.searchParams.set('category', activeCategory);
                else url.searchParams.delete('category');

                window.history.replaceState({}, '', url.toString());
            } catch (e) { /* silent */ }
        }

        function loadURLParams() {
            try {
                const params = new URLSearchParams(window.location.search);
                
                const industry = params.get('industry');
                const size = params.get('size');
                const budget = params.get('budget');
                const year = params.get('year');
                const category = params.get('category');

                if (industry && filterIndustry) filterIndustry.value = industry;
                if (size && filterSize) filterSize.value = size;
                if (budget && filterBudget) filterBudget.value = budget;
                if (year && filterYear) filterYear.value = year;

                if (category) {
                    activeCategory = category;
                    categoryButtons.forEach(btn => {
                        const isMatch = btn.getAttribute('data-filter') === category;
                        btn.classList.toggle('active', isMatch);
                    });
                }
            } catch (e) { /* silent */ }
        }

        // Reset
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                if (filterIndustry) filterIndustry.value = 'all';
                if (filterSize) filterSize.value = 'all';
                if (filterBudget) filterBudget.value = 'all';
                if (filterYear) filterYear.value = 'all';

                // reset category
                activeCategory = 'all';
                categoryButtons.forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
                });

                applyFilters();
            });
        }

        // Category Tab buttons (override existing onclick behavior gracefully)
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                categoryButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-filter');
                applyFilters();
                e.stopImmediatePropagation(); // prevent default script.js execution
            });
        });

        // Dropdown changes
        [filterIndustry, filterSize, filterBudget, filterYear].forEach(el => {
            if (el) el.addEventListener('change', applyFilters);
        });

        // Initialize metadata & load state
        enrichItemMetadata();
        loadURLParams();
        applyFilters();
    });
})();
