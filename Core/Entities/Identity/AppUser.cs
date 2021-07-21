using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Core.Entities.RepairAggregate;


namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser<int>
    {
        public string Address1 { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Company { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string HomePhoneNumber { get; set; }
        public string CellPhoneNumber { get; set; }
        public string WorkPhone { get; set; }
        public bool? IsCommercial { get; set; } = false;
        public string PostalCode { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public string Provider { get; set; }
        public bool? Deactive { get; set; } = false;

    }
}