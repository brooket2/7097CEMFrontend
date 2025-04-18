
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("loginBtn").addEventListener("click", async () => {
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        document.getElementById("loginUsernameError").textContent = "";
        document.getElementById("loginPasswordError").textContent = "";

        const loginPayload = {
            username,
            password
        };

        try {
            const response = await fetch("https://localhost:7208/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginPayload),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                document.getElementById("loginMessage").textContent = "Login successful!";
            } else {
                const data = await response.json();
                document.getElementById("loginMessage").textContent = data.message || "Invalid username or password. Please try again.";
            }
        } catch (error) {
            console.error('Login failed:', error);
            document.getElementById("loginMessage").textContent = "Error occurred while logging in.";
        }
    });

    document.getElementById("registerBtn").addEventListener("click", async () => {
        const newUsername = document.getElementById("registerUsername").value;
        const newPassword = document.getElementById("registerPassword").value;

        document.getElementById("registerUsernameError").textContent = "";
        document.getElementById("registerPasswordError").textContent = "";

        const registerPayload = {
            username: newUsername,
            password: newPassword,
            userLevel: "user"
        };

        try {
            const response = await fetch("https://localhost:7208/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerPayload)
            });

            if (response.ok) {
                document.getElementById("registerMessage").textContent = "User registered successfully!";
            } else {
                const data = await response.json();
                document.getElementById("registerMessage").textContent = data.message || "Failed to register user. Please try again.";
            }
        } catch (error) {
            console.error('Registration failed:', error);
            document.getElementById("registerMessage").textContent = "Error occurred while registering.";
        }
    });

});
