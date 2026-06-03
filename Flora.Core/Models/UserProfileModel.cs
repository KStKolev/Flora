namespace Flora.Core.Models
{
    public class UserProfileModel
    {
        public Guid Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;
    }
}
