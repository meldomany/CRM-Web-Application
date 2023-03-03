using CRM.Models;

namespace CRM.DataAccess.Repository.IRepository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProducts();
        Task<Product> GetProduct(int productId);
        Task<bool> CreateProduct(Product product);
        Task<bool> UpdateProduct(Product product);
        Task<bool> ProductExists(string productName);
        Task<bool> ProductExistsEntity(int productId, string productName);
    }
}
