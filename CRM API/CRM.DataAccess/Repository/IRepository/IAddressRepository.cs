using CRM.Models;
using CRM.Models.DTOs.Address;

namespace CRM.DataAccess.Repository.IRepository
{
    public interface IAddressRepository
    {
        Task<IEnumerable<Address>> GetShippingAddressForCustomer(int customerId);
        Task<IEnumerable<Address>> GetBillingAddressForCustomer(int customerId);
    }
}
