using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using _7097CEMShoppingSite.Models;
using System.Text.Json;

namespace _7097CEMShoppingSite.Services
{
    public class ProductService
    {
        private readonly HttpClient _httpClient;

        public ProductService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Product>> GetProductsFromApi()
        {
            var products = new List<Product>();
            try
            {
                var response = await _httpClient.GetAsync("https://localhost:7208/api/Products");
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync();
                products = JsonSerializer.Deserialize<List<Product>>(json);

                foreach (var product in products)
                {
                    product.Price = product.Price / 100;
                }
                return products;
            }
            catch
            {
                return null;
            }
        }
    }
}
