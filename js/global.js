/* js/global.js — Lógica compartilhada entre todas as páginas */

document.addEventListener('DOMContentLoaded', function () {

    /* ── Menu hamburguer ─────────────────────── */
    const toggle   = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body     = document.body;

    if (toggle && navLinks) {

        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            body.classList.toggle('no-scroll');
        });

        /* Fechar ao clicar em um link */
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                body.classList.remove('no-scroll');
            });
        });

        /* Fechar ao clicar fora do menu */
        document.addEventListener('click', e => {
            if (
                navLinks.classList.contains('open') &&
                !toggle.contains(e.target) &&
                !navLinks.contains(e.target)
            ) {
                navLinks.classList.remove('open');
                body.classList.remove('no-scroll');
            }
        });
    }

    /* ── Logo → index ────────────────────────── */
    const logo = document.querySelector('a.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

});