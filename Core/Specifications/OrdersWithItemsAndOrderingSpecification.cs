using System;
using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrdersWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersWithItemsAndOrderingSpecification(string email) 
        : base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.Items);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersWithItemsAndOrderingSpecification(int id, string email) 
        : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.Items);
            AddInclude(o => o.DeliveryMethod);
        }

        public OrdersWithItemsAndOrderingSpecification(OrderSpecParams orderParams)
        {
            AddInclude(o => o.Items);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
            ApplyPaging(orderParams.pageSize * (orderParams.PageIndex - 1),
            orderParams.pageSize);
        }
    }
}