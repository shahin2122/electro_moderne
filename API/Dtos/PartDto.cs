namespace API.Dtos
{
    public class PartDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int PartBrandId { get; set; }
        public int PartTypeId { get; set; }
        public string Manufacturer { get; set; }
        public string Specs { get; set; }
        public string LocalId { get; set; }
    }
}