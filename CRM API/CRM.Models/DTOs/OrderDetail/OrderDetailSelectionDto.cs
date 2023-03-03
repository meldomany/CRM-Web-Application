using CRM.Models.DTOs.OrderHeader;
using CRM.Models.DTOs.Product;
using System.ComponentModel.DataAnnotations;

namespace CRM.Models.DTOs.OrderDetail
{
    public class OrderDetailSelectionDto : OrderDetailDto
    {
        public int Id { get; set; }

        [Required]
        public int OrderHeaderId { get; set; }
        public OrderHeaderSelectionDto OrderHeader { get; set; }
        public ProductSelectionDto Product { get; set; }
    }
}
