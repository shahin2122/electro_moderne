namespace API.Dtos
{
    public class BasketItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string PhotoUrl { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
    }
}