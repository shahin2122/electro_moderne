namespace Core.Entities.OrderAggregate
{
    public class PartItemOrdered
    {
        public PartItemOrdered()
        {

        }

        public PartItemOrdered(int partId, string partName, string photoUrl) 
        {
            this.PartId = partId;
            this.PartName = partName;
            this.PhotoUrl = photoUrl;
   
        }
        
        public int PartId { get; set; }
        public string PartName { get; set; }
        public string PhotoUrl { get; set; }
    }
}