using CRM.DataAccess.Data;
using CRM.DataAccess.Repository.IRepository;
using CRM.Models;
using Microsoft.EntityFrameworkCore;

namespace CRM.DataAccess.Repository
{
    public class AddressRepository : IAddressRepository
    {
        private readonly ApplicationDbContext _context;

        public AddressRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Address>> GetBillingAddressForCustomer(int customerId)
        {
            if(customerId > 0)
            {
                return await _context.Addresses.Where(e => e.CustomerId == customerId && e.BillingAddress == true).ToListAsync();
            }
            return null;
        }

        public async Task<IEnumerable<Address>> GetShippingAddressForCustomer(int customerId)
        {
            if (customerId > 0)
            {
                return await _context.Addresses.Where(e => e.CustomerId == customerId && e.ShippingAddress == true).ToListAsync();
            }
            return null;
        }
    }
}
