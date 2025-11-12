document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            // Alterna a classe 'open' para mostrar/esconder o menu (CSS)
            navLinks.classList.toggle('open');
            // Alterna a classe 'no-scroll' para bloquear a rolagem do fundo (CSS)
            body.classList.toggle('no-scroll');
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                body.classList.remove('no-scroll');
            });
        });
    }
    
    const logo = document.querySelector('a.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            // e.preventDefault(); // Com a tag <a>, o preventDefault não é necessário
            window.location.href = 'index.html';
        });
    }
});