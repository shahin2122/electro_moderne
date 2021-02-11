namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string PictureUrl { get; set; }
        public string ProductType { get; set; }     
        public string ProductBrand { get; set; }
        public string Specs { get; set; }
        public bool? Used { get; set; }
        public string LocalId { get; set; }
    }
}