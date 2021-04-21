using Core.Entities;

namespace Core.Specifications
{
    public class RepairRequestPaginatedSpecification : BaseSpecification<RepairRequest>
    {
        public RepairRequestPaginatedSpecification(RepairRequestSpecParams requestParams)
        :base(x => 
        (string.IsNullOrEmpty(requestParams.Search) || x.FullName.ToLower().Contains
            (requestParams.Search)))
        {
        }
    }
}