using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        private readonly IGenericRepository<Photo> _photosRepo;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IPhotoService _photoService;
        public PhotosController(IGenericRepository<Photo> photosRepo, IMapper mapper,
        IGenericRepository<Product> productRepo, IPhotoService photoService)
        {
            _photoService = photoService;
            _productRepo = productRepo;
            _mapper = mapper;
            _photosRepo = photosRepo;
            
        }

    
    [HttpGet("{productId}")]
    public async Task<ActionResult<IReadOnlyList<PhotoDto>>> GetPhotosOfProductAsync(int productId)
    {
        var spec = new PhotosOfProductSpecification(productId);

        return _mapper.Map<PhotoDto[]>(await _photosRepo.ListAsync(spec));
    }

    [HttpPut("set-main-photo/{productId}-{photoId}")]
    public async Task<ActionResult> SetMainPhoto(int productId, int photoId)
    {
        var spec = new PhotosOfProductSpecification(productId);

        var photos = await _photosRepo.ListAsync(spec);

        var mainPhoto = photos.FirstOrDefault(x => x.Id == photoId);

        if (mainPhoto.IsMain) return BadRequest("This is already Main Photo");

        var currentMainPhoto = photos.FirstOrDefault(x => x.IsMain);

        if (currentMainPhoto != null) currentMainPhoto.IsMain = false;

        mainPhoto.IsMain = true;

        if (await _photosRepo.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to set Main Photo");
    }

    [HttpDelete("{productId}-{photoId}")]
    public async Task<ActionResult> DeletePhoto(int productId, int photoId)
    {
        var product = await _productRepo.GetByIdAsync(productId);

        var photo = await _photosRepo.GetByIdAsync(photoId);

        if (photo == null) return NotFound();

        if (photo.IsMain) return BadRequest("You Cant delete main photo");

        if (photo.PublicId != null)
        {
            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if(result.Error != null) return BadRequest(result.Error.Message);
        }

        product.Photos.Remove(photo);

        if(await _productRepo.SaveAllAsync()) return Ok();

        return BadRequest("Failed to delete photo");
    }
}
}