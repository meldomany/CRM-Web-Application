using CRM.Models;

namespace CRM.DataAccess.Repository.IRepository
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetCustomers();
        Task<Customer> GetCustomer(string customerCode);
        Task<bool> CreateCustomer(Customer customer);
        Task<bool> EditCustomer(Customer customer);
        Task<bool> CodeExists(string code);
        Task<bool> CodeExistsEntity(int customerId, string code);
        Task<bool> DeleteAddress(int addressId);
        Task<IEnumerable<Customer>> GetCustomersSelectBox();
    }
}