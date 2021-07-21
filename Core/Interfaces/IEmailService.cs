using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IEmailService
    {
        public Task SendEmailAsync(EmailRequest emailRequest);
        public Task SendInvoiceEmailAsync(int invoiceId);
    }
}