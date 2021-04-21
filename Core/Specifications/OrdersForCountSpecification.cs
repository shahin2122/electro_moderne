using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrdersForCountSpecification : BaseSpecification<Order>
    {
        public OrdersForCountSpecification(OrderSpecParams orderParams) : base(x =>
        (string.IsNullOrEmpty(orderParams.Search) || x.BuyerEmail.ToLower().Contains
        (orderParams.Search)))
        {
        }

    }
}