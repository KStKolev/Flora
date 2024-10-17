namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;
    public class CommentSection
    {
        [Required]
        public int Id { get; set; }
        int NumberOfComments { get; set; }
        IEnumerable<Comment> Comments { get; set; } = new List<Comment>();
    }
}
