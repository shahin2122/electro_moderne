
using System.Collections.Generic;


namespace Core.Entities
{
    public class Part : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public ICollection<PartPhoto> Photos { get; set; }
        public PartBrand PartBrand { get; set; }
        public int PartBrandId { get; set; }
        public PartType PartType { get; set; }
        public int PartTypeId { get; set; }
        public string Manufacturer { get; set; }
        public string Specs { get; set; }
        public string LocalId { get; set; }
        public string PartNumber { get; set; }

    }
}