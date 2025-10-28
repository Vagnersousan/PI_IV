/**
 * charts.js - Criação e Gerenciamento de Gráficos
 * 
 * Este arquivo utiliza Chart.js para criar gráficos interativos
 * que visualizam os dados de combustíveis e IPCA.
 */

let charts = {};

/**
 * Inicializa todos os gráficos
 */
function initializeCharts() {
    createGasChart();
    createIPCAMesChart();
    createIPCAAccumChart();
    createCorrelationChart();
}

/**
 * Cria o gráfico de evolução do preço da gasolina
 */
function createGasChart() {
    const ctx = document.getElementById('gasChart');
    if (!ctx) return;
    
    const data = getFilteredData();
    
    const labels = data.map(d => formatDate(d.DATA));
    const prices = data.map(d => d.Gasolina_Preco);
    
    // Destruir gráfico anterior se existir
    if (charts.gasChart) {
        charts.gasChart.destroy();
    }
    
    charts.gasChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Preço da Gasolina (R$)',
                data: prices,
                borderColor: '#009c3b',
                backgroundColor: 'rgba(0, 156, 59, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#009c3b',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                hoverBackgroundColor: '#ffcd00'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: getComputedStyle(document.body).color,
                        font: { size: 12, weight: 'bold' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    callbacks: {
                        label: function(context) {
                            return `R$ ${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        color: getComputedStyle(document.body).color,
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(2);
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        color: getComputedStyle(document.body).color,
                        maxTicksLimit: 10
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Cria o gráfico de IPCA mensal
 */
function createIPCAMesChart() {
    const ctx = document.getElementById('ipcaMesChart');
    if (!ctx) return;
    
    const data = getFilteredData();
    
    const labels = data.map(d => formatDate(d.DATA));
    const ipcaMes = data.map(d => d.IPCA_Mensal);
    
    // Destruir gráfico anterior se existir
    if (charts.ipcaMesChart) {
        charts.ipcaMesChart.destroy();
    }
    
    charts.ipcaMesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'IPCA Mensal (%)',
                data: ipcaMes,
                backgroundColor: ipcaMes.map(value => value > 0 ? '#d13438' : '#107c10'),
                borderColor: ipcaMes.map(value => value > 0 ? '#a01a1e' : '#0a5a0a'),
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: '#ffcd00'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: undefined,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: getComputedStyle(document.body).color,
                        font: { size: 12, weight: 'bold' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: getComputedStyle(document.body).color,
                        callback: function(value) {
                            return value.toFixed(2) + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        color: getComputedStyle(document.body).color,
                        maxTicksLimit: 10
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Cria o gráfico de IPCA acumulado
 */
function createIPCAAccumChart() {
    const ctx = document.getElementById('ipcaAcumChart');
    if (!ctx) return;
    
    const data = getFilteredData();
    
    const labels = data.map(d => formatDate(d.DATA));
    const ipcaAccum = data.map(d => d.IPCA_Acumulado);
    
    // Destruir gráfico anterior se existir
    if (charts.ipcaAcumChart) {
        charts.ipcaAcumChart.destroy();
    }
    
    charts.ipcaAcumChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'IPCA Acumulado (%)',
                data: ipcaAccum,
                borderColor: '#002776',
                backgroundColor: 'rgba(0, 39, 118, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#002776',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                hoverBackgroundColor: '#ffcd00'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: getComputedStyle(document.body).color,
                        font: { size: 12, weight: 'bold' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: getComputedStyle(document.body).color,
                        callback: function(value) {
                            return value.toFixed(2) + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        color: getComputedStyle(document.body).color,
                        maxTicksLimit: 10
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Cria o gráfico de correlação entre Gasolina e IPCA
 */
function createCorrelationChart() {
    const ctx = document.getElementById('correlationChart');
    if (!ctx) return;
    
    const data = getFilteredData();
    
    const labels = data.map(d => formatDate(d.DATA));
    const gasolina = data.map(d => d.Gasolina_Preco);
    const ipcaMes = data.map(d => d.IPCA_Mensal);
    
    // Normalizar os dados para melhor visualização
    const maxGasolina = Math.max(...gasolina);
    const maxIPCA = Math.max(...ipcaMes);
    
    const gasolinaNorm = gasolina.map(g => (g / maxGasolina) * 100);
    const ipcaNorm = ipcaMes.map(i => (i / maxIPCA) * 100);
    
    // Destruir gráfico anterior se existir
    if (charts.correlationChart) {
        charts.correlationChart.destroy();
    }
    
    charts.correlationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Gasolina (Normalizado)',
                    data: gasolinaNorm,
                    borderColor: '#009c3b',
                    backgroundColor: 'rgba(0, 156, 59, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 2,
                    pointBackgroundColor: '#009c3b',
                    yAxisID: 'y'
                },
                {
                    label: 'IPCA Mensal (Normalizado)',
                    data: ipcaNorm,
                    borderColor: '#d13438',
                    backgroundColor: 'rgba(209, 52, 56, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 2,
                    pointBackgroundColor: '#d13438',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: getComputedStyle(document.body).color,
                        font: { size: 12, weight: 'bold' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#009c3b',
                        callback: function(value) {
                            return value.toFixed(0);
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#d13438',
                        callback: function(value) {
                            return value.toFixed(0);
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                x: {
                    ticks: {
                        color: getComputedStyle(document.body).color,
                        maxTicksLimit: 10
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Atualiza todos os gráficos
 */
function updateAllCharts() {
    createGasChart();
    createIPCAMesChart();
    createIPCAAccumChart();
    createCorrelationChart();
    updateDataTable();
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
 * Inicializa os gráficos quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que os dados foram carregados
    setTimeout(initializeCharts, 500);
});
