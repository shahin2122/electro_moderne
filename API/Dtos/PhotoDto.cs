namespace API.Dtos
{
    public class PhotoDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }
        public int ProductId { get; set; }
    }
}