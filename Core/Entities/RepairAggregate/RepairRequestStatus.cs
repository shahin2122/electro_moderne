using System.Runtime.Serialization;

namespace Core.Entities
{
    public enum RepairRequestStatus
    {
        [EnumMember(Value = "Unseen")]
        Unseen,
        [EnumMember(Value = "Seen")]
        Seen,
        [EnumMember(Value = "Completed")]
        Completed,
        [EnumMember(Value = "Accepted")]
        Accepted,
        [EnumMember(Value = "Rejected")]
        Rejected,
        [EnumMember(Value = "Failed")]
        Failed,
        [EnumMember(Value = "In Progress")]
        InProgress,
    }
}