using AutoMapper;
using CRM.DataAccess.Repository.IRepository;
using CRM.Models.DTOs.Address;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly IAddressRepository _addressRepository;
        private readonly IMapper _mapper;

        public AddressesController(IAddressRepository addressRepository, IMapper mapper)
        {
            _addressRepository = addressRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetAllShippingAddress/{customerId}")]
        public async Task<IActionResult> GetAllShippingAddress(int customerId)
        {
            if(customerId > 0)
            {
                return Ok(_mapper.Map<List<AddressSelectionDto>>(await _addressRepository.GetShippingAddressForCustomer(customerId)));
            }
            return BadRequest("Check customer id");
        }

        [HttpGet]
        [Route("GetAllBillingAddress/{customerId}")]
        public async Task<IActionResult> GetAllBillingAddress(int customerId)
        {
            if (customerId > 0)
            {
                return Ok(_mapper.Map<List<AddressSelectionDto>>(await _addressRepository.GetBillingAddressForCustomer(customerId)));
            }
            return BadRequest("Check customer id");
        }
    }
}
