namespace Core.Specifications
{
    public class ProductTypeSpecParams
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