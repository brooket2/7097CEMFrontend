using System.Text.Json.Serialization;

namespace _7097CEMShoppingSite.Models
{
    public class Product
    {
        [JsonPropertyName("itemId")]
        public int ItemId { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("imageURL")]
        public string ImageUrl { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("unitPrice")]
        public decimal Price { get; set; }

        [JsonPropertyName("category")]
        public string Category { get; set; }
    }
}
