using System;
using Core.Entities;
using Core.Entities.RepairAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class RepairTaskConfiguration : IEntityTypeConfiguration<RequestTask>
    {
        public void Configure(EntityTypeBuilder<RequestTask> builder)
        {
            builder.Property(P => P.ProblemInfo).HasMaxLength(250);


            builder.Property(s=> s.TaskStatus)
                .HasConversion(
                    o => o.ToString(),
                    o => (RepairRequestStatus) Enum.Parse(typeof(RepairRequestStatus), o)
                );


        }
    }
}