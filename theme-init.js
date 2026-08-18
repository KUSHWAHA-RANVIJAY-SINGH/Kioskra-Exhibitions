// =============================================================
// KIOSKRA THEME INIT — Runs before DOM paint to prevent FOUC
// Place this script in <head> after the CSS <link>
// =============================================================
(function() {
    'use strict';
    var saved = null;
    try {
        saved = localStorage.getItem('kioskra-theme');
    } catch (e) {
        // localStorage unavailable (private browsing, etc.)
    }
    // Default is colorful — only apply attribute if monochrome
    if (saved === 'monochrome') {
        document.documentElement.setAttribute('data-theme', 'monochrome');
    }
})();
