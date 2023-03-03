using CRM.DataAccess.Data;
using CRM.DataAccess.Repository.IRepository;
using CRM.Models;
using Microsoft.EntityFrameworkCore;

namespace CRM.DataAccess.Repository
{
    public class OrderHeaderRepository : IOrderHeaderRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderHeaderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateOrderHeader(OrderHeader orderHeader)
        {
            await _context.OrderHeaders.AddAsync(orderHeader);
            if(await _context.SaveChangesAsync() >= 0)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteOrderDetail(int orderDetailId)
        {

            var orderDetail =  await _context.OrderDetails.FindAsync(orderDetailId);

            var orderHeader = await _context.OrderHeaders.FindAsync(orderDetail.OrderHeaderId);
            orderHeader.SubTotal -= orderDetail.TotalPrice;
            orderHeader.GrandTotal -= orderDetail.TotalPrice - (14 / 100);
            if(orderHeader.GrandTotal < 0)
            {
                orderHeader.GrandTotal = 0;
            }
            _context.OrderHeaders.Update(orderHeader);

            if(orderDetail != null)
            {
                _context.OrderDetails.Remove(orderDetail);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<OrderHeader> GetOrderHeader(int id)
        {
            var orderHeader = await _context.OrderHeaders.Include(e => e.OrderDetails).FirstOrDefaultAsync(e => e.Id == id);
            if(orderHeader != null)
            {
                return orderHeader;
            }
            return null;
        }

        public async Task<IEnumerable<OrderHeader>> GetOrderHeaders()
        {
            return await _context.OrderHeaders.ToListAsync();
        }

        public async Task<bool> UpdateOrderHeader(OrderHeader orderHeader)
        {
            _context.OrderHeaders.Update(orderHeader);
            if (await _context.SaveChangesAsync() >= 0)
            {
                return true;
            }
            return false;
        }
    }
}
