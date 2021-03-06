using Core.Entities;

namespace Core.Specifications
{
    public class PartTypeSpecification : BaseSpecification<PartType>
    {
        public PartTypeSpecification(int pageIndex, int pageSize)
        {
            AddOrderBy(x => x.Name);
            ApplyPaging(pageSize * (pageIndex -1), pageSize);
               
        }
    }
}