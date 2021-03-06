using Core.Entities;

namespace Core.Specifications
{
    public class PartBrandSpecification : BaseSpecification<PartBrand>
    {
        public PartBrandSpecification(int pageIndex, int pageSize)
        {
            AddOrderBy(x => x.Name);
            ApplyPaging(pageSize * (pageIndex - 1), pageSize);
        }
    }
}