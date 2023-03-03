using CRM.Models.DTOs.Customer;
using CRM.Models.DTOs.OrderDetail;

namespace CRM.Models.DTOs.OrderHeader
{
    public class OrderHeaderCreationDto : OrderHeaderDto
    {
        public CustomerCreationDto Customer { get; set; }
        public List<OrderDetailCreationDto> OrderDetails { get; set; }
    }
}
