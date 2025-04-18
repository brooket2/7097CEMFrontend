
const apiUrl = "https://localhost:7208/api/Products";

async function loadRandomFeaturedProducts() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok)
        {
            const products = await response.json();

            const randomProducts = getRandomProducts(products, 3);

            const container = document.getElementById('featured-products-container');
            container.innerHTML = '';

            randomProducts.forEach(product =>
            {
                const productHTML = `
                <div class="container--product">
                <!-- Use the correct key name 'imageURL' from the API -->
                <img src="${product.imageURL}" class="img--logo" alt="${product.name}">
                <h3>${product.name}</h3>  <!-- Added product name -->
                <a class="btn" href="/Home/Products#${product.itemId}">Find Out More</a>
                </div>
                `;
                container.innerHTML += productHTML;
            });
        }
        else {
            console.error('Failed to fetch products.');
        }
    }
    catch (error) {
        console.error('Error loading featured products:', error);
    }
}



function getRandomProducts(products, count)
{
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

window.addEventListener('DOMContentLoaded', loadRandomFeaturedProducts);
