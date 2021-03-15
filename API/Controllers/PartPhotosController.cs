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
    public class PartPhotosController : BaseApiController
    {
        private readonly IPhotoService _photoService;
        private readonly IGenericRepository<Part> _partsRepo;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<PartPhoto> _photosRepo;
        public PartPhotosController(IGenericRepository<PartPhoto> photosRepo, IMapper mapper,
        IGenericRepository<Part> partsRepo, IPhotoService photoService)
        {
            _photosRepo = photosRepo;
            _mapper = mapper;
            _partsRepo = partsRepo;
            _photoService = photoService;
        }

        [HttpGet("{partId}")]
        public async Task<IReadOnlyList<PartPhotoDto>> GetPhotosOfPartAsync(int partId)
        {
            var spec = new PhotosOfPartSpecification(partId);

            return _mapper.Map<PartPhotoDto[]>(await _photosRepo.ListAsync(spec));
        }

        [HttpPut("set-main-photo/{partId}-{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int partId, int photoId)
        {
            var spec = new PhotosOfPartSpecification(partId);

            var photos = await _photosRepo.ListAsync(spec);

            var mainPhoto = photos.FirstOrDefault(x => x.Id == photoId);

            if(mainPhoto.IsMain) return BadRequest("This is already Main Photo");

            var currentMainPhoto = photos.FirstOrDefault(x=> x.IsMain);

            if(currentMainPhoto != null) currentMainPhoto.IsMain = false;

            mainPhoto.IsMain = true;

            if(await _photosRepo.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to set Main Photo");
        }
    [HttpDelete("{partId}-{photoId}")]
    public async Task<ActionResult> DeletePhoto(int partId, int photoId)
    {
        var part = await _partsRepo.GetByIdAsync(partId);

        var photo = await _photosRepo.GetByIdAsync(photoId);

        if(photo == null) return NotFound();

        if(photo.IsMain) return BadRequest("You Cant Delete Main Photo");

        if(photo.PublicId != null)
        {
            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if(result.Error != null) return BadRequest(result.Error.Message);
        }

        part.Photos.Remove(photo);

        if(await _partsRepo.SaveAllAsync()) return Ok();

        return BadRequest("Failed to delete photo");
    }

    }


}