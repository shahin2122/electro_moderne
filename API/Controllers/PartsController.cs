using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PartsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Part> _partsRepo;
        private readonly IPhotoService _photoService;
        public PartsController(IGenericRepository<Part> partsRepo, IPhotoService photoService,
                IMapper mapper)
        {
            _photoService = photoService;
            _partsRepo = partsRepo;
            _mapper = mapper;
        }

       [HttpGet]
       public async Task<ActionResult<Pagination<Part>>> GetPaginatedParts(
           [FromQuery] PartsSpecParams partsParams)
        {
            var spec = new PartsSpecification(partsParams);

            var countSpec = new PartsForCountSpecification(partsParams);

            var totalItems = await _partsRepo.CountAsync(countSpec);

            var parts = await _partsRepo.ListAsync(spec);

            var data =  _mapper.Map<IReadOnlyList<Part>, IReadOnlyList<PartDto>>(parts);

            return Ok(new Pagination<PartDto>(partsParams.PageIndex, 
                partsParams.pageSize, totalItems, data));
        }

        [HttpGet("get-all-raw")]
        public async Task<ActionResult<Part>> GetParts()
        {
            return Ok(await _partsRepo.ListAllAsync());
        }

        [HttpGet("{id}", Name = "GetPart")]
        public async Task<ActionResult<Part>> GetPart(int id)
        {
            return Ok(await _partsRepo.GetByIdAsync(id));
        }

        [HttpPost("add-new-part")]
        public async Task<ActionResult<Part>> AddNewPart([FromBody] PartDto partDto)
        {
            if(ModelState.IsValid)
            {
                Part newPart = _mapper.Map<Part>(partDto);
                
                await _partsRepo.AddAsync(newPart);

                if(await _partsRepo.SaveAllAsync()) return Ok(newPart);
            }

            return BadRequest("failed to add new part");
        }
    }
}