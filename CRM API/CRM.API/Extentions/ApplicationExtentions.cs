using CRM.DataAccess.Repository;
using CRM.DataAccess.Repository.IRepository;
using CRM.Services.AutoMapper;

namespace CRM.API.Extentions
{
    public static class ApplicationExtentions
    {
        public static IServiceCollection AddApplicationServicesExtention(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(typeof(Mappings).Assembly);

            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<IAddressRepository, AddressRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IOrderHeaderRepository, OrderHeaderRepository>();

            return services;
        }
    }
}
