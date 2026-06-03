namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class User
    {
        public User()
        {
            Id = Guid.NewGuid();
        }

        [Key]
        public Guid Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = null!;

        public ICollection<Article> Articles { get; set; } = 
            new List<Article>();
    }
}
