using CRM.DataAccess.Data;
using CRM.DataAccess.Repository.IRepository;
using CRM.Models;
using Microsoft.EntityFrameworkCore;

namespace CRM.DataAccess.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateProduct(Product product)
        {
            if(product != null)
            {
                await _context.Products.AddAsync(product);
                if(await _context.SaveChangesAsync() >= 0)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<Product> GetProduct(int productId)
        {
            if(productId != 0)
            {
                return await _context.Products.FindAsync(productId);
            }
            return null;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<bool> ProductExists(string productName)
        {
            if(await _context.Products.AnyAsync(p => p.Name == productName))
            {
                return true;
            }
            return false;
        }

        public async Task<bool> ProductExistsEntity(int productId, string productName)
        {
            var products = await _context.Products.Where(e => e.Id != productId).ToListAsync();
            if (products.Any(p => p.Name == productName))
            {
                return true;
            }
            return false;
        }

        public async Task<bool> UpdateProduct(Product product)
        {
            if(product != null)
            {
                _context.Products.Update(product);
                if(await _context.SaveChangesAsync() >= 0)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
