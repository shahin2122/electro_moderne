namespace Core.Entities.RepairAggregate
{
    public class TaskRequest : BaseEntity
    {
        public RequestTask Task {get; set;}
        public RepairRequest Request { get; set; }
    }
}