document.addEventListener("DOMContentLoaded", function () {
    let user = localStorage.getItem("currentUser");

    if (!user) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    let userData = JSON.parse(localStorage.getItem(user));
    let orderHistoryDiv = document.getElementById("order-history");

    if (!userData.orders || userData.orders.length === 0) {
        orderHistoryDiv.innerHTML = "<p>No orders yet.</p>";
    } else {
        userData.orders.forEach((order, index) => {
            let orderDiv = document.createElement("div");
            orderDiv.classList.add("order-item");
            orderDiv.innerHTML = `<strong>Order ${index + 1}:</strong> ${Object.keys(order).map(item => `${item} (x${order[item].quantity})`).join(", ")}`;
            orderHistoryDiv.appendChild(orderDiv);
        });
    }

    fetch("get_orders.php")
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
            orderHistoryDiv.innerHTML = "<p>No orders yet.</p>";
            return;
        }

        data.forEach((order, index) => {
            let orderDiv = document.createElement("div");
            orderDiv.classList.add("order-item");
            orderDiv.innerHTML = `<strong>Order ${index + 1}:</strong> ${Object.keys(order).map(item => `${item} (x${order[item].quantity})`).join(", ")}`;
            orderHistoryDiv.appendChild(orderDiv);
        });
    });
});


function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
