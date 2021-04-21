using Core.Entities;

namespace Core.Specifications
{
    public class ContactRequestUnseenStatusSpecification : BaseSpecification<ContactRequest>
    {
        public ContactRequestUnseenStatusSpecification()
        : base(x => x.Status == ContactRequestStatus.Unseen)
        {
        }
    }
}