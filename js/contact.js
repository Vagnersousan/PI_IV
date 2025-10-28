/**
 * contact.js - Gerenciamento do Formulário de Contato
 * 
 * Este arquivo gerencia a validação e envio do formulário de contato,
 * utilizando Formspree como backend para processar os dados.
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

/**
 * Trata o envio do formulário
 * @param {Event} e - Evento de submissão
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Validação do formulário
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    
    // Desabilitar o botão de envio
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        // Preparar os dados do formulário
        const formData = new FormData(form);
        
        // Enviar para Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Sucesso
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            
            // Limpar o formulário
            form.reset();
            form.classList.remove('was-validated');
            
            // Rolar para a mensagem de sucesso
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Ocultar a mensagem após 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
            console.log('✓ Mensagem enviada com sucesso');
        } else {
            // Erro
            throw new Error('Erro ao enviar o formulário');
        }
    } catch (error) {
        // Erro
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        
        console.error('Erro ao enviar formulário:', error);
        
        // Rolar para a mensagem de erro
        errorMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Ocultar a mensagem após 5 segundos
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    } finally {
        // Reabilitar o botão de envio
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
}

/**
 * Valida o email em tempo real
 */
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    }
});

/**
 * Valida o formato do email
 * @param {string} email - Email a ser validado
 * @returns {boolean} True se o email é válido
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
