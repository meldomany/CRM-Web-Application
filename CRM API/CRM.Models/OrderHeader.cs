using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRM.Models
{
    public class OrderHeader
    {
        [Key]
        public int Id { get; set; }
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
        [ForeignKey(nameof(CustomerId))]
        public Customer Customer { get; set; }

        public List<OrderDetail> OrderDetails { get; set; }

        [Required]
        public int ShippingAddressId { get; set; }

        [Required]
        public int BillingAddressId { get; set; }
    }
}
