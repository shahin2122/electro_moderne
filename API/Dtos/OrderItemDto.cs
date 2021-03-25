namespace API.Dtos
{
    public class OrderItemDto
    {
        public int? ProductId { get; set; }
        public int? PartId { get; set; }
        public string ProductName { get; set; }
        public string PartName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ProductPhotoUrl { get; set; }
        public string PartPhotoUrl { get; set; }
    }
}