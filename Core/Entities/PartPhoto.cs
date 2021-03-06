namespace Core.Entities
{
    public class PartPhoto : BaseEntity
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
        public Part Part { get; set; }
        public int PartId { get; set; }
        public bool IsMain { get; set; }
    }
}