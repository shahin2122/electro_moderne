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
                .ForMember(dest => dest.PartTypeId, opts => opts.MapFrom(src => 
                    src.PartTypeId))
                .ForMember(dest => dest.PartBrandId, opts => opts.MapFrom(src => 
                    src.PartBrandId))
                .ReverseMap();

            CreateMap<Part, PartToReturnDto>()
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
        }
    }
}