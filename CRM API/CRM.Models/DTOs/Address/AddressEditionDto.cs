using System.ComponentModel.DataAnnotations;

namespace CRM.Models.DTOs.Address
{
    public class AddressSelectionDto : AddressDto
    {
        public int Id { get; set; }
        
        [Required]
        public int CustomerId { get; set; }
    }
}
