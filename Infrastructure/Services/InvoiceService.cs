
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IUnitOfWork _unitOfWork;
        public InvoiceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Invoice> CreateInvoiceAsync(Invoice invoice)
        {
          var items =  invoice.Items;

          var customer = await this._unitOfWork.Repository<Customer>().GetByIdAsync(invoice.CustomerId);
          
          invoice.Customer = customer;

          invoice.Items = null;

          await _unitOfWork.Repository<Invoice>().AddAsync(invoice);

          var result = await _unitOfWork.Complete();

          if (result <= 0) return null;

          foreach(var item in items)
          {
              item.Invoice = invoice;
              item.InvoiceId = invoice.Id;
              await _unitOfWork.Repository<InvoiceItem>().AddAsync(item);
          }
          
          var itemResult = await _unitOfWork.Complete();
          
          
          if (itemResult <= 0) return null;

          invoice.Items = items;

          var finalResult = await _unitOfWork.Complete();

          return invoice;

           
        }
        

        
       
    }
}