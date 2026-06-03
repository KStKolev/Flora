namespace Flora.Core.Models
{
    public class SavedArticleModel
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int TimeToRead { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;

        public int CategoryId { get; set; }

        public string CategoryName { get; set; } = string.Empty;

        public string UserImageUrl { get; set; } = string.Empty;

        public bool IsAuthor { get; set; }
    }
}
