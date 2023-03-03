using AutoMapper;
using CRM.Models;
using CRM.Models.DTOs.Address;
using CRM.Models.DTOs.Customer;
using CRM.Models.DTOs.OrderDetail;
using CRM.Models.DTOs.OrderHeader;
using CRM.Models.DTOs.Product;

namespace CRM.Services.AutoMapper
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            //Address Mappings
            CreateMap<AddressDto, Address>().ReverseMap();
            CreateMap<AddressCreationDto, Address>().ReverseMap();
            CreateMap<AddressEditionDto, Address>().ReverseMap();
            CreateMap<AddressSelectionDto, Address>().ReverseMap();

            //Customer Mappings
            CreateMap<CustomerDto, Customer>().ReverseMap();
            CreateMap<CustomerCreationDto, Customer>().ReverseMap();
            CreateMap<CustomerEditionDto, Customer>().ReverseMap();
            CreateMap<CustomerSelectionDto, Customer>().ReverseMap();
            CreateMap<CustomerSelectBoxDto, Customer>().ReverseMap();

            //Product Mappings
            CreateMap<ProductDto, Product>().ReverseMap();
            CreateMap<ProductCreationDto, Product>().ReverseMap();
            CreateMap<ProductEditionDto, Product>().ReverseMap();
            CreateMap<ProductSelectionDto, Product>().ReverseMap();

            //OrderHeader Mappings
            CreateMap<OrderHeaderDto, OrderHeader>().ReverseMap();
            CreateMap<OrderHeaderCreationDto, OrderHeader>().ReverseMap();
            CreateMap<OrderHeaderEditionDto, OrderHeader>().ReverseMap();
            CreateMap<OrderHeaderSelectionDto, OrderHeader>().ReverseMap();

            //OrderDetail Mappings
            CreateMap<OrderDetailDto, OrderDetail>().ReverseMap();
            CreateMap<OrderDetailCreationDto, OrderDetail>().ReverseMap();
            CreateMap<OrderDetailEditionDto, OrderDetail>().ReverseMap();
            CreateMap<OrderDetailSelectionDto, OrderDetail>().ReverseMap();
        }
    }
}
