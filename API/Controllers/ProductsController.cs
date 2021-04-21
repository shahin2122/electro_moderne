using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {


        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _ProductTypeRepo;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
      

        public ProductsController(IGenericRepository<Product> productRepo, IGenericRepository<ProductBrand> productBrandRepo,
        IGenericRepository<ProductType> ProductTypeRepo, IMapper mapper, IPhotoService photoService)
        {
            
            _photoService = photoService;
            _mapper = mapper;
            _ProductTypeRepo = ProductTypeRepo;
            _productBrandRepo = productBrandRepo;
            _productRepo = productRepo;
        }

       // [Cached(400)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
           [FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);

            var countSpec = new ProductWithFiltersForCountSpecification(productParams);

            var totalItems = await _productRepo.CountAsync(countSpec);

            var products = await _productRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex,
            productParams.pageSize, totalItems, data));
        }

        //[Cached(400)]
        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var spec = new ProductWithPhotosSpecification(id);

            var product = await _productRepo.GetEntityWithSpecAsync(spec);

            if(product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductDto>(product);
        }

       // [Cached(600)]
        [HttpGet("get-product-with-photos/{id}")]
        public async Task<Product> GetProductWithPhotos(int id)
        {
            var spec = new ProductWithPhotosSpecification(id);

            return await _productRepo.GetEntityWithSpecAsync(spec);
        }

        [HttpPost("add-new-product")]
        public async Task<ActionResult<Product>> AddNewProduct([FromBody] ProductDto productDto)
        {
            if (ModelState.IsValid)
            {
                Product newProduct = _mapper.Map<Product>(productDto);
                
                await _productRepo.AddAsync(newProduct);

                if (await _productRepo.SaveAllAsync()) return Ok(newProduct);
            }

            return BadRequest("failed to add new product");
        }

        [HttpPost("add-photo/{productId}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto([FromForm] IFormFile file, 
        [FromRoute] int productId)
        {
            var product = await _productRepo.GetByIdAsync(productId);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                Product = product,
                ProductId = product.Id
            };

            var spec = new ProductWithPhotosSpecification(productId);

            Product productWithPhotos =  await _productRepo.GetEntityWithSpecAsync(spec);

            if(productWithPhotos.Photos.Count == 0) photo.IsMain = true;

            product.Photos.Add(photo);

            if (await _productRepo.SaveAllAsync())
            {
                return CreatedAtRoute("GetProduct", new { id = productId }, 
                _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("failed to add photo");
        }
    }
}