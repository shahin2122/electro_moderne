namespace Core.Entities
{
    public class BlogPhoto:BaseEntity
    {
        public string Alt { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public Blog Blog { get; set; }
        public int BlogId { get; set; }

    }
}