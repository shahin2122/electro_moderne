using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InvoiceController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IInvoiceService _invoiceService;
        public InvoiceController(IUnitOfWork unitOfWork, IMapper mapper, IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        [HttpPost]
        public async Task<ActionResult<InvoiceToReturnDto>> AddNew([FromBody] InvoiceToCreateDto newInvoicedto)
        {
            if (ModelState.IsValid)
            {
                var invoice = _mapper.Map<Invoice>(newInvoicedto);
 

                var addedInvoice = await this._invoiceService.CreateInvoiceAsync(invoice);


                if(addedInvoice == null) return BadRequest(new ApiResponse(400, "Problem creating Invoice"));

                InvoiceToReturnDto invoiceToReturn = new InvoiceToReturnDto();

               


                return Ok(_mapper.Map<InvoiceToReturnDto>(addedInvoice));
            }

            return BadRequest("failed to add new invoice");

        }

        [HttpPost("add-item")]
        public async Task<ActionResult<InvoiceItemDto>> AddNewItem([FromBody] InvoiceItemDto newItemDto)
        {
            if(ModelState.IsValid)
            {
                var item = _mapper.Map<InvoiceItem>(newItemDto);

                var spec = new InvoiceWithCustomerAndItemsSpecification(newItemDto.InvoiceId);

                var invoice = await _unitOfWork.Repository<Invoice>().GetEntityWithSpecAsync(spec);

                item.Invoice = invoice;

                await _unitOfWork.Repository<InvoiceItem>().AddAsync(item);

                if(await _unitOfWork.Repository<InvoiceItem>().SaveAllAsync()) return Ok(_mapper.Map<InvoiceItemDto>(item));
            }
            return BadRequest("failed to add item");
        }

       

        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceToReturnDto>> GetInvoice(int id)
        {
            var spec = new InvoiceWithCustomerAndItemsSpecification(id);

            var invoice = await _unitOfWork.Repository<Invoice>().GetEntityWithSpecAsync(spec);

            if (invoice == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<InvoiceToReturnDto>(invoice);
        }

        [HttpGet("items/{invoiceId}")]
        public async Task<ActionResult<ICollection<InvoiceItemDto>>> GetItemsForInvoice(int invoiceId)
        {
            var spec = new InvoiceWithCustomerAndItemsSpecification(invoiceId);

            var invoice = await _unitOfWork.Repository<Invoice>().GetEntityWithSpecAsync(spec);

            if (invoice == null) return NotFound(new ApiResponse(404));


            return Ok(_mapper.Map<ICollection<InvoiceItemDto>>(invoice.Items));
        }


        [HttpGet]
        public async Task<ActionResult<Pagination<InvoiceToReturnDto>>> GetInvoices([FromQuery]
        InvoiceSpecParams invoiceParams)
        {
            var spec = new InvoicesPaginatedSpecification(invoiceParams);

            var totalItems = await _unitOfWork.Repository<Invoice>().CountAsync(spec);

            var invoices = await _unitOfWork.Repository<Invoice>().ListAsync(spec);

            return Ok(new Pagination<InvoiceToReturnDto>(invoiceParams.PageIndex, invoiceParams.pageSize,
                totalItems, _mapper.Map<IReadOnlyList<Invoice> , IReadOnlyList<InvoiceToReturnDto>>(invoices)));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteInvoice(int id)
        {
            var invoice = await _unitOfWork.Repository<Invoice>().GetByIdAsync(id);

            if (invoice == null) return NotFound(new ApiResponse(404));

            _unitOfWork.Repository<Invoice>().Delete(invoice);

            if (await _unitOfWork.Repository<Invoice>().SaveAllAsync()) return Ok();

            return BadRequest("failed to delete Invoice");
        }

        [Authorize]
        [HttpPut("update-item/{id}")]
        public async Task<ActionResult<InvoiceItemDto>> UpdateInvoiceItem(int id, InvoiceItemDto newItem)
        {
            var item = await _unitOfWork.Repository<InvoiceItem>().GetByIdAsync(id);

            if (item == null) return NotFound(new ApiResponse(404));

            _mapper.Map(newItem , item);

            _unitOfWork.Repository<InvoiceItem>().Update(item);

            if(await _unitOfWork.Repository<InvoiceItem>().SaveAllAsync()) return Ok(item);

            return BadRequest(new ApiResponse(400, "failed to update invoice item"));
        }


        [HttpPut("update/{id}")]
        public async Task<ActionResult<InvoiceToReturnDto>> UpdateInvoice(int id,[FromBody] 
        InvoiceToCreateDto newInvoice)
        {
            var spec = new InvoiceWithCustomerAndItemsSpecification(id);

            var invoice = await _unitOfWork.Repository<Invoice>().GetEntityWithSpecAsync(spec);

           // var items = _mapper.Map<ICollection<InvoiceItem>, ICollection<InvoiceItemDto>>(GetItemsForInvoice(id));

           // newInvoice.Items = items;

            _mapper.Map(newInvoice , invoice);

            

            _unitOfWork.Repository<Invoice>().Update(invoice);

             if (await _unitOfWork.Repository<Invoice>().SaveAllAsync()) return Ok
                (_mapper.Map<InvoiceToReturnDto>(invoice));

            return BadRequest("failed to update Invoice");
        }


        [Authorize]
        [HttpDelete("delete-item/{id}")]
        public async Task<ActionResult> DeleteInvoiceItem(int id)
        {
            var item = await _unitOfWork.Repository<InvoiceItem>().GetByIdAsync(id);

            if (item == null) return NotFound(new ApiResponse(404));

            _unitOfWork.Repository<InvoiceItem>().Delete(item);

            if( await _unitOfWork.Repository<InvoiceItem>().SaveAllAsync()) return Ok();

            return BadRequest("failed to delete Item");
        }


    }



}