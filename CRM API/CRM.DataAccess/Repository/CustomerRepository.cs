using CRM.DataAccess.Data;
using CRM.DataAccess.Repository.IRepository;
using CRM.Models;
using Microsoft.EntityFrameworkCore;

namespace CRM.DataAccess.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext _context;

        public CustomerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CodeExists(string code)
        {
            if(await _context.Customers.AnyAsync(e => e.Code == code))
            {
                return true;
            }
            return false;
        }

        public async Task<bool> CodeExistsEntity(int customerId, string code)
        {
            var customers = await _context.Customers.Where(e => e.Id != customerId).Select(e => e.Code).ToListAsync();
            if (customers.Contains(code))
            {
                return true;
            }
            return false;
        }

        public async Task<bool> CreateCustomer(Customer customer)
        {
            await _context.Customers.AddAsync(customer);
            if(await _context.SaveChangesAsync() >= 0)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteAddress(int addressId)
        {
            var address = await _context.Addresses.FindAsync(addressId);
            _context.Addresses.Remove(address);
            if(await _context.SaveChangesAsync() >= 0)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> EditCustomer(Customer customer)
        {
            _context.Customers.Update(customer);
            if (await _context.SaveChangesAsync() >= 0)
            {
                return true;
            }
            return false;
        }

        public async Task<Customer> GetCustomer(string customerCode)
        {
            var customer = await _context.Customers.Include(c => c.Addresses).FirstOrDefaultAsync(e => e.Code == customerCode);
            if(customer != null)
            {
                return customer;
            }
            return null;
        }

        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<IEnumerable<Customer>> GetCustomersSelectBox()
        {
            return await _context.Customers.Where(e => e.Status == true).ToListAsync();
        }
    }
}
