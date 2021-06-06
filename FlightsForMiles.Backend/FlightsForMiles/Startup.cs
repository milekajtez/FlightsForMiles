using FlightsForMiles.BLL.Contracts.Services.Airline;
using FlightsForMiles.BLL.Contracts.Services.Destination;
using FlightsForMiles.BLL.Contracts.Services.Discount;
using FlightsForMiles.BLL.Contracts.Services.Flight;
using FlightsForMiles.BLL.Contracts.Services.Friendship;
using FlightsForMiles.BLL.Contracts.Services.Help;
using FlightsForMiles.BLL.Contracts.Services.Ticket;
using FlightsForMiles.BLL.Contracts.Services.User;
using FlightsForMiles.BLL.Services;
using FlightsForMiles.DAL;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.login_and_registration;
using FlightsForMiles.DAL.Modal;
using FlightsForMiles.DAL.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        [Obsolete]
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            //Inject ApplicationSettings and MailSettings
            services.Configure<ApplicationSettings>(Configuration.GetSection("ApplicationSettings"));
            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));

            //Database connection settings
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("IdentityConnection"),
                    x => x.MigrationsAssembly("FlightsForMiles.DAL")));
            services.AddDefaultIdentity<RegisteredUser>().AddRoles<IdentityRole>().
                AddEntityFrameworkStores<ApplicationDbContext>();

            // Settings about identity
            services.Configure<IdentityOptions>(options => {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 8;

                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+/ ";
            });

            services.AddCors();

            //Jwt Authentication
            var key = Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_Secret"].ToString());
            services.AddAuthentication(x =>
            {
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });

            // settings for dependecy injection

            // user service and repository
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();

            // discount service and repository
            services.AddScoped<IDiscountService, DiscountService>();
            services.AddScoped<IDiscountRepository, DiscountRepository>();

            // airline service and repository
            services.AddScoped<IAirlineService, AirlineService>();
            services.AddScoped<IAirlineRepository, AirlineRepository>();

            // destination service and repository
            services.AddScoped<IDestinationService, DestinationService>();
            services.AddScoped<IDestinationRepository, DestinationRepository>();

            // help service and repository
            services.AddScoped<IHelpService, HelpService>();
            services.AddScoped<IHelpRepository, HelpRepository>();

            // flight service and repository
            services.AddScoped<IFlightService, FlightService>();
            services.AddScoped<IFlightRepository, FlightRepository>();

            // ticket service and repository
            services.AddScoped<ITicketService, TicketService>();
            services.AddScoped<ITicketRepository, TicketRepository>();

            //friendship service and repository
            services.AddScoped<IFriendshipService, FriendshipService>();
            services.AddScoped<IFriendshipRepository, FriendshipRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Use(async (ctx, next) =>
            {
                await next();
                if (ctx.Response.StatusCode == 204)
                {
                    ctx.Response.ContentLength = 0;
                }
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder => builder.WithOrigins(Configuration["ApplicationSettings:Client_URL"].ToString())
            .AllowAnyHeader()
            .AllowAnyMethod()
            );

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
