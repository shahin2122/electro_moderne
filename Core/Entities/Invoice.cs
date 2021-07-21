using System;
using System.Collections.Generic;
using Core.Entities;


namespace Core.Entities
{
    public class Invoice : BaseEntity
    {
        public Invoice() 
        {
            
        }

        public Invoice(Customer customer, int customerId, DateTimeOffset date, string workPerformed, decimal subtotal, decimal tPS5, decimal tVQ9975, ICollection<InvoiceItem> items, string appliance, string modelNumber, string submitter)
        {
            Customer = customer;
            CustomerId = customerId;
            Date = date;
            WorkPerformed = workPerformed;
            Subtotal = subtotal;
            TPS5 = tPS5;
            TVQ9975 = tVQ9975;
            Items = items;
            Appliance = appliance;
            ModelNumber = modelNumber;
            Submitter = submitter;
        }

        public Customer Customer { get; set; }
        public int CustomerId { get; set; }
        public DateTimeOffset Date { get; set; } = DateTimeOffset.Now;
        public string WorkPerformed { get; set; }
        public decimal Subtotal { get; set; }
        public decimal TPS5 { get; set; } 
        public decimal TVQ9975 { get; set; }
        public ICollection<InvoiceItem> Items { get; set; }
        public string Appliance { get; set; }
        public string ModelNumber { get; set; }
     
        public string Submitter { get; set; }

        public decimal GetTotal()
        {
            return Subtotal + TPS5 + TVQ9975;
        }
    }
}