using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using API.Errors;

namespace API.Controllers
{
    public class PartTypesController : BaseApiController
    {
        private readonly IGenericRepository<PartType> _partTypeRepo;
        public PartTypesController(IGenericRepository<PartType> partTypeRepo)
        {
            _partTypeRepo = partTypeRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<PartType>>> GetPaginatedPartBrands( [FromQuery]
            PartTypeSpecParams partTypeSpecParams)
        {
            var spec = new PartTypeSpecification(partTypeSpecParams.PageIndex,
            partTypeSpecParams.pageSize);

            var totalItems = await _partTypeRepo.CountAsync(spec);

            var data = await _partTypeRepo.ListAllAsync();

            return Ok(new Pagination<PartType>(partTypeSpecParams.PageIndex,
            partTypeSpecParams.pageSize, totalItems, data));
        }



        [HttpPost("add-new-type/{typeName}")]
        public async Task<ActionResult<PartType>> AddNewPartType(string typeName)
        {
            if(typeName != null)
            {
                PartType newType = new PartType
                {
                    Name = typeName
                };

                await _partTypeRepo.AddAsync(newType);

                if(await _partTypeRepo.SaveAllAsync()) return Ok(newType);
            }

            return BadRequest("failed to add new part type");
        }

        [HttpGet("{id}", Name = "GetPartType")]
        public async Task<ActionResult<PartType>> GetPartType(int id)
        {
            return Ok(await _partTypeRepo.GetByIdAsync(id));
        }

        [HttpGet("get-all-raw")]
        public async Task<ActionResult<PartType>> GetPartTypes()
        {
            return Ok(await _partTypeRepo.ListAllAsync());
        }

        [Authorize]
        [HttpPost("update/{typeId}/{newName}")]
        public async Task<ActionResult<ProductType>> UpdateType( int typeId, string newName)
        {
            var type = await _partTypeRepo.GetByIdAsync(typeId);

            type.Name = newName;

            _partTypeRepo.Update(type);

            if(await _partTypeRepo.SaveAllAsync()) return Ok(type);

            return BadRequest(new ApiResponse(400, "failed to update part type"));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteType(int id)
        {
            var type = await _partTypeRepo.GetByIdAsync(id);

            if(type == null) return NotFound();

            _partTypeRepo.Delete(type);
            if(await _partTypeRepo.SaveAllAsync()) return Ok();

            return BadRequest("Failed To delete Type");
        }

    }
}