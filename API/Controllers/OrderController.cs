using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Core.Specifications;
using API.Helpers;

namespace API.Controllers
{
    [Authorize]
    public class OrderController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;

        }

        [HttpPost("create")]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId,
            orderDto.BasketId, orderDto.ShipToAddress);

            if(order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<OrderToReturnDto>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var orders = await _orderService.GetOrdersForUserAsync(email);

            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var order = await _orderService.GetOrderByIdAsync(id, email);

            if(order == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Order, OrderToReturnDto>(order);
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("get-all")]
        public async Task<ActionResult<Pagination<OrderToReturnDto>>> GetAllOrders(
        [FromQuery] OrderSpecParams ordersParams)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(ordersParams);

            var countSpec = new OrdersForCountSpecification(ordersParams);

            var totalItems = await _orderService.CountAsync(spec);

            var orders = await _orderService.GetAllOrdersAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders);

            return Ok(new Pagination<OrderToReturnDto>(ordersParams.PageIndex,
            ordersParams.pageSize, totalItems, data));
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("admin/{orderId}/{buyerEmail}")]
        public async Task<OrderToReturnDto> GetOrderByAdmin(int orderId, string buyerEmail)
        {
            var order = await _orderService.GetOrderByIdAsync(orderId, buyerEmail);

            return _mapper.Map<OrderToReturnDto>(order);
        }
    }
}