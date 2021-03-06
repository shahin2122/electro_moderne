namespace Core.Specifications
{
    public class ProductBrandSpecParams
    {
        private const int MaxPageSize = 30;
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 10;
        public int pageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}