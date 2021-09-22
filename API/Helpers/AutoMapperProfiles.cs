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
            CreateMap<AppUser, AddressDto>();
            

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

            CreateMap<Part, PartToReturnDto>()
                .ForMember(dest => dest.PartType, opts => opts.MapFrom(src => 
                    src.PartType.Name))
                .ForMember(dest => dest.PartBrand, opts => opts.MapFrom(src =>
                    src.PartBrand.Name))
                .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ReverseMap();
            
            CreateMap<RegisterDto, AppUser>()
            .ReverseMap();

            CreateMap<AppUser, UserDto>()
                .ForMember(dest => dest.Roles, opts => opts.MapFrom(src => 
                src.UserRoles.Select(x=> x.UserId == src.Id)))
                .ReverseMap();

             CreateMap<InvoiceItem, InvoiceItemDto>()
                .ReverseMap();


            
            CreateMap<PhotoDto, Photo>()
                .ReverseMap();

            CreateMap<PartPhotoDto, PartPhoto>()
                .ReverseMap();
            
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.DeliveryMethod,o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice,o => o.MapFrom(s => s.DeliveryMethod.Price))
                .ForMember(d => d.Total , o => o.MapFrom(s => s.GetTotal()))
                .ForMember(d => d.TotalTaxed , o => o.MapFrom(s => s.GetTotalTaxed()))
                .ForMember(d => d.TPS5 , o => o.MapFrom(s => s.TPS5))
                .ForMember(d => d.TVQ9975 , o => o.MapFrom(s => s.TVQ9975));
               
                

            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.ItemOrdered.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.ItemOrdered.Name))
                .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.ItemOrdered.PhotoUrl))
                .ForMember(d => d.Type, o => o.MapFrom(s => s.ItemOrdered.Type))
                .ForMember(d => d.Brand, o => o.MapFrom(s => s.ItemOrdered.Brand));

            CreateMap<RepairRequest, RepairRequestToReturnDto>();

            CreateMap<ContactRequest, ContactRequestToRetuenDto>();

            CreateMap<Customer, CustomerUpdateDto>()
                .ReverseMap();

            CreateMap<InvoiceToCreateDto , Invoice>()
                .ReverseMap();

            CreateMap<Invoice , InvoiceToReturnDto>()
                .ForMember(d => d.Customer, o => o.MapFrom(s => s.Customer.FullName))
                .ReverseMap();

           CreateMap<Blog , BlogDto>()
                .ReverseMap();
                
           CreateMap<Blog , BlogToReturnDto>()
                .ForMember(dest => dest.PhotoUrl, opts => opts.MapFrom(source => 
                    source.Photo.Url))
                .ReverseMap();

            CreateMap<BlogPhoto , PhotoDto>()
                .ReverseMap();
        }
    }
}