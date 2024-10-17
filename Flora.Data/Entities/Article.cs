namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Article
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public byte[] Image { get; set; } = null!;

        [Required]
        public int CommentSectionId { get; set; }
        [ForeignKey(nameof(CommentSectionId))]

        public CommentSection CommentSection { get; set; } = null!;

        public int Like { get; set; }
    }
}
