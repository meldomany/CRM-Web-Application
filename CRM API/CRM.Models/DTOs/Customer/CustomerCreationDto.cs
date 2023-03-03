using CRM.Models.DTOs.Address;

namespace CRM.Models.DTOs.Customer
{
    public class CustomerCreationDto : CustomerDto
    {
        public List<AddressCreationDto> Addresses { get; set; }
    }
}
