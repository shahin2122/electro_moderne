using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.Specifications;
using API.Helpers;
using Microsoft.AspNetCore.Authorization;
using API.Errors;

namespace API.Controllers
{
    public class BrandsController : BaseApiController
    {
        private readonly IGenericRepository<ProductBrand> _brandsRepo;
        public BrandsController(IGenericRepository<ProductBrand> brandsRepo)
        {
            _brandsRepo = brandsRepo;

        }

        // [Cached(400)]
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

       // [Cached(400)]
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

       // [Cached(400)]
        [HttpGet("get-all-raw")]
        public async Task<ActionResult<ProductBrand>> GetBrands()
        {
            return Ok(await _brandsRepo.ListAllAsync());
        }

        [Authorize]
        [HttpPost("update/{brandId}/{newName}")]
        public async Task<ActionResult<ProductBrand>> UpdateBrand(int brandId, string newName)
        {
            var brand = await _brandsRepo.GetByIdAsync(brandId);

            brand.Name = newName;

            _brandsRepo.Update(brand);

            if(await _brandsRepo.SaveAllAsync()) return Ok(brand);

            return BadRequest(new ApiResponse(400, "failed to update product brand"));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBrand(int id)
        {
            var brand = await _brandsRepo.GetByIdAsync(id);

            if(brand == null)  return NotFound();

            _brandsRepo.Delete(brand);

            if(await _brandsRepo.SaveAllAsync()) return Ok();

            return BadRequest(new ApiResponse(400, "failed to delete product brand"));
        }
    }
}