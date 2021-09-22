using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {

      //  builder.Property(P => P.Description).HasMaxLength(250);

        builder.HasOne(b=> b.ProductBrand).WithMany()
            .HasForeignKey(p=> p.ProductBrandId);
        builder.HasOne(t=> t.ProductType).WithMany()
            .HasForeignKey(p=> p.ProductTypeId);
        }
    }
}