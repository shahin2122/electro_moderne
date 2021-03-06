using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class PartsSpecification : BaseSpecification<Part>
    {
        public PartsSpecification(PartsSpecParams partsParams) 
        : base(x=> 
            (string.IsNullOrEmpty(partsParams.Search) || x.Name.ToLower().Contains
            (partsParams.Search)) &&
            (!partsParams.PartBrandId.HasValue || x.PartBrandId == partsParams.PartBrandId) &&
            (!partsParams.PartTypeId.HasValue || x.PartTypeId == partsParams.PartTypeId)
        )
        {
            AddInclude(x => x.PartType);
            AddInclude(x => x.PartBrand);
            AddInclude(x => x.Photos);
            ApplyPaging(partsParams.pageSize * (partsParams.PageIndex - 1),
            partsParams.pageSize);

            if(!string.IsNullOrEmpty(partsParams.sort))
            {
                 switch (partsParams.sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                 
                       

                    default:
                        AddOrderBy(i => i.Id);
                        break;
                }   
            }
        }

        public PartsSpecification(int id)
        : base(x => x.Id == id)
        {
            AddInclude(x => x.PartType);
            AddInclude(x => x.PartBrand);
            AddInclude(x => x.Photos);
        }
    }
}