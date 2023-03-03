using System.ComponentModel.DataAnnotations;

namespace CRM.Models.DTOs.Product
{
    public class ProductDto
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public double Price { get; set; }
    }
}