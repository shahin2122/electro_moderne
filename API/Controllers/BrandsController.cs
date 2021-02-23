using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<ProductBrand>> GetBrands()
        {
            return Ok(await _brandsRepo.ListAllAsync());
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
    }
}