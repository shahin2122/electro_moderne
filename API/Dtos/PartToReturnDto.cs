namespace API.Dtos
{
    public class PartToReturnDto
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string PhotoUrl { get; set; }
        public int PartBrandId { get; set; }
        public int PartTypeId { get; set; }
        public string Manufacturer { get; set; }
        public string LocalId { get; set; }
    }
}