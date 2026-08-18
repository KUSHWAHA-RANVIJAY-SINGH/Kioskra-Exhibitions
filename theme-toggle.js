// =============================================================
// KIOSKRA THEME TOGGLE — Handles theme switching + persistence
// =============================================================
(function() {
    'use strict';

    /**
     * Get the current active theme.
     * @returns {'colorful'|'monochrome'}
     */
    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') === 'monochrome'
            ? 'monochrome'
            : 'colorful';
    }

    /**
     * Apply a theme to the document.
     * @param {'colorful'|'monochrome'} theme
     */
    function applyTheme(theme) {
        if (theme === 'monochrome') {
            document.documentElement.setAttribute('data-theme', 'monochrome');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        // Persist preference
        try {
            localStorage.setItem('kioskra-theme', theme);
        } catch (e) {
            // localStorage unavailable
        }
        updateAllToggles(theme);
    }

    /**
     * Update all toggle buttons on the page to reflect the current theme.
     * @param {'colorful'|'monochrome'} theme
     */
    function updateAllToggles(theme) {
        var toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach(function(toggle) {
            var isMono = theme === 'monochrome';
            toggle.setAttribute('aria-label',
                isMono ? 'Switch to colorful theme' : 'Switch to monochrome theme'
            );
            toggle.setAttribute('title',
                isMono ? 'Switch to colorful theme' : 'Switch to monochrome theme'
            );
            // Toggle the active class for visual state
            if (isMono) {
                toggle.classList.add('theme-toggle--mono');
            } else {
                toggle.classList.remove('theme-toggle--mono');
            }
        });
    }

    /**
     * Toggle between themes.
     */
    function toggleTheme() {
        var current = getCurrentTheme();
        var next = current === 'colorful' ? 'monochrome' : 'colorful';
        applyTheme(next);

        // Dispatch custom event so other scripts (canvas, SVG) can react
        window.dispatchEvent(new CustomEvent('kioskra-theme-change', {
            detail: { theme: next }
        }));
    }

    /**
     * Initialize toggle buttons.
     */
    function init() {
        var toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
            });

            // Keyboard accessibility
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        });

        // Set initial state of toggles
        updateAllToggles(getCurrentTheme());
    }

    // Run on DOMContentLoaded or immediately if DOM already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
