using AutoMapper;
using CRM.DataAccess.Repository.IRepository;
using CRM.Models;
using CRM.Models.DTOs.Product;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            return Ok(_mapper.Map<List<ProductSelectionDto>>(await _productRepository.GetProducts()));
        }

        [HttpGet]
        [Route("GetProduct/{productId}")]
        public async Task<IActionResult> GetProduct(int productId)
        {
            if(productId != 0)
            {
                var product = await _productRepository.GetProduct(productId);
                if(product != null)
                {
                    return Ok(_mapper.Map<ProductSelectionDto>(product));
                }
            }
            return BadRequest("Check product id");
        }

        [HttpPost]
        [Route("CreateProduct")]
        public async Task<IActionResult> CreateProduct(ProductCreationDto productCreationDto)
        {
            if (ModelState.IsValid)
            {
                if(!await _productRepository.ProductExists(productCreationDto.Name))
                {
                    var product = _mapper.Map<Product>(productCreationDto);
                    if (await _productRepository.CreateProduct(product))
                    {
                        return StatusCode(201);
                    }
                    return BadRequest();
                }
                return BadRequest("Product name is already exists");
            }
            return BadRequest(productCreationDto);
        }

        [HttpPut]
        [Route("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct(ProductEditionDto productEditionDto)
        {
            if (ModelState.IsValid)
            {
                if (!await _productRepository.ProductExistsEntity(productEditionDto.Id, productEditionDto.Name))
                {
                    var product = _mapper.Map<Product>(productEditionDto);
                    if (await _productRepository.UpdateProduct(product))
                    {
                        return NoContent();
                    }
                    return BadRequest();
                }
                return BadRequest("Product name is already exists");
            }
            return BadRequest(productEditionDto);
        }
    }
}
