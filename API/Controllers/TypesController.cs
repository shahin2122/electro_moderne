using System.Threading.Tasks;
using API.Helpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.Specifications;
using API.Errors;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class TypesController : BaseApiController
    {
        private readonly IGenericRepository<ProductType> _typeRepo;
        public TypesController(IGenericRepository<ProductType> typeRepo)
        {
             _typeRepo = typeRepo;
         }


        [HttpPost("add-new-type/{typeName}")]
        public async Task<ActionResult<ProductType>> AddNewProductType(string typeName)
        {
            if(typeName != null)
            {
                ProductType NewType = new ProductType
                {
                    Name = typeName
                };

                await _typeRepo.AddAsync(NewType);

                if(await _typeRepo.SaveAllAsync()) return Ok(NewType);
            }

            return BadRequest("failed to add new product type");
        }

        //[Cached(400)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductType>>> GetTypes([FromQuery] 
            ProductTypeSpecParams productTypeParams)
        {
            var spec = new ProductTypeSpecification(productTypeParams.PageIndex , 
            productTypeParams.pageSize);

            var totalItems = await _typeRepo.CountAsync(spec);

            var data = await _typeRepo.ListAllAsync();

            return Ok(new Pagination<ProductType>(productTypeParams.PageIndex,
            productTypeParams.pageSize, totalItems, data));

        }

        //[Cached(400)]
        [HttpGet("{id}", Name = "GetType")]
        public async Task<ActionResult<ProductType>> GetType(int id)
        {
            
            return Ok(await _typeRepo.GetByIdAsync(id));
        }

       // [Cached(400)]
        [HttpGet("get-all-raw")]
        public async Task<ActionResult<ProductType>> GetTypes()
        {
            return Ok(await _typeRepo.ListAllAsync());
        }

        [Authorize]
        [HttpPost("update/{typeId}/{newName}")]
        public async Task<ActionResult<ProductType>> UpdateType( int typeId, string newName)
        {
            var type = await _typeRepo.GetByIdAsync(typeId);

            type.Name = newName;

            _typeRepo.Update(type);

            if(await _typeRepo.SaveAllAsync()) return Ok(type);

            return BadRequest(new ApiResponse(400, "failed to update product type"));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteType(int id)
        {
            var type = await _typeRepo.GetByIdAsync(id);

            if(type == null) return NotFound();

            _typeRepo.Delete(type);
            if(await _typeRepo.SaveAllAsync()) return Ok();

            return BadRequest("Failed To delete Type");
        }
    }
}