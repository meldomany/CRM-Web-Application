using AutoMapper;
using CRM.DataAccess.Repository.IRepository;
using CRM.Models;
using CRM.Models.DTOs.Customer;
using Microsoft.AspNetCore.Mvc;

namespace CRM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;

        public CustomersController(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetAllCustomers")]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customersDto = _mapper.Map<List<CustomerDto>>(await _customerRepository.GetCustomers());
            return Ok(customersDto);
        }

        [HttpGet]
        [Route("GetAllCustomersSelectBox")]
        public async Task<IActionResult> GetAllCustomersSelectBox()
        {
            var customersDto = _mapper.Map<List<CustomerSelectBoxDto>>(await _customerRepository.GetCustomersSelectBox());
            return Ok(customersDto);
        }

        [HttpGet]
        [Route("GetCustomer/{customerCode}")]
        public async Task<IActionResult> GetCustomer(string customerCode)
        {
            if(customerCode != null)
            {
                var customerDto = _mapper.Map<CustomerSelectionDto>(await _customerRepository.GetCustomer(customerCode));
                if (customerDto != null)
                {
                    return Ok(customerDto);
                }
                return BadRequest("No customer found with this code");
            }
            return BadRequest("Check the customer code");
        }

        [HttpPost]
        [Route("CreateCustomer")]
        public async Task<IActionResult> CreateCustomer(CustomerCreationDto customerCreationDto)
        {
            if (ModelState.IsValid)
            {
                if(!await _customerRepository.CodeExists(customerCreationDto.Code))
                {
                    var customer = _mapper.Map<Customer>(customerCreationDto);
                    var result = await _customerRepository.CreateCustomer(customer);
                    if (result)
                    {
                        return StatusCode(201, customerCreationDto);
                    }
                    return BadRequest();
                }
                return BadRequest("Customer code is already exists");
            }
            return BadRequest(customerCreationDto);
        }

        [HttpPut]
        [Route("UpdateCustomer")]
        public async Task<IActionResult> UpdateCustomer(CustomerEditionDto customerEditionDto)
        {
            if (ModelState.IsValid)
            {
                if (!await _customerRepository.CodeExistsEntity(customerEditionDto.Id, customerEditionDto.Code))
                {
                    var customer = _mapper.Map<Customer>(customerEditionDto);
                    var result = await _customerRepository.EditCustomer(customer);
                    if (result)
                    {
                        return NoContent();
                    }
                    return BadRequest();
                }
                return BadRequest("Customer code is already exists");
            }
            return BadRequest(customerEditionDto);
        }

        [HttpDelete]
        [Route("DeleteAddress/{addressId}")]
        public async Task<IActionResult> DeleteAddress(int addressId)
        {
            if(addressId > 0)
            {
                await _customerRepository.DeleteAddress(addressId);
                return NoContent();
            }
            return BadRequest("Check address");
        }
    }
}
