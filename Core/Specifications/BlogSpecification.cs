using Core.Entities;

namespace Core.Specifications
{
    public class BlogSpecification : BaseSpecification<Blog>
    {
        public BlogSpecification(BlogSpecParams blogParams) : base(x =>
        (string.IsNullOrEmpty(blogParams.Search) || x.Title.ToLower().Contains(blogParams.Search))
        )
        {
            AddInclude(x => x.Photo);
            AddOrderByDescending(x => x.Id);
            ApplyPaging(blogParams.pageSize * (blogParams.PageIndex - 1), blogParams.pageSize);
            
        }


        public BlogSpecification(string title) : base (x => x.Title == title)
        {
            AddInclude(x => x.Photo);
        }
    }
}