/**
 * data.js - Carregamento e Processamento de Dados
 * 
 * Este arquivo é responsável por carregar os dados do CSV e processá-los
 * para uso nos gráficos e tabelas do dashboard.
 */

let allData = [];
let filteredData = [];

/**
 * Carrega os dados do arquivo CSV
 */
async function loadData() {
    try {
        const response = await fetch('data/data.csv');
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        parseCSV(csvText);
        
        console.log(`✓ Dados carregados com sucesso: ${allData.length} registros`);
        
        // Atualizar estatísticas
        updateStatistics();
        
        // Preencher os filtros
        populateFilters();
        
        // Inicializar dados filtrados
        filteredData = [...allData];
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showErrorMessage('Erro ao carregar os dados do dashboard. Por favor, recarregue a página.');
    }
}

/**
 * Faz o parsing do CSV e converte em array de objetos
 * @param {string} csvText - Conteúdo do arquivo CSV
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    
    if (lines.length === 0) {
        throw new Error('Arquivo CSV vazio');
    }
    
    // Primeira linha é o cabeçalho
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Processar as linhas de dados
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        
        if (values.length !== headers.length) {
            console.warn(`Linha ${i} tem número de colunas diferente do esperado`);
            continue;
        }
        
        const row = {};
        headers.forEach((header, index) => {
            const value = values[index];
            
            // Converter valores numéricos
            if (header === 'DATA') {
                row[header] = new Date(value);
            } else if (header === 'ANO' || header === 'MES') {
                row[header] = parseInt(value, 10);
            } else {
                row[header] = parseFloat(value) || null;
            }
        });
        
        // Validar dados essenciais
        if (row.DATA && !isNaN(row.DATA.getTime()) && row.Gasolina_Preco && row.IPCA_Mensal) {
            allData.push(row);
        }
    }
    
    // Ordenar por data
    allData.sort((a, b) => a.DATA - b.DATA);
}

/**
 * Atualiza as estatísticas no hero section
 */
function updateStatistics() {
    if (allData.length === 0) return;
    
    // Total de pontos de dados
    document.getElementById('totalDataPoints').textContent = allData.length;
    
    // Preço médio da gasolina
    const avgGasolina = allData.reduce((sum, d) => sum + (d.Gasolina_Preco || 0), 0) / allData.length;
    document.getElementById('avgGasolina').textContent = `R$ ${avgGasolina.toFixed(2)}`;
    
    // IPCA acumulado (último valor)
    const lastIPCAAccum = allData[allData.length - 1].IPCA_Acumulado || 0;
    document.getElementById('totalIPCA').textContent = `${lastIPCAAccum.toFixed(2)}%`;
}

/**
 * Preenche os filtros de ano
 */
function populateFilters() {
    const yearFilter = document.getElementById('yearFilter');
    const years = [...new Set(allData.map(d => d.DATA.getFullYear()))].sort((a, b) => a - b);
    
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

/**
 * Filtra os dados com base nos critérios selecionado * @param {number} year - Ano selecionado (0 para todos)
 * @param {number} month - Mês selecionado (0 para todos)
 * @param {string} dataType - Tipo de dados ('all', 'historical', 'projection')
 */
function filterData(year = 0, month = 0, dataType = 'all') {    filteredData = allData.filter(d => {
// Filtrar por ano
if (year && d.DATA.getFullYear() !== year) return false;
        
        // Lógica de filtragem por mês:
// Se um mês específico foi selecionado, filtra por ele.
if (month > 0 && (d.DATA.getMonth() + 1) !== month) return false;

// Se o ano está selecionado e o mês é "Todos os Meses" (month === 0),
// não aplicamos filtro de mês, pois queremos todos os meses daquele ano.
// A lógica acima já garante que isso aconteça. Vou adicionar um comentário para clareza.
        
        // Filtrar por tipo de dadosde dados
        // Dados históricos: até outubro de 2025
        // Dados de projeção: a partir de novembro de 2025 (MES >= 11)
        if (dataType === 'historical') {
            return d.ANO < 2025 || (d.ANO === 2025 && d.MES < 11);
        } else if (dataType === 'projection') {
            return d.ANO > 2025 || (d.ANO === 2025 && d.MES >= 11);
        }
        
        return true;
    });
    
    console.log(`✓ Dados filtrados: ${filteredData.length} registros`);
}

/**
 * Obtém os dados filtrados
 * @returns {array} Array de dados filtrados
 */
function getFilteredData() {
    return filteredData;
}

/**
 * Obtém todos os dados
 * @returns {array} Array de todos os dados
 */
function getAllData() {
    return allData;
}

/**
 * Reseta os filtros
 */
function resetFilters() {

    document.getElementById('dataTypeFilter').value = 'all';
    
    filteredData = [...allData];
    console.log('✓ Filtros resetados');
}

/**
 * Exibe mensagem de erro
 * @param {string} message - Mensagem de erro
 */
function showErrorMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container-fluid') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
}

/**
 * Carrega os dados quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    loadData();
});