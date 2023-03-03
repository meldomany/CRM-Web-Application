using CRM.Models.DTOs.OrderHeader;
using CRM.Models.DTOs.Product;

namespace CRM.Models.DTOs.OrderDetail
{
    public class OrderDetailCreationDto : OrderDetailDto
    {
        public OrderHeaderCreationDto OrderHeader { get; set; }

        public ProductCreationDto Product { get; set; }
    }
}
