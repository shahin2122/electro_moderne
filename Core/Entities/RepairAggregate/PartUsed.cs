namespace Core.Entities
{
    public class PartUsed : BaseEntity
    {
        public PartUsed()
        {
        }

        public PartUsed(Part part, decimal price, int quantity)
        {
            this.Part = part;
            this.Price = price;
            this.Quantity = quantity;

        }
        public Part Part { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public decimal GetTotalPrice()
        {
            return Price * Quantity;
        }
    }
}