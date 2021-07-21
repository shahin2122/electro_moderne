using System.Collections.Generic;
using System;

namespace Core.Entities
{
    public class Customer : BaseEntity
    {
        public ICollection<Invoice> Invoices { get; set; }
        public string Email { get; set; }
        public string Appliance { get; set; }
        public string Brand { get; set; }
        public string RequestedService { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string ModelNumber { get; set; }
        public DateTimeOffset RegisteredDate { get; set; } = DateTimeOffset.Now;

    }
}