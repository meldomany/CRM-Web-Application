using System.ComponentModel.DataAnnotations;

namespace CRM.Models.DTOs.OrderHeader
{
    public class OrderHeaderDto
    {
        [Required]
        public bool Status { get; set; }
        [Required]
        public double Tax { get; set; }
        [Required]
        public double SubTotal { get; set; }
        [Required]
        public double GrandTotal { get; set; }
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int ShippingAddressId { get; set; }

        [Required]
        public int BillingAddressId { get; set; }
    }
}
