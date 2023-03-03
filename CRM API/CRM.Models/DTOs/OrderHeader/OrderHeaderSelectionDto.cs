using CRM.Models.DTOs.Customer;
using CRM.Models.DTOs.OrderDetail;

namespace CRM.Models.DTOs.OrderHeader
{
    public class OrderHeaderSelectionDto : OrderHeaderDto
    {
        public int Id { get; set; }
        public CustomerSelectionDto Customer { get; set; }
        public List<OrderDetailSelectionDto> OrderDetails { get; set; }
    }
}
