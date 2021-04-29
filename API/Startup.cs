
using System.Linq;
using API.Errors;
using API.Extensions;
using API.Middleware;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;
using Pomelo.EntityFrameworkCore.MySql;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;


        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationServices(_config);

            services.AddIdentityServices(_config);

            services.AddControllers().AddNewtonsoftJson();

            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });

            services.AddSingleton<IConnectionMultiplexer>(c => {
                var configuration = ConfigurationOptions.Parse(_config
                .GetConnectionString("Redis"), true);
                return  ConnectionMultiplexer.Connect(configuration);
            });

            services.AddDbContext<AppIdentityDbContext>(x => 
                x.UseNpgsql(
                    _config.GetConnectionString("IdentityConnection")));
                

            services.Configure<ApiBehaviorOptions>(options => {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();
                    
                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };
                    return new BadRequestObjectResult(errorResponse);
                };
                
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Electro Moderne API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseCors("CorsPolicy");

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
