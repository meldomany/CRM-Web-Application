using CRM.Models.DTOs.OrderHeader;
using CRM.Models.DTOs.Product;
using System.ComponentModel.DataAnnotations;

namespace CRM.Models.DTOs.OrderDetail
{
    public class OrderDetailEditionDto : OrderDetailDto
    {
        public int Id { get; set; }

        [Required]
        public int OrderHeaderId { get; set; }
        public OrderHeaderEditionDto OrderHeader { get; set; }

        public ProductEditionDto Product { get; set; }
    }
}
