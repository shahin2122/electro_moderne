using System.Linq;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

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
                .ForMember(dest => dest.Role, opts => opts.MapFrom(src => 
                src.UserRoles.FirstOrDefault(x=> x.UserId == src.Id).Role.Name))
                .ReverseMap();

            
            CreateMap<PhotoDto, Photo>()
                .ReverseMap();

            CreateMap<PartPhotoDto, PartPhoto>()
                .ReverseMap();
            
        }
    }
}