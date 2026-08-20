// =============================================================
// KIOSKRA THEME TOGGLE — Handles Dark/Light Mode Switching & Persistence
// =============================================================
(function() {
    'use strict';

    /**
     * Get the current active theme.
     * @returns {'dark'|'light'}
     */
    function getCurrentTheme() {
        var current = document.documentElement.getAttribute('data-theme');
        if (current === 'light') return 'light';
        return 'dark'; // default
    }

    /**
     * Apply a theme to the document and persist.
     * @param {'dark'|'light'} theme
     */
    function applyTheme(theme) {
        var activeTheme = theme === 'light' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', activeTheme);
        
        // Persist preference
        try {
            localStorage.setItem('kioskra-theme', activeTheme);
        } catch (e) {
            // localStorage unavailable (e.g. private browsing)
        }
        
        updateAllToggles(activeTheme);

        // Dispatch custom event for canvas/SVG interactive tools
        window.dispatchEvent(new CustomEvent('kioskra-theme-change', {
            detail: { theme: activeTheme }
        }));
    }

    /**
     * Update all toggle buttons on the page to reflect current theme.
     * @param {'dark'|'light'} theme
     */
    function updateAllToggles(theme) {
        var isDark = theme === 'dark';
        var toggles = document.querySelectorAll('.theme-toggle');
        
        toggles.forEach(function(toggle) {
            var label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            toggle.setAttribute('aria-label', label);
            toggle.setAttribute('title', label);
            
            if (isDark) {
                toggle.classList.add('theme-toggle--dark');
                toggle.classList.remove('theme-toggle--light');
            } else {
                toggle.classList.add('theme-toggle--light');
                toggle.classList.remove('theme-toggle--dark');
            }
        });
    }

    /**
     * Toggle between dark and light themes.
     */
    function toggleTheme() {
        var current = getCurrentTheme();
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    }

    /**
     * Initialize theme listeners.
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

        // Sync with OS preference changes if user hasn't explicitly set preference
        if (window.matchMedia) {
            var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function(e) {
                var hasManualPref = false;
                try {
                    hasManualPref = !!localStorage.getItem('kioskra-theme');
                } catch (err) {}
                
                if (!hasManualPref) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }

        // Set initial toggle states
        updateAllToggles(getCurrentTheme());
    }

    // Run on DOMContentLoaded or immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
