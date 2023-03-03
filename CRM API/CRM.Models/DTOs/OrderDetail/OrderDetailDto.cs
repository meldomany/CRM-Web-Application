using System.ComponentModel.DataAnnotations;
using CRM.Models.DTOs.OrderHeader;
using CRM.Models.DTOs.Product;

namespace CRM.Models.DTOs.OrderDetail
{
    public class OrderDetailDto
    {
        [Required]
        public int LineNo { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public double Quantity { get; set; }
        [Required]
        public double TaxAmount { get; set; }
        [Required]
        public double TotalPrice { get; set; }

        [Required]
        public int ProductId { get; set; }
    }
}
