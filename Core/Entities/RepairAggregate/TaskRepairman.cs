using Core.Entities.RepairAggregate;
using Core.Entities.Identity;

namespace Core.Entities.RepairAggregate
{
 
    public class TaskRepairman : BaseEntity
    {
        public RequestTask Task { get; set; }
        public int RepairmanId { get; set; }
    }
}