using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
        builder.HasOne(b=> b.ProductBrand).WithMany()
            .HasForeignKey(p=> p.ProductBrandId);
        builder.HasOne(t=> t.ProductType).WithMany()
            .HasForeignKey(p=> p.ProductTypeId);
        }
    }
}