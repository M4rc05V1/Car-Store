const formFiltro = document.getElementById('filtroForm');
const veiculosGrid = document.getElementById('veiculosGrid');
const veiculos = Array.from(veiculosGrid.getElementsByClassName('veiculo'));

formFiltro.addEventListener('submit', (e) => {
  e.preventDefault();
  const marca = document.getElementById('marca').value.toLowerCase();
  const ano   = document.getElementById('ano').value;
  const precoMax = document.getElementById('precoMax').value;

  veiculos.forEach(veiculo => {
    const titulo = veiculo.querySelector('h3').innerText.toLowerCase();
    const precoText = veiculo.querySelector('p').innerText.replace(/[^\d]/g, '');
    const preco = parseInt(precoText);

    let mostra = true;
    if (marca && !titulo.includes(marca)) mostra = false;
    if (ano && !titulo.includes(ano)) mostra = false;
    if (precoMax && preco > parseInt(precoMax)) mostra = false;

    veiculo.style.display = mostra ? '' : 'none';
  });
});
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão de toggle (☰) e a lista de links (menu lateral)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // 1. Adiciona ou remove a classe 'open' na lista de links.
            // Esta classe ativa a transição CSS que move o menu para a tela.
            navLinks.classList.toggle('open');
            
            // 2. Adiciona ou remove a classe 'no-scroll' no <body>.
            // Isso impede que o usuário role o conteúdo da página enquanto o menu está aberto.
            document.body.classList.toggle('no-scroll');
        });
        
        // Opcional, mas útil: Fechar o menu se clicar fora dele em telas mobile
        document.addEventListener('click', (event) => {
            // Se o clique não foi no toggle E o menu está aberto E o clique não foi dentro do menu
            if (!menuToggle.contains(event.target) && navLinks.classList.contains('open') && !navLinks.contains(event.target)) {
                navLinks.classList.remove('open');
                document.body.classList.remove('no-scroll');
            }
        });
    }
});
// Seu arquivo: estoque.js

$(document).ready(function(){
    
    $('#precoMin, #precoMax').mask('R$ 000.000.000.000.000,00', {reverse: true});

    

    const limparMask = (val) => {
        if (!val) return 0;
        
        // Remove R$, pontos de milhar, e substitui vírgula por ponto (para float)
        let limpo = val.replace('R$', '').replace(/\./g, '').trim(); 
        limpo = limpo.replace(',', '.');
        
        // Converte para float, multiplica por 100 (para centavos) e retorna inteiro.
        return Math.round(parseFloat(limpo) * 100); 
    };

    const menuToggle = $('#menu-toggle');
    const navLinks = $('.nav-links');

    menuToggle.on('click', function() {
        navLinks.toggleClass('open');
        $('body').toggleClass('no-scroll');
    });

    // Fechar o menu se clicar fora (Adaptado para jQuery)
    $(document).on('click', function(event) {
        if (!menuToggle.is(event.target) && navLinks.hasClass('open') && !navLinks.is(event.target) && navLinks.has(event.target).length === 0) {
            navLinks.removeClass('open');
            $('body').removeClass('no-scroll');
        }
    });

    const formFiltro = $('#filtroForm');
    const veiculosGrid = $('#veiculosGrid');
    const veiculos = $('.veiculo'); 

    formFiltro.on('submit', (e) => {
        e.preventDefault();
        
        const marca = $('#marca').val().toLowerCase();
        const ano = $('#ano').val();
        
        // UTILIZA A FUNÇÃO LIMPARMASK PARA OBTER VALORES CORRETOS EM CENTAVOS
        const precoMin = limparMask($('#precoMin').val());
        const precoMax = limparMask($('#precoMax').val());

        veiculos.each(function() {
            const veiculo = $(this);
            const titulo = veiculo.find('h3').text().toLowerCase();
            
            // UTILIZA A FUNÇÃO LIMPARMASK PARA OBTER O PREÇO DO CARD EM CENTAVOS
            const precoText = veiculo.find('p').text();
            const preco = limparMask(precoText); // Preço do card em centavos

            let mostra = true;
            
            if (marca && !titulo.includes(marca)) mostra = false;
            if (ano && !titulo.includes(ano)) mostra = false;

            // PREÇO MÍNIMO: Se o filtro for maior que zero E o preço do carro for menor que o filtro
            if (precoMin > 0 && preco < precoMin) mostra = false;

            // PREÇO MÁXIMO: Se o filtro for maior que zero E o preço do carro for maior que o filtro
            if (precoMax > 0 && preco > precoMax) mostra = false;
            
            
            veiculo.css('display', mostra ? '' : 'none');
        });
    });
});