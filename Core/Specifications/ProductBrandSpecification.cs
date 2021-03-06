using System;
using System.Linq.Expressions;
using Core.Entities;



namespace Core.Specifications
{
    public class ProductBrandSpecification : BaseSpecification<ProductBrand>
    {
         public ProductBrandSpecification(int pageIndex, int pageSize)
        {
            AddOrderBy(x => x.Name);
            ApplyPaging(pageSize * (pageIndex -1), pageSize);
               
        }
    }
}