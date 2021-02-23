namespace API.Dtos
{
    public class ProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string PictureUrl { get; set; }
        public string Specs { get; set; }
        public bool? Used { get; set; }
        public string LocalId { get; set; }
        public int ProductTypeId { get; set; }
        public int ProducBrandId { get; set; }
    }
}