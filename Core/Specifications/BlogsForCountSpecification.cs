using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class BlogsForCountSpecification : BaseSpecification<Blog>
    {
        public BlogsForCountSpecification(BlogSpecParams blogParams) : base(x => 
        (string.IsNullOrEmpty(blogParams.Search) || x.Title.ToLower()
        .Contains(blogParams.Search))
        )
        {

        }
    }
}