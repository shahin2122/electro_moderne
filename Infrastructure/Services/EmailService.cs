using System.IO;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Helpers;
using Microsoft.Extensions.Options;
using MimeKit;


namespace Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IOptions<EmailSettings> _emailSettings;
        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings;
        }

        public async Task SendEmailAsync(EmailRequest emailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_emailSettings.Value.Mail);
            email.To.Add(MailboxAddress.Parse(emailRequest.ToEmail));
            email.Subject = emailRequest.Subject;
            var builder = new BodyBuilder();

            if(emailRequest.Attachments != null)
            {
                byte[] fileBytes;
                foreach(var file in emailRequest.Attachments)
                {
                    if(file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileBytes = ms.ToArray();
                        }
                        builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
                    }
                }
            }

            builder.HtmlBody = emailRequest.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_emailSettings.Value.Host, _emailSettings.Value.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_emailSettings.Value.Mail, _emailSettings.Value.Password);

            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendInvoiceEmailAsync(int invoiceId)
        { 
            string FilePath = Directory.GetCurrentDirectory() + "assets\\invoiceEmailRequest.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();

            //MailText = MailText.Replace
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_emailSettings.Value.Mail);
            email.To.Add(MailboxAddress.Parse(_emailSettings.Value.Mail));
            email.Subject = $"Invoice Details";

            var builder = new BodyBuilder();
            builder.HtmlBody = MailText;
            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(_emailSettings.Value.Host, _emailSettings.Value.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_emailSettings.Value.Mail, _emailSettings.Value.Password);

            await smtp.SendAsync(email);
            smtp.Disconnect(true);

           
        }
    }
}