namespace Flora.Core.Models
{
    public class CreateArticleServiceModel
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int TimeToRead { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        public int CategoryId { get; set; }

        public Guid UserId { get; set; }
    }
}
