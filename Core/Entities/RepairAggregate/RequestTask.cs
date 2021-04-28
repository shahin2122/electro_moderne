using System;
using System.Collections.Generic;
using Core.Entities.Identity;

namespace Core.Entities.RepairAggregate
{
    public class RequestTask : BaseEntity
    {
        public RepairRequest RepairRequest { get; set; }
        public int RepairRequestId { get; set; }

        public int RepairManId { get; set; }
        public string WorkPerformed { get; set; }
        public decimal Subtotal { get; set; } 
        public decimal ServiceCallPrice { get; set; } = 90;
        public string CustomerEmail { get; set; }
        public string ProductType { get; set; }
        public string ProductNumber { get; set; }
        public string ProductBrand { get; set; }
        public string ProblemInfo { get; set; }
        public DateTimeOffset TaskDate { get; set; } = DateTimeOffset.Now;
        public ICollection<DaysAvailable> DaysAvailability { get; set; }
        public ICollection<PaymentMethods> PaymentMethods { get; set; }
        public RepairRequestStatus TaskStatus { get; set; } = RepairRequestStatus.Unseen;

        public decimal GetTotal()
        {
            return Subtotal + ServiceCallPrice;
        }
    }
}