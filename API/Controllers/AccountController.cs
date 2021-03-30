using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;

        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        IMapper mapper, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
          

            var user = await _userManager.FindUserByEmailFromClaimsPrinciple(HttpContext.User);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.UserName
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            
            if (user == null) return Unauthorized("Email Not Found");

           if(loginDto.Provider != "GOOGLE")
           {
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password,
            false);

            if (!result.Succeeded) return Unauthorized("Password is not correct");
            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.UserName,
                Address1 = user.Address1
            };

           }
           
           await _signInManager.SignInAsync(user,true,default);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.UserName,
                Address1 = user.Address1
            };
        }



        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(CheckEmailExistAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestResult();
            }

            var user = new AppUser
            {
                UserName = registerDto.DisplayName,
                Email = registerDto.Email,
                Provider = registerDto.Provider
            };

            if(user.Provider == "GOOGLE")
            {
                user.EmailConfirmed = true;
            }
           
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult =  await _userManager.AddToRoleAsync(user, "Member");

            if(!roleResult.Succeeded) return BadRequest(result.Errors);

           

            return new UserDto
            {
                DisplayName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email,
                Provider = user.Provider,
                EmailConfirmed = user.EmailConfirmed
            };
        }

        [HttpPost("external-login")]
        public async Task<ActionResult<UserDto>> ExternalLogin(LoginDto externalUser)
        {
            if (externalUser == null) return Unauthorized("Wrong USer");

            if (await UserExists(externalUser.Email))
            {

                return await Login(externalUser);

            }
            else
            {
                var user = new RegisterDto
                {

                    DisplayName = GenerateUsername(externalUser.Email),
                    Password = GeneratePassword(),
                    Email = externalUser.Email,
                    Provider = externalUser.Provider
                };
                return await Register(user);

            }
        }

        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithIncludeAsync(HttpContext.User);

            return _mapper.Map<AddressDto>(user);
        }


        [Authorize]
        [HttpPost("address")]
        public async Task<ActionResult<IReadOnlyList<AddressDto>>> UpdateUserAddress(AddressDto dto)
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithIncludeAsync(HttpContext.User);

            user.Address1 = dto.Address1;
            user.Address2 = dto.Address2;

            var result = await _userManager.UpdateAsync(user);

            if(result.Succeeded) return Ok(_mapper.Map<AddressDto>(user));

            return BadRequest("Problem Updating Address");
        }

        public async Task<bool> UserExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email);
        }

        private string GeneratePassword()
        {
            return "X7n33d5or28s";
        }

        private string GenerateUsername(string input)
        {
            int index = input.IndexOf("@");
            return input = input.Substring(0, index);

        }
    }
}