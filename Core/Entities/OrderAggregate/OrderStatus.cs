using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregate
{
    public enum Status
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "PaymentRecieved")]
        PaymentRecieved,
        [EnumMember(Value = "PaymentFailed")]
        PaymentFailed,
        [EnumMember(Value = "Shipped")]
        Shipped,

    }
}