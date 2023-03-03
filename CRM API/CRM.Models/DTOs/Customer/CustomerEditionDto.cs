using CRM.Models.DTOs.Address;

namespace CRM.Models.DTOs.Customer
{
    public class CustomerEditionDto : CustomerDto
    {
        public int Id { get; set; }
        public List<AddressEditionDto> Addresses { get; set; }
    }
}
