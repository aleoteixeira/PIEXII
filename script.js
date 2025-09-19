// Calculadora de Resíduos
function calculateWaste() {
    // Obter valores do formulário
    const bovinos = parseInt(document.getElementById('bovinos').value) || 0;
    const suinos = parseInt(document.getElementById('suinos').value) || 0;
    const aves = parseInt(document.getElementById('aves').value) || 0;
    const area = parseFloat(document.getElementById('area').value) || 0;
    const cultivo = document.getElementById('cultivo').value;

    // Fatores de produção de resíduos (kg/dia por animal)
    const fatoresResiduos = {
        bovinos: 35, // kg/dia por bovino
        suinos: 4,   // kg/dia por suíno
        aves: 0.15   // kg/dia por ave
    };

    // Fatores de produção de biogás (m³/kg de resíduo)
    const fatoresBiogas = {
        bovinos: 0.04, // m³ de biogás por kg de dejeto bovino
        suinos: 0.06,  // m³ de biogás por kg de dejeto suíno
        aves: 0.08     // m³ de biogás por kg de dejeto de aves
    };

    // Calcular resíduos diários
    const residuosBovinos = bovinos * fatoresResiduos.bovinos;
    const residuosSuinos = suinos * fatoresResiduos.suinos;
    const residuosAves = aves * fatoresResiduos.aves;
    const totalResiduosDiarios = residuosBovinos + residuosSuinos + residuosAves;

    // Calcular resíduos anuais
    const totalResiduosAnuais = totalResiduosDiarios * 365;

    // Calcular potencial de biogás diário
    const biogasBovinos = residuosBovinos * fatoresBiogas.bovinos;
    const biogasSuinos = residuosSuinos * fatoresBiogas.suinos;
    const biogasAves = residuosAves * fatoresBiogas.aves;
    const totalBiogasDiario = biogasBovinos + biogasSuinos + biogasAves;

    // Calcular potencial de biogás anual
    const totalBiogasAnual = totalBiogasDiario * 365;

    // Gerar sugestões de manejo
    const sugestoes = gerarSugestoes(bovinos, suinos, aves, area, cultivo, totalResiduosDiarios);

    // Exibir resultados
    exibirResultados(totalResiduosDiarios, totalResiduosAnuais, totalBiogasDiario, totalBiogasAnual, sugestoes);
}

function gerarSugestoes(bovinos, suinos, aves, area, cultivo, totalResiduos) {
    const sugestoes = [];

    if (totalResiduos > 0) {
        // Sugestões baseadas na quantidade de resíduos
        if (totalResiduos < 100) {
            sugestoes.push("Compostagem simples: Ideal para pequenas quantidades de resíduos orgânicos");
            sugestoes.push("Adubação orgânica direta: Aplicação controlada nos cultivos");
        } else if (totalResiduos < 500) {
            sugestoes.push("Biodigestor de pequeno porte: Produção de biogás para uso doméstico");
            sugestoes.push("Sistema de compostagem em leiras: Processamento em maior escala");
        } else {
            sugestoes.push("Biodigestor de grande porte: Potencial para geração de energia elétrica");
            sugestoes.push("Central de compostagem: Processamento industrial dos resíduos");
        }

        // Sugestões específicas por tipo de animal
        if (bovinos > 0) {
            sugestoes.push("Manejo de dejetos bovinos: Separação de sólidos e líquidos para melhor aproveitamento");
        }
        if (suinos > 0) {
            sugestoes.push("Tratamento de dejetos suínos: Sistema de lagoas de decantação e biodigestão");
        }
        if (aves > 0) {
            sugestoes.push("Aproveitamento da cama de frango: Excelente fertilizante orgânico após compostagem");
        }

        // Sugestões baseadas na área cultivada
        if (area > 0) {
            const residuoPorHectare = totalResiduos / area;
            if (residuoPorHectare > 50) {
                sugestoes.push("Atenção: Alta concentração de resíduos por hectare. Considere distribuição em área maior");
            } else {
                sugestoes.push("Distribuição adequada: Quantidade de resíduos compatível com a área cultivada");
            }
        }

        // Sugestões baseadas no tipo de cultivo
        if (cultivo) {
            switch (cultivo) {
                case 'milho':
                    sugestoes.push("Cultivo de milho: Resíduos orgânicos são excelentes para este tipo de cultura");
                    break;
                case 'soja':
                    sugestoes.push("Cultivo de soja: Use compostagem bem maturada para evitar excesso de nitrogênio");
                    break;
                case 'pastagem':
                    sugestoes.push("Pastagem: Aplicação direta controlada pode melhorar a qualidade do pasto");
                    break;
                case 'hortalicas':
                    sugestoes.push("Hortaliças: Compostagem é essencial para evitar contaminação");
                    break;
            }
        }
    } else {
        sugestoes.push("Não foram identificados resíduos significativos para processamento");
    }

    return sugestoes;
}

function exibirResultados(residuosDiarios, residuosAnuais, biogasDiario, biogasAnual, sugestoes) {
    const resultsDiv = document.getElementById('results');
    const wasteResults = document.getElementById('waste-results');
    const biogasResults = document.getElementById('biogas-results');
    const managementSuggestions = document.getElementById('management-suggestions');

    // Limpar resultados anteriores
    wasteResults.innerHTML = '';
    biogasResults.innerHTML = '';
    managementSuggestions.innerHTML = '';

    // Exibir resultados de resíduos
    wasteResults.innerHTML = `
        <div class="result-item">
            <h4>Estimativa de Resíduos Orgânicos</h4>
            <p>Produção diária: <span class="result-value">${residuosDiarios.toFixed(1)} kg/dia</span></p>
            <p>Produção anual: <span class="result-value">${(residuosAnuais/1000).toFixed(1)} toneladas/ano</span></p>
        </div>
    `;

    // Exibir resultados de biogás
    biogasResults.innerHTML = `
        <div class="result-item">
            <h4>Potencial de Geração de Biogás</h4>
            <p>Produção diária: <span class="result-value">${biogasDiario.toFixed(1)} m³/dia</span></p>
            <p>Produção anual: <span class="result-value">${biogasAnual.toFixed(0)} m³/ano</span></p>
            <p><small>*Equivalente energético: aproximadamente ${(biogasAnual * 6).toFixed(0)} kWh/ano</small></p>
        </div>
    `;

    // Exibir sugestões de manejo
    const sugestoesHTML = sugestoes.map(sugestao => `<li>${sugestao}</li>`).join('');
    managementSuggestions.innerHTML = `
        <div class="suggestions">
            <h4>Sugestões de Manejo</h4>
            <ul>${sugestoesHTML}</ul>
        </div>
    `;

    // Mostrar a seção de resultados
    resultsDiv.style.display = 'block';
    
    // Scroll suave para os resultados
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Navegação suave
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar navegação suave para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});


