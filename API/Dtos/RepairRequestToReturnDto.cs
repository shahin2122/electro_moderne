using System;
using System.Collections.Generic;

namespace API.Dtos
{
    public class RepairRequestToReturnDto
    {
        public int Id { get; set; }
        public string CustomerEmail { get; set; }
        public string ProductType { get; set; }
        public string ProductNumber { get; set; }
        public string ProductBrand { get; set; }
        public string ProblemInfo { get; set; }
        public DateTimeOffset RequestDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public IReadOnlyList<string> DaysAvailability { get; set; }
        public IReadOnlyList<string> PaymentMethods { get; set; }
        public string Status { get; set; } 
        public string WorkPerformed { get; set; }
        public decimal Subtotal { get; set; } 
        public int RepairmanId { get; set; }
        public decimal Total {get; set;}
     
    }
}