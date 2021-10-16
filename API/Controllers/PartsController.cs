using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using API.Errors;
using API.Helpers;
using Core.Specifications;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;


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
       public async Task<ActionResult<Pagination<PartToReturnDto>>> GetPaginatedParts(
           [FromQuery] PartsSpecParams partsParams)
        {
            var spec = new PartsSpecification(partsParams);

            var countSpec = new PartsForCountSpecification(partsParams);

            var totalItems = await _partsRepo.CountAsync(countSpec);

            var parts = await _partsRepo.ListAsync(spec);

            var data =  _mapper.Map<IReadOnlyList<Part>, IReadOnlyList<PartToReturnDto>>(parts);

            return Ok(new Pagination<PartToReturnDto>(partsParams.PageIndex, 
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

        [HttpPost("add-photo/{partId}")]
        public async Task<ActionResult<PartPhotoDto>> AddPhoto([FromForm] IFormFile file,
        [FromRoute] int partId)
        {
            var part = await _partsRepo.GetByIdAsync(partId);

            var result = await _photoService.AddPhotoAsync(file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            var photo = new PartPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                Part = part,
                PartId = part.Id
            };

            var spec = new PartWithPhotosSpecification(partId);

            Part partWithPhotos = await _partsRepo.GetEntityWithSpecAsync(spec);

            if(partWithPhotos.Photos.Count == 0) photo.IsMain = true;

            part.Photos.Add(photo);

            if(await _partsRepo.SaveAllAsync())
            {
                return CreatedAtRoute("GetPart", new {id = partId}, _mapper.Map<PartPhotoDto>(photo));
            }

            return BadRequest("failed to add photo");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePart(int id)
        {
            var part = await _partsRepo.GetByIdAsync(id);

            if(part == null) return NotFound(new ApiResponse(404));

            _partsRepo.Delete(part);

            if(await _partsRepo.SaveAllAsync()) return Ok();

            return BadRequest("failed to delete part");
        }

        [Authorize]
        [HttpPut("update/{id}")]
        public async Task<ActionResult<PartToReturnDto>> UpdatePart(int id, [FromBody] 
        PartDto newPartDto)
        {
            var spec = new PartsSpecification(id);

            var part = await _partsRepo.GetEntityWithSpecAsync(spec);

            _mapper.Map(newPartDto, part);

            _partsRepo.Update(part);

            if(await _partsRepo.SaveAllAsync()) return Ok(_mapper.Map<PartToReturnDto>(part));

            return BadRequest("failed to update part");
        }
    }
}