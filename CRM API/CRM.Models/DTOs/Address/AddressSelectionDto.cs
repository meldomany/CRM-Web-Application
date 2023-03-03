using System.ComponentModel.DataAnnotations;

namespace CRM.Models.DTOs.Address
{
    public class AddressEditionDto : AddressDto
    {
        public int Id { get; set; }
        
        [Required]
        public int CustomerId { get; set; }
    }
}
