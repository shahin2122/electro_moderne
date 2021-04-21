using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregate
{
    public enum Status
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "Payment Recieved")]
        PaymentRecieved,
        [EnumMember(Value = "Payment Failed")]
        PaymentFailed,
        [EnumMember(Value = "Shipped")]
        Shipped,

    }
}