using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContactRequestsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ContactRequestsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<ActionResult> SubmitNewContactRequest([FromBody] ContactRequest newRequest)
        {
            if (ModelState.IsValid)
            {
                await _unitOfWork.Repository<ContactRequest>().AddAsync(newRequest);

                if(await _unitOfWork.Repository<ContactRequest>().SaveAllAsync()) return Ok();
            }

            return BadRequest("failed to submit new contact request please try again");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactRequestToRetuenDto>> GetContactRequest(int id)
        {
            var request = await _unitOfWork.Repository<ContactRequest>().GetByIdAsync(id);

            if(request == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<ContactRequestToRetuenDto>(request);
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ContactRequestToRetuenDto>>> getContactRequests([FromQuery]
        ContactRequestSpecParams requestParams)
        {
            var spec = new ContactRequestPaginatedSpecification(requestParams);

            var countSpec = new ContactRequestPaginatedSpecification(requestParams);

            var totalItems = await _unitOfWork.Repository<ContactRequest>().CountAsync(countSpec);

            var requests = await _unitOfWork.Repository<ContactRequest>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<ContactRequest>, IReadOnlyList<ContactRequestToRetuenDto>>(requests);
            
            return Ok(new Pagination<ContactRequestToRetuenDto>(requestParams.PageIndex,
            requestParams.pageSize, totalItems, data));
        }

        [HttpGet("unseen-requests")]
        public async Task<int> GetUnseenRequestsAsync()
        {
            var spec = new ContactRequestUnseenStatusSpecification();

            var requests = await _unitOfWork.Repository<ContactRequest>().ListAsync(spec);

            return requests.Count;
        }


        [HttpPost("update-status-seen/{id}")]
        public async Task<ContactRequestToRetuenDto> UpdateStatusToSeen(int id)
        {
            var request = await _unitOfWork.Repository<ContactRequest>().GetByIdAsync(id);

            if(request == null) return null;

            if(request.Status == ContactRequestStatus.Seen) return null;

            request.Status = ContactRequestStatus.Seen;

            _unitOfWork.Repository<ContactRequest>().Update(request);

            await _unitOfWork.Repository<ContactRequest>().SaveAllAsync();

            return _mapper.Map<ContactRequestToRetuenDto>(request);
        }
    }
}