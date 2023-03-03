using AutoMapper;
using CRM.DataAccess.Repository.IRepository;
using CRM.Models;
using CRM.Models.DTOs.OrderHeader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderHeadersController : ControllerBase
    {
        private readonly IOrderHeaderRepository _orderHeaderRepository;
        private readonly IMapper _mapper;

        public OrderHeadersController(IOrderHeaderRepository orderHeaderRepository, IMapper mapper)
        {
            _orderHeaderRepository = orderHeaderRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetAllOrderHeaders")]
        public async Task<IActionResult> GetAllOrderHeaders()
        {
            return Ok(_mapper.Map<List<OrderHeaderSelectionDto>>(await _orderHeaderRepository.GetOrderHeaders()));
        }

        [HttpGet]
        [Route("GetOrderHeader/{orderHeaderId}")]
        public async Task<IActionResult> GetOrderHeader(int orderHeaderId)
        {
            if(orderHeaderId > 0)
            {
                var orderHeader = await _orderHeaderRepository.GetOrderHeader(orderHeaderId);
                if(orderHeader != null)
                {
                    return Ok(_mapper.Map<OrderHeaderSelectionDto>(orderHeader));
                }
            }
            return BadRequest("Check order header id");
        }

        [HttpPost]
        [Route("CreateOrderHeader")]
        public async Task<IActionResult> CreateOrderHeader(OrderHeaderCreationDto orderHeaderCreationDto)
        {
            if (ModelState.IsValid)
            {
                var orderHeader = _mapper.Map<OrderHeader>(orderHeaderCreationDto);
                if(await _orderHeaderRepository.CreateOrderHeader(orderHeader))
                {
                    return StatusCode(201);
                }
                return BadRequest();
            }
            return BadRequest(orderHeaderCreationDto);
        }

        [HttpPut]
        [Route("UpdateOrderHeader")]
        public async Task<IActionResult> UpdateOrderHeader(OrderHeaderEditionDto orderHeaderEditionDto)
        {
            if (ModelState.IsValid)
            {
                var orderHeader = _mapper.Map<OrderHeader>(orderHeaderEditionDto);
                if (await _orderHeaderRepository.UpdateOrderHeader(orderHeader))
                {
                    return NoContent();
                }
                return BadRequest();
            }
            return BadRequest(orderHeaderEditionDto);
        }

        [HttpDelete]
        [Route("DeleteOrderDetail/{orderDetailId}")]
        public async Task<IActionResult> DeleteOrderDetail(int orderDetailId)
        {
            if(orderDetailId != 0)
            {
                if(await _orderHeaderRepository.DeleteOrderDetail(orderDetailId))
                {
                    return NoContent();
                }
            }
            return BadRequest("Check order detail id");
        }
    }
}
