using System.Collections.Generic;

namespace Core.Entities
{
    public class CustomerBasket 
    {
        public CustomerBasket()
        {
        }

        public CustomerBasket(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<BasketItem<Product>> ProductItems { get; set; } = new List<BasketItem<Product>>();
        public List<BasketItem<Part>> PartItems { get; set; } = new List<BasketItem<Part>>();
        public int? DeliveryMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public decimal ShippingPrice { get; set; }
        
    }
}