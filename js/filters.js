/**
 * filters.js - Gerenciamento de Filtros
 * 
 * Este arquivo gerencia os filtros de ano, mês e tipo de dados,
 * atualizando os gráficos e a tabela quando os filtros mudam.
 */

document.addEventListener('DOMContentLoaded', function() {
    const yearFilter = document.getElementById('yearFilter');
    const monthFilter = document.getElementById('monthFilter');

    const dataTypeFilter = document.getElementById('dataTypeFilter');
    const resetButton = document.getElementById('resetFilters');
    
    // Adicionar eventos aos filtros
    yearFilter.addEventListener('change', applyFilters);
    monthFilter.addEventListener('change', applyFilters);

    dataTypeFilter.addEventListener('change', applyFilters);
    resetButton.addEventListener('click', handleResetFilters);
});

/**
 * Aplica os filtros selecionados
 */
function applyFilters() {
    const year = parseInt(document.getElementById('yearFilter').value) || 0;
    const monthValue = document.getElementById('monthFilter').value;
    const month = monthValue === '' ? 0 : parseInt(monthValue);
    const dataType = document.getElementById('dataTypeFilter').value || 'all';
    
    // Filtrar os dados
    filterData(year, month, dataType);
    
    // Atualizar os gráficos e tabela
    updateAllCharts();
    
    console.log(`✓ Filtros aplicados: Ano=${year || 'Todos'}, Mês=${month || 'Todos'}, Tipo=${dataType}`);
}

/**
 * Reseta os filtros
 */
function handleResetFilters() {
    resetFilters();
    
    // Resetar os valores dos inputs
    document.getElementById('yearFilter').value = '';

    document.getElementById('monthFilter').value = '';
    document.getElementById('dataTypeFilter').value = 'all';
    
    // Atualizar os gráficos
    updateAllCharts();
    
    console.log('✓ Filtros resetados');
}

/**
 * Atualiza a tabela de dados
 */
function updateDataTable() {
    const tableBody = document.getElementById('tableBody');
    const data = getFilteredData();
    
    // Limpar a tabela
    tableBody.innerHTML = '';
    
    // Preencher a tabela com os dados filtrados
    data.forEach(row => {
        const tr = document.createElement('tr');
        
        // Determinar o tipo de dado (histórico ou projeção)
        let dataType = 'Histórico';
        if (row.ANO > 2025 || (row.ANO === 2025 && row.MES >= 11)) {
            dataType = 'Projeção';
        }
        
        tr.innerHTML = `
            <td>${formatDate(row.DATA)}</td>
            <td>R$ ${row.Gasolina_Preco.toFixed(2)}</td>
            <td>${row.IPCA_Mensal.toFixed(2)}%</td>
            <td>${row.IPCA_Acumulado.toFixed(2)}%</td>
            <td>${row.LAG_0 !== null ? row.LAG_0.toFixed(4) : '-'}</td>
            <td><span class="badge ${dataType === 'Histórico' ? 'bg-success' : 'bg-warning'}">${dataType}</span></td>
        `;
        
        tableBody.appendChild(tr);
    });
    
    // Se não houver dados, exibir mensagem
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    <i class="fas fa-info-circle"></i> Nenhum dado encontrado com os filtros selecionados.
                </td>
            </tr>
        `;
    }
}

/**
 * Formata a data para exibição
 * @param {Date} date - Data a ser formatada
 * @returns {string} Data formatada (MM/YYYY)
 */
function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
}

/**
 * Atualiza a tabela quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateDataTable, 1000);
});