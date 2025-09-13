document.addEventListener("DOMContentLoaded", () => {
    // Login form
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = document.getElementById("login-username").value.trim();
            const password = document.getElementById("login-password").value.trim();

            try {
                const res = await fetch("login.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
                });

                const data = await res.json();

                if (data.status === "success" && data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    alert(data.message || "Login failed.");
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("Something went wrong. Try again!");
            }
        });
    }

    // Signup form
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = document.getElementById("signup-username").value.trim();
            const password = document.getElementById("signup-password").value.trim();

            try {
                const res = await fetch("signup.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
                });

                const data = await res.text();
                alert(data);
            } catch (error) {
                console.error("Signup error:", error);
                alert("Something went wrong. Try again!");
            }
        });
    }
});
