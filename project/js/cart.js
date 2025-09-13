let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(name, price) {
    if (!localStorage.getItem("currentUser")) {
        alert("You must be logged in to add items.");
        window.location.href = "login.html";
        return;
    }

    if (cart[name]) {
        cart[name].quantity += 1;
    } else {
        cart[name] = { price: price, quantity: 1 };
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = "";
    let total = 0;

    for (let item in cart) {
        let itemDiv = document.createElement("div");
        itemDiv.innerHTML = `${item} (x${cart[item].quantity}) - ₹${cart[item].price * cart[item].quantity}`;
        cartContainer.appendChild(itemDiv);
        total += cart[item].price * cart[item].quantity;
    }

    let totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total: ₹${total}</strong>`;
    cartContainer.appendChild(totalDiv);
}

// Checkout function (Corrected)
function checkout() {
    let user = localStorage.getItem("currentUser");

    if (!user) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let userData = JSON.parse(localStorage.getItem(user)) || { orders: [] };

    if (userData.orders.length >= 8) {
        userData.orders.shift(); // Keep only last 8 orders
    }

    userData.orders.push(cart);
    localStorage.setItem(user, JSON.stringify(userData));

    cart = {};
    localStorage.removeItem('cart');
    updateCart();
    alert("Order placed successfully!");
    window.location.href = "dashboard.html";
}

// Initialize cart on page load
updateCart();
