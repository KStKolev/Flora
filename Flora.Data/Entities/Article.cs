namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Article
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = null!;

        public int TimeToRead { get; set; }

        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;

        public int CategoryId { get; set; }
        [ForeignKey(nameof(CategoryId))]

        public Category Category { get; set; } = null!;

        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
