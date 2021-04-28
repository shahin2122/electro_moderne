using System.Collections.Generic;

namespace API.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public IReadOnlyList<string> Roles { get; set; }
        public string Provider { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Address1 { get; set; }
    }
}