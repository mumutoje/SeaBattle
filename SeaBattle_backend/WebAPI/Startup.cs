using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.ShipPositioningLogic;

namespace WebAPI
{
    public class Startup
    {
        
        public void ConfigureServices(IServiceCollection services)
        {
            string con = "Server=(localdb)\\mssqllocaldb;Database=usersdbstore;Trusted_Connection=True";

            services.AddCors();

            
            services.AddDbContext<MyBaseContext>(options => options.UseSqlServer(con));

            services.AddControllers();


        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseCors(options =>
            options.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());

            app.UseDeveloperExceptionPage();
            
            app.UseRouting();

            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                
            });
            
        }
    }
}
