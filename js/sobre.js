const menuToggle = $('#menu-toggle');
const navLinks = $('.nav-links');

menuToggle.on('click', function() {
    navLinks.toggleClass('open'); // Adiciona/remove .open para mostrar/esconder
    $('body').toggleClass('no-scroll');
});
