using System.Threading.Tasks;
using API.Helpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.Specifications;

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

        [HttpGet("{id}", Name = "GetType")]
        public async Task<ActionResult<ProductType>> GetType(int id)
        {
            
            return Ok(await _typeRepo.GetByIdAsync(id));
        }

        [HttpGet("get-all-raw")]
        public async Task<ActionResult<ProductType>> GetTypes()
        {
            return Ok(await _typeRepo.ListAllAsync());
        }
    }
}