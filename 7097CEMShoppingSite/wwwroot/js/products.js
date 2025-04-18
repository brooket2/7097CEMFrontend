document.addEventListener('DOMContentLoaded', () => {
    const basketApiUrl = "https://localhost:7208/api/Basket";
    function loadCategories() {
        const allCategories = [...new Set(products.map(p => p.category))];

        const categoryDropdown = document.getElementById("category");
        allCategories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.toLowerCase();
            option.textContent = category;
            categoryDropdown.appendChild(option);
        });
    }

    function applyFilters() {
        const categoryFilter = document.getElementById('category').value.toLowerCase();
        const priceFilter = parseFloat(document.getElementById('price').value) || Infinity;

        document.querySelectorAll('.product-card').forEach(product => {
            const category = product.getAttribute('data-category').toLowerCase();
            const price = parseFloat(product.getAttribute('data-price'));

            const matchesCategory = categoryFilter === "" || category === categoryFilter;
            const matchesPrice = price <= priceFilter;

            product.style.display = (matchesCategory && matchesPrice) ? 'block' : 'none';
        });
    }

    function bindProductEvents() {
        document.querySelectorAll('.toggle-details').forEach(button => {
            button.addEventListener('click', function () {
                const details = this.nextElementSibling;
                const isHidden = details.style.display === 'none' || !details.style.display;
                details.style.display = isHidden ? 'block' : 'none';
                this.textContent = isHidden ? 'Hide Details' : 'Find Out More';
            });
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', async function () {
                const productCard = this.closest('.product-card');
                const productId = productCard.getAttribute('data-id');

                try {
                    const response = await fetch(`${basketApiUrl}/${productId}`, {
                        method: 'POST',
                        credentials: 'include'
                    });
                    if (response.ok) {
                        loadCart();
                    } else {
                        alert("Failed to add item to cart.");
                    }
                } catch (error) {
                    console.error('Error adding to cart:', error);
                }
            });
        });
    }

    async function loadCart() {
        try {
            const response = await fetch(basketApiUrl, {
                credentials: 'include'
            });
            if (response.ok) {
                const items = await response.json();
                renderCart(items);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    }

    function renderCart(items) {
        const cartList = document.getElementById('cartItems');
        const totalCostDiv = document.getElementById('totalCost');
        cartList.innerHTML = '';

        let totalCostInPence = 0;

        items.forEach(item => {
            const li = document.createElement('li');

            const quantityText = document.createElement('div');
            quantityText.textContent = `Quantity: ${item.quantity}`;
            li.appendChild(quantityText);

            const itemText = document.createElement('div');
            itemText.textContent = `${item.name} - £${(item.totalCost / 100).toFixed(2)}`;
            li.appendChild(itemText);

            totalCostInPence += item.totalCost;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'btn';
            removeBtn.style.marginLeft = '10px';
            removeBtn.addEventListener('click', () => removeFromCart(item.itemId));

            li.appendChild(removeBtn);
            cartList.appendChild(li);
        });

        const totalCostInPounds = (totalCostInPence / 100).toFixed(2);
        totalCostDiv.textContent = `Total Cost: £${totalCostInPounds}`;
    }

    async function removeFromCart(productId) {
        try {
            const response = await fetch(`${basketApiUrl}/${productId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                loadCart();
            } else {
                alert("Failed to remove item from cart.");
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    }

    loadCart();
    loadCategories();
    bindProductEvents();

    document.getElementById('category').addEventListener('change', applyFilters);
    document.getElementById('price').addEventListener('change', applyFilters);
});
