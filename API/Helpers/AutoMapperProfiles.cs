using System.Linq;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
            .ForMember(dest => dest.ProductBrand,opts => opts.MapFrom(source => 
                source.ProductBrand.Name) )
            .ForMember(dest => dest.ProductType,opts => opts.MapFrom(source => 
                source.ProductType.Name) )
            .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(source => 
                source.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.BrandId , opts => opts.MapFrom(src => 
                    src.ProductBrandId))
                .ForMember(dest => dest.TypeId, opts => opts.MapFrom(src => 
                    src.ProductTypeId))
                .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(source => 
                    source.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ReverseMap();
           
            CreateMap<Part, PartDto>()
                .ForMember(dest => dest.PartTypeId, opts => opts.MapFrom(src => 
                    src.PartTypeId))
                .ForMember(dest => dest.PartBrandId, opts => opts.MapFrom(src => 
                    src.PartBrandId))
                .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ReverseMap();
            
            CreateMap<RegisterDto, AppUser>()
            .ReverseMap();

            CreateMap<AppUser, UserDto>()
                .ForMember(dest => dest.Role, opts => opts.MapFrom(src => 
                src.UserRoles.FirstOrDefault(x=> x.UserId == src.Id).Role.Name))
                .ReverseMap();

            
            CreateMap<PhotoDto, Photo>()
                .ReverseMap();

            CreateMap<PartPhotoDto, PartPhoto>()
                .ReverseMap();
            
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.DeliveryMethod,o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice,o => o.MapFrom(s => s.DeliveryMethod.Price));
                

            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ProductItemOrdered.ProductItemId))
                .ForMember(d => d.PartId, o => o.MapFrom(s => s.PartItemOrdered.PartId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ProductItemOrdered.ProductName))
                .ForMember(d => d.PartName, o => o.MapFrom(s => s.PartItemOrdered.PartName))
                .ForMember(d => d.ProductPhotoUrl, o => o.MapFrom(s => s.ProductItemOrdered.PhotoUrl))
                .ForMember(d => d.PartPhotoUrl, o => o.MapFrom(s => s.PartItemOrdered.PhotoUrl));
        }
    }
}