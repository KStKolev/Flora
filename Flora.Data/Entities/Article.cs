namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;
    public class Article
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public byte[] Image { get; set; } = null!;

        public int TimeToRead { get; set; }
    }
}
