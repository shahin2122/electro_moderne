using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using API.Errors;
using API.Helpers;
using Core.Specifications;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{
    public class BlogsController : BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public BlogsController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }

        [HttpPost]
        public async Task<ActionResult<Blog>> CreateNewBlog([FromBody] BlogDto blogdto)
        {
            if(ModelState.IsValid)
            {
              Blog newBlog = _mapper.Map<Blog>(blogdto);

              await _unitOfWork.Repository<Blog>().AddAsync(newBlog);

              if(await _unitOfWork.Repository<Blog>().SaveAllAsync()) return Ok(newBlog);
            }

            return BadRequest("failed to add new blog");
            
        }

        [HttpGet("{id}", Name = "GetBlog")]
        public async Task<ActionResult<BlogDto>> GetBlog(int id)
        {
            var spec = new BlogWithPhotoSpecification(id);

            var blog = await _unitOfWork.Repository<Blog>().GetEntityWithSpecAsync(spec);

            if(blog == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<BlogDto>(blog);
        }

        [HttpGet("get-by-title/{title}")]
        public async Task<ActionResult<BlogToReturnDto>> GetBlogByTitle(string title)
        {
            title = title.Replace("-", " ");

            var spec = new BlogSpecification(title);

            var blog = await _unitOfWork.Repository<Blog>().GetEntityWithSpecAsync(spec);

            if(blog == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<BlogToReturnDto>(blog);
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<BlogToReturnDto>>> GetBlogs([FromQuery] 
        BlogSpecParams blogParams)
        {
            var spec = new BlogSpecification(blogParams);

            var countSpec = new BlogsForCountSpecification(blogParams);

            var totalItems = await _unitOfWork.Repository<Blog>().CountAsync(countSpec);

            var blogs = await _unitOfWork.Repository<Blog>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Blog>, IReadOnlyList<BlogToReturnDto>>(blogs);

            return Ok(new Pagination<BlogToReturnDto>(blogParams.PageIndex, blogParams.pageSize,
            totalItems,data));
        }

        [Authorize]
        [HttpPut("update/{id}")]
        public async Task<ActionResult<BlogToReturnDto>> UpdateBlog(int id, [FromBody]
        BlogDto newBLogDto)
        {
            var spec = new BlogWithPhotoSpecification(id);

            var blog = await _unitOfWork.Repository<Blog>().GetEntityWithSpecAsync(spec);

            _mapper.Map(newBLogDto, blog);

            _unitOfWork.Repository<Blog>().Update(blog);

            if(await _unitOfWork.Repository<Blog>().SaveAllAsync()) return Ok
                (_mapper.Map<BlogToReturnDto>(blog));

            return BadRequest("failed to update blog");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBlog(int id)
        {
            var blog = await _unitOfWork.Repository<Blog>().GetByIdAsync(id);

            if(blog == null) return NotFound(new ApiResponse(404));

            _unitOfWork.Repository<Blog>().Delete(blog);

            if(await _unitOfWork.Repository<Blog>().SaveAllAsync()) return Ok();

            return BadRequest("failed to delete blog");
        }


        [HttpPost("add-photo/{blogId}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto([FromForm] IFormFile file,
        [FromRoute] int blogId)
        {
            var blog = await _unitOfWork.Repository<Blog>().GetByIdAsync(blogId);

            if(blog == null) return NotFound(new ApiResponse(404)); 

            var result = await _photoService.AddPhotoAsync(file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            var photo = new BlogPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                Blog = blog,
                BlogId = blogId

            };

            var spec = new BlogWithPhotoSpecification(blogId);

            Blog BlogWithPhoto = await _unitOfWork.Repository<Blog>().GetEntityWithSpecAsync(spec);

            blog.Photo = photo;

            if(await _unitOfWork.Repository<Blog>().SaveAllAsync())
            {
                return CreatedAtRoute("GetBlog", new { id = blogId}, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("failed to add photo");
        }


        [HttpDelete("delete-photo/{blogId}")]
        public async Task<ActionResult> DeletePhoto(int blogId)
        {
            var spec = new BlogWithPhotoSpecification(blogId);

            Blog BlogWithPhoto = await _unitOfWork.Repository<Blog>().GetEntityWithSpecAsync(spec);

            if(BlogWithPhoto.Photo == null) return NotFound(new ApiResponse(404));

            if(BlogWithPhoto.Photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(BlogWithPhoto.Photo.PublicId);
                if(result.Error != null) return BadRequest(result.Error.Message);
            }
    
            BlogWithPhoto.Photo = null;

            if(await _unitOfWork.Repository<Blog>().SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete photo");
        }

    } 

}