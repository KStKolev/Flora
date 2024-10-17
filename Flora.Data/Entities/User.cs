namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;
    public class User
    {
        public User() 
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }

        [Required]
        public string UserName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public byte[] Image { get; set; } = null!;
    }
}
