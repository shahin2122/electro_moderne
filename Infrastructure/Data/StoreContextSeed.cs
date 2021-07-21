using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedDeliveryMethods(StoreContext storeContext)
        {
            if(await storeContext.DeliveryMethods.AnyAsync()) return;

            var methods = new List<DeliveryMethod>
            {
                new DeliveryMethod{
                    DeliveryTime = "No Delivery",
                    Price = 0,
                    ShortName = "No Delivery",
                    Description = "In Case You Want To Come Over And Take Your Stuff Yourself!"
                },
                new DeliveryMethod{
                    DeliveryTime = "From 1 to 2 days",
                    Price = 50,
                    ShortName = "Normal Delivery",
                    Description = "We Will Deliver One Big Stuff for You Within 30kms around our Shop."
                },

            };

            foreach(var method in methods)
            {
                await storeContext.DeliveryMethods.AddAsync(method);
            }

            

          
            await storeContext.SaveChangesAsync();
        }
    }
}