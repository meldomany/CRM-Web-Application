using CRM.DataAccess.Data;
using Microsoft.EntityFrameworkCore;

namespace CRM.API.Extentions
{
    public static class DatabaseExtentions
    {
        public static IServiceCollection AddDatabaseServicesExtention(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });
            return services;
        }
    }
}
