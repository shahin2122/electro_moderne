using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Core.Entities.OrderAggregate;
using System;

namespace Infrastructure.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            
            builder.Property(s=> s.Status)
                .HasConversion(
                    o => o.ToString(),
                    o => (Status) Enum.Parse(typeof(Status), o)
                );

            builder.HasMany(o => o.Items).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}