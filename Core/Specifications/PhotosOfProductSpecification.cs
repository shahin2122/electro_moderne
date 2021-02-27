using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class PhotosOfProductSpecification : BaseSpecification<Photo>
    {
        public PhotosOfProductSpecification(int productId) 
        : base(x => x.ProductId == productId)
        {
            
        }
    }
}