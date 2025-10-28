/**
 * theme.js - Gerenciamento de Tema (Dia/Noite)
 * 
 * Este arquivo gerencia a alternância entre o tema claro e escuro,
 * armazenando a preferência do usuário no localStorage.
 */

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const body = document.body;
    
    // Recuperar a preferência de tema do localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar o tema salvo
    applyTheme(savedTheme);
    
    // Adicionar evento de clique ao botão de alternância
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    /**
     * Aplica o tema ao documento
     * @param {string} theme - 'light' ou 'dark'
     */
    function applyTheme(theme) {
        const themeToggle = document.getElementById('themeToggle');
        
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.title = 'Alternar para modo claro';
        } else {
            body.classList.remove('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.title = 'Alternar para modo escuro';
        }
    }
    
    // Respeitar a preferência do sistema operacional
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (localStorage.getItem('theme') === null) {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    }
});
