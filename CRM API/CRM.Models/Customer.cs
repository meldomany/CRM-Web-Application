using System.ComponentModel.DataAnnotations;

namespace CRM.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool Status { get; set; }
        public List<Address> Addresses { get; set; }
    }
}
