namespace API.Dtos
{
    public class PartPhotoDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }
        public int PartId { get; set; }
    }
}