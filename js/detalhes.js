function getVeiculoIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    // Retorna o valor de 'id' como número. Se não encontrar, retorna null.
    return parseInt(urlParams.get('id'));
}

// Função para manipular a galeria de imagens
function configurarGaleria(veiculo) {
    const imgPrincipal = document.querySelector('.imagem-principal');
    const miniaturasContainer = document.querySelector('.miniaturas');

    // Inicializa com a primeira imagem
    imgPrincipal.src = veiculo.imagens[0];
    
    miniaturasContainer.innerHTML = ''; // Limpa miniaturas existentes

    veiculo.imagens.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Miniatura do ${veiculo.titulo}`;
        
        // Adiciona evento de clique para trocar a imagem principal
        img.addEventListener('click', () => {
            imgPrincipal.src = url;
            
            // Remove borda de seleção das outras miniaturas
            document.querySelectorAll('.miniaturas img').forEach(i => i.style.borderColor = 'transparent');
            // Adiciona borda de seleção à miniatura clicada
            img.style.borderColor = 'var(--color-accent)'; 
        });
        miniaturasContainer.appendChild(img);
    });
    
    // Adiciona a borda de seleção à primeira miniatura ao carregar
    if(miniaturasContainer.firstChild) {
        miniaturasContainer.firstChild.style.borderColor = 'var(--color-accent)';
    }
}

// Função principal para carregar os detalhes do veículo
function carregarDetalhesVeiculo() {
    const id = getVeiculoIdFromUrl();
    const veiculo = VEICULOS_DETALHES.find(v => v.id === id); // Busca o carro pelo ID

    if (!veiculo) {
        // Tratar caso o carro não seja encontrado (ex: redirecionar para o estoque)
        document.querySelector('.detalhes-header h1').textContent = "Veículo não encontrado.";
        document.querySelector('.detalhes-container').innerHTML = '<p style="text-align:center;">Desculpe, este veículo não está mais em nosso estoque ou o link está incorreto.</p>';
        return;
    }

    document.querySelector('.detalhes-header h1').textContent = veiculo.titulo;
    document.querySelector('.preco-final').textContent = `R$ ${veiculo.preco.replace('.', ',')}`;

    document.querySelector('.bloco-info-rapida').innerHTML = `
        <p>Ano: ${veiculo.ano}</p>
        <p>KM: ${veiculo.km}</p>
        <p>Transmissão: ${veiculo.transmissao}</p>
    `;

    document.querySelector('.especificacoes-lista').innerHTML = `
        <li><span>Motorização:</span> ${veiculo.motorizacao}</li>
        <li><span>Potência (cv):</span> ${veiculo.potencia}</li>
        <li><span>Câmbio:</span> ${veiculo.cambio}</li>
        <li><span>Direção:</span> ${veiculo.direcao}</li>
        <li><span>Cor:</span> ${veiculo.cor}</li>
        <li><span>Final da Placa:</span> ${veiculo.placa_final}</li>
    `;

    configurarGaleria(veiculo);
}

document.addEventListener('DOMContentLoaded', carregarDetalhesVeiculo);