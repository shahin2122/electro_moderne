namespace Core.Entities.OrderAggregate
{
    public class ItemOrdered
    {
        public ItemOrdered()
        {

        }

        public ItemOrdered(int Id, string Name, string photoUrl) 
        {
            this.Id = Id;
            this.Name = Name;
            this.PhotoUrl = photoUrl;
   
        }
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
    }
}