using System;
using System.Collections.Generic;

namespace Core.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
            
        }

        public Order( IReadOnlyList<OrderItem> Items, string buyerEmail, string shipToAddress,
         DeliveryMethod deliveryMethod , decimal subtotal, string paymentIntentId) 
        {
            this.BuyerEmail = buyerEmail;
            this.ShipToAddress = shipToAddress;
            this.DeliveryMethod = deliveryMethod;
            this.Items = Items;
            this.Subtotal = subtotal;
            this.PaymentIntentId = paymentIntentId;
        }
        
       
        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public string ShipToAddress {get; set;}
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> Items { get; set; }
        public decimal Subtotal { get; set; }
        public Status Status { get; set; } = Status.Pending;
        public string PaymentIntentId { get; set; }
        public decimal TPS5 { get; set; } 
        public decimal TVQ9975 { get; set; }

        public decimal GetTotal()
        {
            return Subtotal + DeliveryMethod.Price;
        }

        public decimal GetTotalTaxed()
        {
            return GetTotal() + TPS5 + TVQ9975;
        }
    }
}