using Core.Entities;

namespace Core.Specifications
{
    public class PartsForCountSpecification : BaseSpecification<Part>
    {
        public PartsForCountSpecification(PartsSpecParams partsParams)
         : base(x=> 
            (string.IsNullOrEmpty(partsParams.Search) || x.Name.ToLower().Contains
            (partsParams.Search)) &&
            (!partsParams.PartBrandId.HasValue || x.PartBrandId == partsParams.PartBrandId) &&
            (!partsParams.PartTypeId.HasValue || x.PartTypeId == partsParams.PartTypeId)
        )
        {
        }
    }
}