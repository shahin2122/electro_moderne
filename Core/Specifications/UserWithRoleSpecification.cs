
using Core.Entities.Identity;

namespace Core.Specifications

{
    public class UserWithRoleSpecification : BaseSpecification<AppUser>
    {
        public UserWithRoleSpecification(UserWithRoleSpecParams userSpecParams)
        : base(x =>
                (string.IsNullOrEmpty(userSpecParams.Search) || x.UserName.ToLower().Contains
                (userSpecParams.Search)) 
              )
        {
 
            
            ApplyPaging(userSpecParams.pageSize * (userSpecParams.PageIndex - 1),
            userSpecParams.pageSize);
               

        }
    }
}