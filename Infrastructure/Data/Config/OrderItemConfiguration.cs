using Microsoft.EntityFrameworkCore;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.OwnsOne(i => i.ProductItemOrdered, ip => {ip.WithOwner();});
            builder.OwnsOne(i => i.PartItemOrdered, ip => {ip.WithOwner();});

            builder.Property(i => i.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}