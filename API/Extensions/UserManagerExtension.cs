using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtension
    {
        //example of adding an extension with include
        public static async Task<AppUser> FindUserByClaimsPrincipleWithIncludeAsync(this UserManager<AppUser> input,
        ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            return await input.Users.Include(x => x.Address2).SingleOrDefaultAsync(x => x.Email ==
            email);
        }

        public static async Task<AppUser> FindUserByEmailFromClaimsPrinciple(this UserManager<AppUser>
        input, ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
        }

    }
}