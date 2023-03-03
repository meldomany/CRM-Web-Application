using CRM.Models.DTOs.Customer;
using CRM.Models.DTOs.OrderDetail;

namespace CRM.Models.DTOs.OrderHeader
{
    public class OrderHeaderEditionDto : OrderHeaderDto
    {
        public int Id { get; set; }
        public CustomerEditionDto Customer { get; set; }
        public List<OrderDetailEditionDto> OrderDetails { get; set; }
    }
}
