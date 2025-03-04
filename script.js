document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('paymentModal');
    const buyButton = document.getElementById('buyButton');
    const closeBtn = document.getElementsByClassName('close')[0];
    const emailInput = document.getElementById('userEmail');
    
    buyButton.onclick = () => {
        // Redirect to Discord user profile
        window.location.href = 'https://discord.com/users/sebastiandiazm';
    }
    
    closeBtn.onclick = () => {
        modal.classList.remove('show');
    }
    
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.classList.remove('show');
        }
    }

    emailInput.addEventListener('input', showPaymentInstructions);
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function copyAddress() {
    const walletAddress = document.getElementById('walletAddress');
    navigator.clipboard.writeText(walletAddress.textContent)
        .then(() => {
            showNotification('Dirección copiada al portapapeles', 'success');
        })
        .catch(err => {
            showNotification('Error al copiar la dirección', 'error');
            console.error('Error al copiar:', err);
        });
}

function showPaymentInstructions() {
    const email = document.getElementById('userEmail').value;
    const walletAddress = document.getElementById('walletAddress').textContent;
    
    const paymentInstructions = document.createElement('div');
    paymentInstructions.innerHTML = `
        <h3>Instrucciones de pago:</h3>
        <p>1. Monto: 5.99 USDT</p>
        <p>2. Dirección: ${walletAddress}</p>
        <p>3. Red: BEP20</p>
        ${email ? `<p>4. Concepto: ${email}</p>` : '<p>4. Concepto: Ingresa tu email arriba</p>'}
        <p>Una vez realizado el pago, recibirás el PDF en tu email.</p>
    `;
    
    const modalContent = document.querySelector('.modal-content');
    const existingInstructions = modalContent.querySelector('.payment-instructions');
    if (existingInstructions) {
        existingInstructions.remove();
    }
    paymentInstructions.className = 'payment-instructions';
    
    // Insert before the last button in the modal
    const confirmButton = modalContent.querySelector('.cta-button');
    modalContent.insertBefore(paymentInstructions, confirmButton);
}

function confirmPayment() {
    const email = document.getElementById('userEmail').value;
    if (!email) {
        showNotification('Por favor, ingresa tu email para recibir el PDF', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    showNotification('Gracias! Recibirás el PDF en tu email una vez confirmado el pago', 'success');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}