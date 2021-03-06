using System.Collections.Generic;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 30;
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 10;
        public int pageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string sort { get; set; }
        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }

       
    }
}