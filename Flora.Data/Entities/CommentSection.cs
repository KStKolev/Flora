namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;
    public class CommentSection
    {
        [Key]
        public int Id { get; set; }
        int NumberOfComments { get; set; }
        IEnumerable<Article> Articles { get; set; } = new List<Article>();
        IEnumerable<Comment> Comments { get; set; } = new List<Comment>();
    }
}
