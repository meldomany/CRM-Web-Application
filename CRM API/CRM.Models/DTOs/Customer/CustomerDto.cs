using System.ComponentModel.DataAnnotations;

namespace CRM.Models.DTOs.Customer
{
    public class CustomerDto
    {
        [Required]
        public string Code { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
        [Required]
        public bool Status { get; set; }
    }
}
