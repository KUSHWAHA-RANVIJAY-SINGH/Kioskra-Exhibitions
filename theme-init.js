// =============================================================
// KIOSKRA THEME INIT — Runs before DOM paint to prevent FOUC
// Place this script in <head> after the CSS <link>
// =============================================================
(function() {
    'use strict';
    try {
        var saved = localStorage.getItem('kioskra-theme');
        var theme = 'dark'; // Default premium theme for Kioskra

        if (saved === 'light' || saved === 'dark') {
            theme = saved;
        } else if (saved === 'monochrome') {
            theme = 'light';
        } else if (saved === 'colorful') {
            theme = 'dark';
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            theme = 'light';
        }

        document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
        // Fallback if localStorage or matchMedia is restricted
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();
