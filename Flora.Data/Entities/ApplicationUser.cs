namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class ApplicationUser
    {
        public ApplicationUser() 
        {
            Id = Guid.NewGuid();
        }

        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;
    }
}
