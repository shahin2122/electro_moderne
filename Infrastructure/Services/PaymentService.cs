using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;
using Product = Core.Entities.Product;
using Part = Core.Entities.Part;
using System.Linq;
using System.Collections.Generic;
using Core.Specifications;
using Order = Core.Entities.OrderAggregate.Order;

namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;
        public PaymentService(IBasketRepository basketRepository, IUnitOfWork unitOfWork, IConfiguration config)
        {
            _config = config;
            _unitOfWork = unitOfWork;
            _basketRepository = basketRepository;
        }

        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var basket = await _basketRepository.GetBasketAsync(basketId);

            if(basket == null) return null;

            var shippingPrice = 0m;

            if(basket.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync((int)basket.DeliveryMethodId);
            }

            foreach(var item in basket.ProductItems)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                if(item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }
            }

            foreach(var item in basket.PartItems)
            {
                var partItem = await _unitOfWork.Repository<Part>().GetByIdAsync(item.Id);
                if(item.Price != partItem.Price)
                {
                    item.Price = partItem.Price;
                }
            }

            var service = new PaymentIntentService();

            PaymentIntent intent;

            if(string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = ((long) basket.ProductItems.Sum(i => i.Quantity * (i.Price * 100))) + 
                             ((long) basket.PartItems.Sum(i => i.Quantity * (i.Price * 100))) + 
                             ((long) shippingPrice * 100),
                    Currency = "cad",
                    PaymentMethodTypes = new List<string> {"card"}          
                };
                intent = await service.CreateAsync(options);
                basket.PaymentIntentId = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = ((long) basket.ProductItems.Sum(i => i.Quantity * (i.Price * 100))) + 
                             ((long) basket.PartItems.Sum(i => i.Quantity * (i.Price * 100))) + 
                             ((long) shippingPrice * 100),
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }

            await _basketRepository.UpdateBasketAsync(basket);

            return basket;
        }

        public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
           var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
           var order = await _unitOfWork.Repository<Order>().GetEntityWithSpecAsync(spec);

            if(order == null) return null;

            order.Status = Status.PaymentFailed;
            await _unitOfWork.Complete();

            return order;
        }

        public async Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId)
        {
           var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
           var order = await _unitOfWork.Repository<Order>().GetEntityWithSpecAsync(spec);

           if(order == null) return null;

           order.Status = Status.PaymentRecieved;
           _unitOfWork.Repository<Order>().Update(order);

           await _unitOfWork.Complete();

           return order;
        }
    }
}