using Core.Entities;

namespace Core.Specifications
{
    public class PhotosOfPartSpecification : BaseSpecification<PartPhoto>
    {
        public PhotosOfPartSpecification(int partId)
        : base(x => x.PartId == partId)
        {
            
        }
    }
}