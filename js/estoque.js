/* js/estoque.js — Filtro de veículos */

$(document).ready(function () {

    /* ── Máscara de preço ──────────────────── */
    $('#precoMin, #precoMax').mask('R$ 000.000.000.000.000,00', { reverse: true });

    /* ── Utilitário: converte valor mascarado para centavos ── */
    const limparMask = (val) => {
        if (!val) return 0;
        const limpo = val.replace('R$', '').replace(/\./g, '').trim().replace(',', '.');
        return Math.round(parseFloat(limpo) * 100);
    };

    /* ── Filtro ───────────────────────────── */
    const veiculos = $('.veiculo');

    $('#filtroForm').on('submit', function (e) {
        e.preventDefault();

        const marca    = $('#marca').val().toLowerCase();
        const ano      = $('#ano').val();
        const precoMin = limparMask($('#precoMin').val());
        const precoMax = limparMask($('#precoMax').val());

        let visiveis = 0;

        veiculos.each(function () {
            const el     = $(this);
            const titulo = el.find('h3').text().toLowerCase();
            const preco  = limparMask(el.find('p').text());

            let mostra = true;

            if (marca    && !titulo.includes(marca))               mostra = false;
            if (ano      && !titulo.includes(ano))                  mostra = false;
            if (precoMin > 0 && preco < precoMin)                   mostra = false;
            if (precoMax > 0 && preco > precoMax)                   mostra = false;

            el.css('display', mostra ? '' : 'none');
            if (mostra) visiveis++;
        });

        const aviso = $('#aviso-filtro');
        if (visiveis === 0) {
            aviso.text('Nenhum veículo encontrado com os filtros selecionados.').show();
        } else {
            aviso.hide();
        }
    });

});