// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Function to generate a simple, easy-to-remember order number
function generateOrderNumber() {
    const prefix = "NC"; // "NC" for "Not Coffee"
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${prefix}-${randomNum}`;
}

// Function to update checkout page display
function updateCheckout() {
    const checkoutItemsContainer = document.getElementById('checkout-cart-items');
    const checkoutTotalElement = document.getElementById('checkout-total');
    let total = 0;

    checkoutItemsContainer.innerHTML = ''; // Clear existing cart items

    for (let item in cart) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('checkout-item');
        itemElement.innerHTML = `
            <span class="item-name">${item} (x${cart[item].quantity})</span>
            <span class="item-price">$${cart[item].price.toFixed(2)}</span>
        `;
        checkoutItemsContainer.appendChild(itemElement);

        total += cart[item].price * cart[item].quantity;
    }

    checkoutTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Initialize checkout display
updateCheckout();

// Handle 'Pay at Counter' button click
document.getElementById('pay-at-counter').addEventListener('click', () => {
    const orderNumber = generateOrderNumber();
    
    // Store order details in localStorage (or send to a backend server)
    localStorage.setItem('order', JSON.stringify({
        orderNumber: orderNumber,
        cart: cart,
        total: document.getElementById('checkout-total').textContent
    }));

    alert(`Thank you for your purchase! Your order number is ${orderNumber}.`);
    localStorage.removeItem('cart'); // Clear cart

    // Redirect to home page
    window.location.href = 'main.html';
});
