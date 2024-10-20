using System.ComponentModel.DataAnnotations.Schema;

namespace Flora.Data.Entities
{
    public class UserArticle
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;
        public int ArticleId { get; set; }
        [ForeignKey(nameof(ArticleId))]
        public Article Article { get; set; } = null!;
    }
}
