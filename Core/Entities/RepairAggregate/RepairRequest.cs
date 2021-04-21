using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class RepairRequest : BaseEntity
    {
       
        public string CustomerEmail { get; set; }
        public string ProductType { get; set; }
        public string ProductNumber { get; set; }
        public string ProductBrand { get; set; }
        public string ProblemInfo { get; set; }
        public DateTimeOffset RequestDate { get; set; } = DateTimeOffset.Now;
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public bool AcceptedServiceCall { get; set; }
        public string ReasonToReject { get; set; }

        public IReadOnlyList<DaysAvailable> DaysAvailability { get; set; }

        public IReadOnlyList<PaymentMethods> PaymentMethods { get; set; }
        public RepairRequestStatus Status { get; set; } = RepairRequestStatus.Unseen;
        
        public bool IsEmergency { get; set; }

        public string WorkPerformed { get; set; }
        public decimal Subtotal { get; set; } 
        public decimal ServiceCallPrice { get; set; } = 90;

        public int RepairmanId { get; set; }

        public decimal GetTotal()
        {
            return Subtotal + ServiceCallPrice;
        }
    }
}