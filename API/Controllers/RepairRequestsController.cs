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
    public class RepairRequestsController : BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;

        private readonly IMapper _mapper;
        public RepairRequestsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;

            _mapper = mapper;

        }

        [HttpPost]
        public async Task<ActionResult<RepairRequest>> SubmitNewRequest([FromBody] RepairRequest newRepairRequest)
        {
            if (ModelState.IsValid)
            {
                await _unitOfWork.Repository<RepairRequest>().AddAsync(newRepairRequest);

                if (await _unitOfWork.Repository<RepairRequest>().SaveAllAsync()) return Ok(newRepairRequest);
            }

            return BadRequest("failed to submit your repair request");
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<RepairRequestToReturnDto>> GetRequest(int id)
        {
            var request = await _unitOfWork.Repository<RepairRequest>().GetByIdAsync(id);

            if (request == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<RepairRequestToReturnDto>(request);
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<RepairRequestToReturnDto>>> GetRequests([FromQuery]
        RepairRequestSpecParams requestParams)
        {
            var spec = new RepairRequestPaginatedSpecification(requestParams);

            var countSpec = new RepairRequestPaginatedSpecification(requestParams);

            var totalItems = await _unitOfWork.Repository<RepairRequest>().CountAsync(countSpec);

            var requests = await _unitOfWork.Repository<RepairRequest>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<RepairRequest>, IReadOnlyList<RepairRequestToReturnDto>>(requests);

            return Ok(new Pagination<RepairRequestToReturnDto>(requestParams.PageIndex,
            requestParams.pageSize, totalItems, data));

        }
        [HttpGet("payment-methods")]
        public async Task<ActionResult<IReadOnlyList<PaymentMethods>>> GetPaymentMethodsAsync()
        {
            var payments = await _unitOfWork.Repository<PaymentMethods>().ListAllAsync();
            
            if(payments == null) return NotFound();

            return Ok(payments);
        }

        [HttpGet("days")]
        public async Task<ActionResult<IReadOnlyList<DaysAvailable>>> GetDaysAvailableAsync()
        {
            var days = await _unitOfWork.Repository<DaysAvailable>().ListAllAsync();
            
            if(days == null) return NotFound();

            return Ok(days);
        }

        [HttpGet("unseen-requests")]
        public async Task<int> GetUnseenRequestsCountAsync()
        {
            var spec = new RepairRequestUnseenStatusSpecification();

            var requests = await _unitOfWork.Repository<RepairRequest>().ListAsync(spec);

            return requests.Count;
        }

        [HttpPost("update-status-seen/{id}")]
        public async Task<RepairRequestToReturnDto> UpdateRequestStatusToSeen(int id)
        {
            var request = await _unitOfWork.Repository<RepairRequest>().GetByIdAsync(id);

            if (request == null) return null;

            if (request.Status == RepairRequestStatus.Seen) return null;

            request.Status = RepairRequestStatus.Seen;

            _unitOfWork.Repository<RepairRequest>().Update(request);

            await _unitOfWork.Repository<RepairRequest>().SaveAllAsync();

            return _mapper.Map<RepairRequestToReturnDto>(request);
        }

        [HttpPost("update-status-accepted/{id}")]
        public async Task<RepairRequestToReturnDto> UpdateRequestStatusToAccepted(int id)
        {
            var request = await _unitOfWork.Repository<RepairRequest>().GetByIdAsync(id);

            if (request == null) return null;

            if (request.Status == RepairRequestStatus.Accepted) return null;

            request.Status = RepairRequestStatus.Accepted;

            _unitOfWork.Repository<RepairRequest>().Update(request);

            await _unitOfWork.Repository<RepairRequest>().SaveAllAsync();

            return _mapper.Map<RepairRequestToReturnDto>(request);
        }

        [HttpPost("update-status-rejected/{id}")]
        public async Task<RepairRequestToReturnDto> UpdateRequestStatusToRejected(int id)
        {
            var request = await _unitOfWork.Repository<RepairRequest>().GetByIdAsync(id);

            if (request == null) return null;

            if (request.Status == RepairRequestStatus.Rejected) return null;

            request.Status = RepairRequestStatus.Rejected;

            _unitOfWork.Repository<RepairRequest>().Update(request);

            await _unitOfWork.Repository<RepairRequest>().SaveAllAsync();

            return _mapper.Map<RepairRequestToReturnDto>(request);
        }
    }
}