using System;
using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class InvoiceToReturnDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Customer { get; set; }
        public DateTimeOffset Date { get; set; } 
        public string WorkPerformed { get; set; }
        public decimal Subtotal { get; set; }
        public decimal TPS5 { get; set; } 
        public decimal TVQ9975 { get; set; }
        public decimal Total { get; set; }
        public ICollection<InvoiceItemDto> Items { get; set; }
        public string Appliance { get; set; }
        public string ModelNumber { get; set; }
        public string Submitter { get; set; }
    }
}