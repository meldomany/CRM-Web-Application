using CRM.Models.DTOs.Address;

namespace CRM.Models.DTOs.Customer
{
    public class CustomerSelectionDto : CustomerDto
    {
        public int Id { get; set; }
        public List<AddressSelectionDto> Addresses { get; set; }
    }
}
