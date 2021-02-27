using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithPhotosSpecification : BaseSpecification<Product>
    {
        public ProductWithPhotosSpecification(int productId) 
        : base(x => x.Id == productId)
        {
            AddInclude(x => x.Photos);
        }
    }
}