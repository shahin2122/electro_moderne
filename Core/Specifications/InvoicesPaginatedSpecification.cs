using Core.Entities;

namespace Core.Specifications
{
    public class InvoicesPaginatedSpecification : BaseSpecification<Invoice>
    {
        public InvoicesPaginatedSpecification(InvoiceSpecParams invoiceParams)
        : base(x => 
        (string.IsNullOrEmpty(invoiceParams.Search) || x.Customer.FullName.ToLower().Contains
        (invoiceParams.Search))
        )
        {
            AddInclude(x => x.Customer);
            AddInclude(x => x.Items);
            AddOrderByDescending(x => x.Id);
            ApplyPaging(invoiceParams.pageSize * (invoiceParams.PageIndex - 1),
            invoiceParams.pageSize);
        }



        
    }
}