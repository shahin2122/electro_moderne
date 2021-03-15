namespace API.Dtos
{
    public class PartDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PartBrand { get; set; }
        public string PartType { get; set; }
        public string Manufacturer { get; set; }
        public string Specs { get; set; }
        public string LocalId { get; set; }
        public string PhotoUrl { get; set; }
        public string PartNumber { get; set; }
    }
}