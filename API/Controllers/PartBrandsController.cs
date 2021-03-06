using System.Threading.Tasks;
using API.Helpers;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PartBrandsController : BaseApiController
    {
        private readonly IGenericRepository<PartBrand> _partBrandRepo;

        public PartBrandsController(IGenericRepository<PartBrand> partBrandRepo)
        {
            _partBrandRepo = partBrandRepo;


        }

        [HttpPost("add-new-brand/{brandName}")]
        public async Task<ActionResult<PartBrand>> AddNewPartBrand(string brandName)
        {
            if (brandName != null)
            {
                PartBrand newBrand = new PartBrand
                {
                    Name = brandName
                };

                await _partBrandRepo.AddAsync(newBrand);

                if(await _partBrandRepo.SaveAllAsync()) return Ok(newBrand);
            }

            return BadRequest("failed to add new Part Brand");
        }

        [HttpGet("{id}", Name = "GetPartBrand")]
        public async Task<ActionResult<PartBrand>> GetBrand(int id)
        {
            return Ok(await _partBrandRepo.GetByIdAsync(id));
        }



        [HttpGet("get-all-raw")]
        public async Task<ActionResult<PartBrand>> GetBrands()
        {
            return Ok(await _partBrandRepo.ListAllAsync());
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<PartBrand>>> GetPaginatedPartBrands( [FromQuery]
            PartBrandSpecParams partTypeSpecParams)
        {
            var spec = new PartBrandSpecification(partTypeSpecParams.PageIndex,
            partTypeSpecParams.pageSize);

            var totalItems = await _partBrandRepo.CountAsync(spec);

            var data = await _partBrandRepo.ListAllAsync();

            return Ok(new Pagination<PartBrand>(partTypeSpecParams.PageIndex,
            partTypeSpecParams.pageSize, totalItems, data));
        } 
    }
}