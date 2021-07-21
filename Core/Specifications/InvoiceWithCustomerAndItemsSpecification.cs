using Core.Entities;

namespace Core.Specifications
{
    public class InvoiceWithCustomerAndItemsSpecification : BaseSpecification<Invoice>
    {
        public InvoiceWithCustomerAndItemsSpecification(int id)
        : base(x => x.Id == id)
        {
            AddInclude(x => x.Customer);
            AddInclude(x => x.Items);
        }
    }
}