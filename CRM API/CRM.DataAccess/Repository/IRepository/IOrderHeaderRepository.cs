using CRM.Models;

namespace CRM.DataAccess.Repository.IRepository
{
    public interface IOrderHeaderRepository
    {
        Task<IEnumerable<OrderHeader>> GetOrderHeaders();
        Task<OrderHeader> GetOrderHeader(int id);
        Task<bool> CreateOrderHeader(OrderHeader orderHeader);
        Task<bool> UpdateOrderHeader(OrderHeader orderHeader);
        Task<bool> DeleteOrderDetail(int orderDetailId);
    }
}
