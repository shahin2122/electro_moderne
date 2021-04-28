using System;
using System.Collections.Generic;
using Core.Entities.OrderAggregate;

namespace API.Dtos
{
    public class OrderToReturnDto
    {
        public int Id {get; set;}
        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public string ShipToAddress {get; set;}
        public string DeliveryMethod { get; set; }
        public decimal ShippingPrice { get; set; }
        public IReadOnlyList<OrderItemDto> Items { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; } 
        public decimal TPS5 { get; set; }
        public decimal TVQ9975 { get; set; }
        public decimal TotalTaxed {get; set;}
    }
}