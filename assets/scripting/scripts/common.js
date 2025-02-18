const products = [
  {
    id: 1,
    title: "Cosmic Voyage",
    price: 89.99,
    image: "../images/template_svg/cosmic-voyage-template.svg"
  },
  {
    id: 2,
    title: "Eco Haven",
    price: 89.99,
    image: "../images/template_svg/eco-haven-template.svg"
  },
  {
    id: 3,
    title: "Metro Pulse",
    price: 99.99,
    image: "../images/template_images/urban_pulse.png"
  },
  {
    id: 4,
    title: "Business-Pro",
    price: 149.99,
    image: "../images/template_svg/businesspro-logo.svg"
  }
];

let cart = [];
let btcRate = 0.000025; // Sample BTC rate

// Create stars
function createStars() {
  const container = document.querySelector('.stars-container');
  for (let i = 0; i < 200; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(star);
  }
}

// Render products
function renderProducts() {
  const grid = document.querySelector('.products-grid');
  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <h3 class="product-title">${product.title}</h3>
      <div class="product-price">
        <span class="price">$${product.price}</span>
        <span class="currency-converter">${(product.price * btcRate).toFixed(8)} BTC</span>
      </div>
      <button class="add-to-cart" onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `).join('');
}

// Toggle cart
function toggleCart() {
  const cart = document.querySelector('.cart-modal');
  const overlay = document.querySelector('.overlay');
  cart.classList.toggle('open');
  overlay.classList.toggle('active');
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCart();
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Update cart
function updateCart() {
  const cartItems = document.querySelector('.cart-items');
  const cartCount = document.querySelector('.cart-count');
  const cartTotal = document.getElementById('cart-total');
  const btcTotal = document.getElementById('btc-total');
  
  // Update cart items
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.title}</h4>
        <p class="cart-item-price">$${item.price} × ${item.quantity}</p>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
    </div>
  `).join('');
  
  // Update cart count
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Update totals
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = total.toFixed(2);
  btcTotal.textContent = (total * btcRate).toFixed(8);
}

// Update BTC rate periodically
function updateBTCRate() {
  // In a real application, this would fetch the current rate from an API
  btcRate = btcRate * (0.95 + Math.random() * 0.1); // Simulate 5% fluctuation
  renderProducts();
  updateCart();
}

// Initialize
createStars();
renderProducts();
setInterval(updateBTCRate, 30000); // Update every 30 seconds

// Payment button handlers
document.querySelectorAll('.payment-button').forEach(button => {
  button.addEventListener('click', () => {
    // In a real application, this would integrate with payment processors
    alert('This is a frontend demo. Payment processing would be handled by backend services.');
  });
});