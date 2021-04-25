using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Infrastructure.Data.Config
{
    public class RepairRequestConfiguration : IEntityTypeConfiguration<RepairRequest>
    {
        public void Configure(EntityTypeBuilder<RepairRequest> builder)
        {
            builder.Property(P => P.ProblemInfo).HasMaxLength(250);

            builder.Property(s=> s.Status)
                .HasConversion(
                    o => o.ToString(),
                    o => (RepairRequestStatus) Enum.Parse(typeof(RepairRequestStatus), o)
                );


            builder.Property(i => i.Subtotal)
                .HasColumnType("decimal(18,2)");
        }
    }
}