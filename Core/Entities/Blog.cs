using System;
using System.Collections.Generic;

namespace Core.Entities
{
    public class Blog : BaseEntity
    {
        public string Title { get; set; }
        public DateTimeOffset CreatedTime { get; set; } = DateTimeOffset.Now;
        public string Text { get; set; }
        public BlogPhoto Photo { get; set; }
        public string Tags { get; set; }
    }
}