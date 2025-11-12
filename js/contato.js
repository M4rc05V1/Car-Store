// Exemplo da lógica jQuery
const menuToggle = $('#menu-toggle');
const navLinks = $('.nav-links');

menuToggle.on('click', function() {
    navLinks.toggleClass('open');
    $('body').toggleClass('no-scroll'); 
});
