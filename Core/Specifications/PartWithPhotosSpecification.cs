using Core.Entities;

namespace Core.Specifications
{
    public class PartWithPhotosSpecification : BaseSpecification<Part>
    {
        public PartWithPhotosSpecification(int partId)
        : base(x => x.Id == partId)
        {
            AddInclude(x => x.Photos);
        }
    }
}