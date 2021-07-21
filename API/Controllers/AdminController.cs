using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        

        public AdminController(UserManager<AppUser> userManager,
         IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult<UserDto>> GetUsersWithRoles([FromQuery] UserWithRoleSpecParams userParams)
        {


            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.UserName)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    DisplayName = u.UserName,
                    Email = u.Email,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            var totalItems = users.Count;

            var data = _mapper.Map<IReadOnlyList<UserDto>>(users);

            return Ok(new Pagination<UserDto>(userParams.PageIndex,
            userParams.pageSize, totalItems, users));
        }

       // [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("repairmans")]
        public async Task<IReadOnlyList<UserDto>> GetRepairmans()
        {

            var repairmans = await _userManager.GetUsersInRoleAsync("Repairman");

            return  _mapper.Map<IReadOnlyList<UserDto>>(repairmans);  
  
        }

        [Authorize(Policy = "RepairAdminRole")]
        [HttpGet("create-offvoice")]
        public ActionResult CreateOffvoice()
        {
            return Ok("only admins and reapir mans can see this");
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-roles/{email}")]
        public async Task<ActionResult> EditRoles(string email, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByEmailAsync(email);

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed To Add To Roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }


    }
}