using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ContactRequestPaginatedSpecification : BaseSpecification<ContactRequest>
    {
        public ContactRequestPaginatedSpecification(ContactRequestSpecParams requestParams) 
        : base(x =>
         (string.IsNullOrEmpty(requestParams.Search) || x.Email.ToLower().Contains
            (requestParams.Search)))
        {
            ApplyPaging(requestParams.pageSize * (requestParams.PageIndex - 1),
            requestParams.pageSize);
        }
    }
}