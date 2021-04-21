using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {

        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;

        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork, IPaymentService paymentService)
        {
            _paymentService = paymentService;
            _unitOfWork = unitOfWork;

            _basketRepo = basketRepo;

        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId,
         string shippingAddress)
        {
            // get basket from repo
            var basket = await _basketRepo.GetBasketAsync(basketId);

            // get items from the product and part repo
            var items = new List<OrderItem>();
            foreach (var item in basket.ProductItems)
            {
                var spec = new ProductWithPhotosSpecification(item.Id);
                var productItem = await _unitOfWork.Repository<Product>().GetEntityWithSpecAsync(spec);
                var itemOrdered = new ItemOrdered(productItem.Id, productItem.Name,
                productItem.Photos.FirstOrDefault(x => x.IsMain).Url);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }
            foreach (var item in basket.PartItems)
            {
                var spec = new PartsSpecification(item.Id);
                var partItem = await _unitOfWork.Repository<Part>().GetEntityWithSpecAsync(spec);
                var itemOrdered = new ItemOrdered(partItem.Id, partItem.Name,
                partItem.Photos.FirstOrDefault(x => x.IsMain).Url);
                var orderItem = new OrderItem(itemOrdered, partItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            //get delivery method from repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            //check to see if order exists
            var orderSpec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
            var exisitingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpecAsync(orderSpec);

            if (exisitingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(exisitingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }

            // create order
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal,
            basket.PaymentIntentId);
            _unitOfWork.Repository<Order>().Add(order);

            // TODO: save to db
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;



            // return order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpecAsync(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }

        public async Task<IReadOnlyList<Order>> GetAllOrdersAsync(OrdersWithItemsAndOrderingSpecification spec)
        {
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }

        public async Task<int> CountAsync(OrdersWithItemsAndOrderingSpecification spec)
        {
            return await _unitOfWork.Repository<Order>().CountAsync(spec);
        }
    }
}