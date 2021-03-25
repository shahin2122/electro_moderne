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
            
            builder.Property(s=> s.OrderStatus)
                .HasConversion(
                    o => o.ToString(),
                    o => (OrderStatus) Enum.Parse(typeof(OrderStatus), o)
                );

            builder.HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}