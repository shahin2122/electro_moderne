using System;

namespace Core.Entities
{
    public class ContactRequest : BaseEntity
    {
        public string Title { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTimeOffset SubmitedDate { get; set; } = DateTime.Now;
        public string Context { get; set; }
        public ContactRequestStatus Status { get; set; } = ContactRequestStatus.Unseen;
    }
}