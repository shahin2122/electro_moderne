namespace Core.Entities
{
    public class InvoiceItem : BaseEntity
    {
        public Invoice Invoice { get; set; }
        public int InvoiceId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}