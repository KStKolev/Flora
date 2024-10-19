namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public byte[] UserImage { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        public IEnumerable<Comment> Comments { get; set; } = new List<Comment>();

        public int Like { get; set; }

        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;
    }
}
