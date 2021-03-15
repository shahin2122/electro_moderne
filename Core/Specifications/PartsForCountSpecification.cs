using Core.Entities;

namespace Core.Specifications
{
    public class PartsForCountSpecification : BaseSpecification<Part>
    {
        public PartsForCountSpecification(PartsSpecParams partsParams)
         : base(x=> 
            (string.IsNullOrEmpty(partsParams.Search) || x.Name.ToLower().Contains
            (partsParams.Search)) &&
            (!partsParams.BrandId.HasValue || x.PartBrandId == partsParams.BrandId) &&
            (!partsParams.TypeId.HasValue || x.PartTypeId == partsParams.TypeId)
        )
        {
        }
    }
}