namespace Core.Entities
{
    public class BasketItem<T> where T : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Parice { get; set; }
        public int Quantity { get; set; }
        public string PhotoUrl { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }

    }
}