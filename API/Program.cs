using System;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
           var host = CreateHostBuilder(args).Build();
           using (var scope= host.Services.CreateScope())
           {
               var services = scope.ServiceProvider;
               var loggerFactory = services.GetRequiredService<ILoggerFactory>();
               try
               {
                   var context = services.GetRequiredService<StoreContext>();
                   var identityContext = services.GetRequiredService<AppIdentityDbContext>();
                   var userManager = services.GetRequiredService<UserManager<AppUser>>();
                   var roleManager = services.GetRequiredService<RoleManager<AppRole>>();

                   await context.Database.MigrateAsync();
                   await StoreContextSeed.SeedDeliveryMethods(context);
                   await identityContext.Database.MigrateAsync();

                   await IdentitySeed.SeedUsers(userManager, roleManager);
               }
               catch (Exception ex)
               {
                   var logger = loggerFactory.CreateLogger<Program>();
                   logger.LogError(ex, "An Error Occured during migration");
               }
           }
           await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
