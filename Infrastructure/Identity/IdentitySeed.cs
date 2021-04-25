using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity
{
    public class IdentitySeed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, 
        RoleManager<AppRole> roleManager)
        {
            if(await userManager.Users.AnyAsync()) return;

            var admin = new AppUser
            {
                Email = "shahin2122@gmail.com",
                FirstName = "Shahin",
                LastName = "Mohammadpur",
                EmailConfirmed = true,
                UserName = "admin",
                Address1 = "Add re ss, 1 for, admin",
                Provider = "Internal"
            };

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "RepairMan"},
               
            };

            foreach(var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            await userManager.CreateAsync(admin, "X7n33d5or28s");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "RepairMan"});

        }
    }
}