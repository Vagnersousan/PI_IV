/**
 * main.js - Arquivo Principal de Inicialização
 * 
 * Este arquivo coordena a inicialização de todos os módulos
 * e gerencia eventos globais do dashboard.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Dashboard IPCA & Combustíveis...');
    
    // Inicializar tema
    console.log('📱 Tema carregado');
    
    // Aguardar carregamento dos dados
    setTimeout(() => {
        console.log('📊 Dashboard pronto para uso');
        
        // Mostrar mensagem de boas-vindas no console
        console.log('%c🇧🇷 Bem-vindo ao Dashboard IPCA & Combustíveis!', 'color: #009c3b; font-size: 16px; font-weight: bold;');
        console.log('%cProjeto Integrador IV - UNIVESP', 'color: #002776; font-size: 12px;');
    }, 1500);
    
    // Adicionar suporte para impressão
    setupPrintSupport();
    
    // Adicionar suporte para compartilhamento
    setupShareSupport();
});

/**
 * Configura suporte para impressão
 */
function setupPrintSupport() {
    // Adicionar atalho de impressão
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });
}

/**
 * Configura suporte para compartilhamento
 */
function setupShareSupport() {
    // Verificar se a API de compartilhamento está disponível
    if (navigator.share) {
        // Adicionar botão de compartilhamento (opcional)
        console.log('✓ API de compartilhamento disponível');
    }
}

/**
 * Função auxiliar para debug
 */
function logDashboardInfo() {
    console.group('📊 Informações do Dashboard');
    console.log('Total de registros:', getAllData().length);
    console.log('Registros filtrados:', getFilteredData().length);
    console.log('Período de dados:', 
        new Date(getAllData()[0]?.DATA).toLocaleDateString('pt-BR'),
        'até',
        new Date(getAllData()[getAllData().length - 1]?.DATA).toLocaleDateString('pt-BR')
    );
    console.groupEnd();
}

// Disponibilizar função de debug no console
window.logDashboardInfo = logDashboardInfo;

/**
 * Tratamento de erros global
 */
window.addEventListener('error', function(event) {
    console.error('❌ Erro:', event.error);
});

/**
 * Tratamento de erros de promessas não capturadas
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('❌ Erro não tratado:', event.reason);
});

/**
 * Monitorar mudanças de tema
 */
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            const isDarkTheme = document.body.classList.contains('dark-theme');
            console.log(`🌙 Tema alterado para: ${isDarkTheme ? 'Escuro' : 'Claro'}`);
            
            // Atualizar cores dos gráficos
            setTimeout(updateAllCharts, 100);
        }
    });
});

observer.observe(document.body, { attributes: true });

/**
 * Detectar conexão com a internet
 */
window.addEventListener('online', function() {
    console.log('✓ Conexão com a internet restaurada');
    showNotification('Conexão restaurada!', 'success');
});

window.addEventListener('offline', function() {
    console.log('❌ Conexão com a internet perdida');
    showNotification('Você está offline. Alguns recursos podem não estar disponíveis.', 'warning');
});

/**
 * Exibe uma notificação na tela
 * @param {string} message - Mensagem a exibir
 * @param {string} type - Tipo de notificação (success, warning, error, info)
 */
function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 80px; right: 20px; z-index: 9999; max-width: 400px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Disponibilizar função de notificação no console
window.showNotification = showNotification;

/**
 * Função para exportar dados em CSV
 */
function exportDataAsCSV() {
    const data = getFilteredData();
    
    if (data.length === 0) {
        alert('Nenhum dado para exportar');
        return;
    }
    
    // Criar cabeçalho
    const headers = ['Data', 'Preço Gasolina (R$)', 'IPCA Mensal (%)', 'IPCA Acumulado (%)', 'Variação Gasolina (%)'];
    
    // Criar linhas
    const rows = data.map(d => [
        formatDateForCSV(d.DATA),
        d.Gasolina_Preco.toFixed(2),
        d.IPCA_Mensal.toFixed(2),
        d.IPCA_Acumulado.toFixed(2),
        d.LAG_0 !== null ? (d.LAG_0 * 100).toFixed(2) : '-'
    ]);
    
    // Combinar cabeçalho e linhas
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    
    // Criar blob e download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `dados_ipca_combustiveis_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('✓ Dados exportados com sucesso');
}

/**
 * Formata a data para CSV
 * @param {Date} date - Data a ser formatada
 * @returns {string} Data formatada (DD/MM/YYYY)
 */
function formatDateForCSV(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Disponibilizar função de exportação no console
window.exportDataAsCSV = exportDataAsCSV;

console.log('%c💡 Dica: Use exportDataAsCSV() para exportar os dados em CSV', 'color: #0078d4; font-size: 12px;');
console.log('%c💡 Dica: Use logDashboardInfo() para ver informações do dashboard', 'color: #0078d4; font-size: 12px;');
