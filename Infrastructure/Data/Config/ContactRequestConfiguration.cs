using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ContactRequestConfiguration : IEntityTypeConfiguration<ContactRequest>
    {
        public void Configure(EntityTypeBuilder<ContactRequest> builder)
        {   
            builder.Property(P => P.Context).HasMaxLength(250);
            builder.Property(s => s.Status)
                .HasConversion(
                    o => o.ToString(),
                    o => (ContactRequestStatus) Enum.Parse(typeof(ContactRequestStatus), o)
                );
        }
    }
}