using System.Threading.Tasks;
using API.Errors;
using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CustomersController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CustomersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Customer>> AddNew([FromBody] Customer newCustomer)
        {
            if(ModelState.IsValid)
            {
                await _unitOfWork.Repository<Customer>().AddAsync(newCustomer);

                if(await _unitOfWork.Repository<Customer>().SaveAllAsync()) return Ok(newCustomer);

            }

            return BadRequest("failed to add new customer!");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _unitOfWork.Repository<Customer>().GetByIdAsync(id);

            if(customer == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Customer>(customer);
        }


        [HttpGet]
        public async Task<ActionResult<Pagination<Customer>>> GetCustomers([FromQuery]
        CustomerSpecParams customerParams)
        {
            var spec = new CustomersPaginatedSpecification(customerParams);

            var countSpec = new CustomersPaginatedSpecification(customerParams);

            var totalItems = await _unitOfWork.Repository<Customer>().CountAsync(countSpec);

            var customers = await _unitOfWork.Repository<Customer>().ListAsync(countSpec);

            return Ok(new Pagination<Customer>(customerParams.PageIndex, customerParams.pageSize,
            totalItems, customers));
        }

        [Authorize]
        [HttpPut("update/{id}")]
        public async Task<ActionResult<Customer>> UpdateCustomer(int id , [FromBody]
        CustomerUpdateDto newCustomer)
        {
            var customer = await _unitOfWork.Repository<Customer>().GetByIdAsync(id);

            _mapper.Map(newCustomer, customer);

            _unitOfWork.Repository<Customer>().Update(customer);

            if(await _unitOfWork.Repository<Customer>().SaveAllAsync()) return Ok(customer);

            return BadRequest(new ApiResponse(400, "failed to update customer"));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCustomer(int id)
        {
            var customer = await _unitOfWork.Repository<Customer>().GetByIdAsync(id);

            if(customer == null) return NotFound(new ApiResponse(404));

            _unitOfWork.Repository<Customer>().Delete(customer);

            if(await _unitOfWork.Repository<Customer>().SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete customer");
        }
    }
}