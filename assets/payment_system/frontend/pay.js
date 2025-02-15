 // Sample cart items
 const cartItems = [
    { id: 1, name: 'Premium Headphones', price: 299.99, quantity: 1 },
    { id: 2, name: 'Wireless Charger', price: 49.99, quantity: 2 }
];

// Initialize cart
function initializeCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div>
                <h3>$${(item.price * item.quantity).toFixed(2)}</h3>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });
}

// Calculate total
function calculateTotal() {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Initialize payment methods
const paymentMethods = document.querySelectorAll('.payment-method');
const paymentDetails = document.getElementById('payment-details');

paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
        // Remove selected class from all methods
        paymentMethods.forEach(m => m.classList.remove('selected'));
        // Add selected class to clicked method
        method.classList.add('selected');
        
        // Update payment form
        updatePaymentForm(method.dataset.method);
    });
});

function updatePaymentForm(method) {
    let formHTML = '';
    
    switch(method) {
        case 'credit':
            formHTML = `
                <input type="text" placeholder="Card Number" />
                <div style="display: flex; gap: 1rem;">
                    <input type="text" placeholder="MM/YY" style="width: 50%;" />
                    <input type="text" placeholder="CVC" style="width: 50%;" />
                </div>
            `;
            break;
        case 'paypal':
            formHTML = `
                <div style="text-align: center; padding: 1rem;">
                    You will be redirected to PayPal to complete your payment
                </div>
            `;
            break;
        case 'bitcoin':
            formHTML = `
                <div style="text-align: center; padding: 1rem;">
                    Bitcoin payment address will be generated after confirmation
                </div>
            `;
            break;
    }

    formHTML += `
        <button class="pay-button">
            Complete Payment
        </button>
    `;

    paymentDetails.innerHTML = formHTML;
}

// Simulate live currency updates
async function updateCurrency() {
    const currencySelect = document.getElementById('currency-select');
    const convertedAmount = document.getElementById('converted-amount');
    const total = calculateTotal();

    // Simulate API call to get exchange rates
    convertedAmount.classList.add('loading');
    
    try {
        // In production, replace with actual Coinbase API call
        const rates = {
            USD: 1,
            EUR: 0.91,
            GBP: 0.79,
            BTC: 0.000023
        };

        const converted = total * rates[currencySelect.value];
        const symbol = currencySelect.value === 'BTC' ? '₿' : 
                     currencySelect.value === 'EUR' ? '€' : 
                     currencySelect.value === 'GBP' ? '£' : '$';

        convertedAmount.textContent = `${symbol}${converted.toFixed(currencySelect.value === 'BTC' ? 6 : 2)}`;
    } catch (error) {
        console.error('Error updating currency:', error);
    }

    convertedAmount.classList.remove('loading');
}

// Initialize the page
initializeCart();
document.getElementById('currency-select').addEventListener('change', updateCurrency);
updateCurrency();

// Update currency every 30 seconds
setInterval(updateCurrency, 30000);