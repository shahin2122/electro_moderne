using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class RepairRequestUnseenStatusSpecification : BaseSpecification<RepairRequest>
    {
        public RepairRequestUnseenStatusSpecification() 
        : base(x => x.Status == RepairRequestStatus.Unseen)
        {
        }
    }
}