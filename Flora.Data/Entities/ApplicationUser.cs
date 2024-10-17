namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class ApplicationUser
    {
        public ApplicationUser() 
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }

        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public byte[] Image { get; set; } = null!;

        [Required]
        public Role Role { get; set; } = null!;
    }
}
