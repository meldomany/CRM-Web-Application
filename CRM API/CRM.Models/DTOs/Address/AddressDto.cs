using System.ComponentModel.DataAnnotations;

namespace CRM.Models.DTOs.Address
{
    public class AddressDto
    {
        [Required]
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        public string PostalCode { get; set; }
        [Required]
        public bool ShippingAddress { get; set; }
        [Required]
        public bool BillingAddress { get; set; }
    }
}
