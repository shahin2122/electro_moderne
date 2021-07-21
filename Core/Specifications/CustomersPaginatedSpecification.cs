using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class CustomersPaginatedSpecification : BaseSpecification<Customer>
    {
        public CustomersPaginatedSpecification(CustomerSpecParams customerParams)
         : base(x =>
         (string.IsNullOrEmpty(customerParams.Search) || x.FullName.ToLower().Contains
            (customerParams.Search)))
        {
        }
    }
}