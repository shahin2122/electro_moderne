using System;

namespace API.Dtos
{
    public class ContactRequestToRetuenDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTimeOffset SubmitedDate { get; set; }
        public bool IsSeen { get; set; } 
        public string Context { get; set; }
        public string Status { get; set; } 
    }
}