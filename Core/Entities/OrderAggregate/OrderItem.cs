namespace Core.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {

        }
        public OrderItem(ProductItemOrdered? productItemOrdered ,PartItemOrdered? PartItemOrdered ,decimal price, int quantity) 
        {   
            this.ProductItemOrdered = productItemOrdered;
            this.PartItemOrdered = PartItemOrdered;
            this.Price = price;
            this.Quantity = quantity;

        }
     

        
        public ProductItemOrdered? ProductItemOrdered {get; set;}
        public PartItemOrdered? PartItemOrdered {get; set;}
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        
    }
}