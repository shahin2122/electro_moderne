using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.Specifications;
using API.Helpers;

namespace API.Controllers
{
    public class BrandsController : BaseApiController
    {
        private readonly IGenericRepository<ProductBrand> _brandsRepo;
        public BrandsController(IGenericRepository<ProductBrand> brandsRepo)
        {
            _brandsRepo = brandsRepo;

        }


        [HttpGet]
        public async Task<ActionResult<ProductBrand>> GetBrands([FromQuery] 
        ProductBrandSpecParams productBrandParams)
        {
            var spec = new ProductBrandSpecification(productBrandParams.PageIndex, 
            productBrandParams.pageSize);

            var totalItems = await _brandsRepo.CountAsync(spec);

            var data = await _brandsRepo.ListAllAsync();

            return Ok( new Pagination<ProductBrand>(productBrandParams.PageIndex,
                productBrandParams.pageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductBrand>> GetBrand(int id)
        {
            return Ok(await _brandsRepo.GetByIdAsync(id));
        }

        [HttpPost("add-new-brand/{brandName}")]
        public async Task<ActionResult<ProductBrand>> AddNewProductBrand(string brandName)
        {
            if(brandName != null)
            {
                ProductBrand newBrand = new ProductBrand
                {
                    Name = brandName
                };

                await _brandsRepo.AddAsync(newBrand);

                if(await _brandsRepo.SaveAllAsync()) return Ok(newBrand);
            }

            return BadRequest("failed to add new brand");
        }

        [HttpGet("get-all-raw")]
        public async Task<ActionResult<ProductBrand>> GetBrands()
        {
            return Ok(await _brandsRepo.ListAllAsync());
        }
    }
}