using Core.Entities;

namespace Core.Specifications
{
    public class BlogWithPhotoSpecification : BaseSpecification<Blog>
    {
        public BlogWithPhotoSpecification(int blogId) : base(x => x.Id == blogId)
        {
            AddInclude(x => x.Photo);
        }
    }
}