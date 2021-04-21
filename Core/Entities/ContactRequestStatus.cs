using System.Runtime.Serialization;

namespace Core.Entities
{
    public enum ContactRequestStatus
    {
        [EnumMember(Value = "Unseen")]
        Unseen,
        [EnumMember(Value = "Seen")]
        Seen,

    }
}