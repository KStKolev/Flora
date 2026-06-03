namespace Flora.Core.Services
{
    using Flora.Core.Interfaces;
    using Flora.Core.Models;
    using Flora.Data.Entities;
    using Flora.Data.Interfaces;

    public class UserArticleService : IUserArticleService
    {
        private readonly IUserArticleDataService _userArticleDataService;
        private readonly IArticleDataService _articleDataService;

        public UserArticleService(IUserArticleDataService userArticleDataService, IArticleDataService articleDataService)
        {
            _userArticleDataService = userArticleDataService;
            _articleDataService = articleDataService;
        }

        public async Task<List<SavedArticleModel>> GetSavedArticlesAsync(Guid userId)
        {
            return await _userArticleDataService
                .GetSavedUserArticlesAsync(
                    userId,
                    ua => new SavedArticleModel
                    {
                        Id = ua.Article.Id,
                        Title = ua.Article.Title,
                        Description = ua.Article.Description,
                        TimeToRead = ua.Article.TimeToRead,
                        ImageUrl = ua.Article.ImageUrl,
                        Username = ua.Article.User.Username,
                        CategoryId = ua.Article.CategoryId,
                        CategoryName = ua.Article.Category.Name,
                        UserImageUrl = ua.Article.User.ImageUrl,
                        IsAuthor = ua.Article.UserId == userId
                    }
                );
        }

        public async Task<bool> IsArticleSavedAsync(SaveArticleServiceModel model)
        {
            return await _userArticleDataService
                .IsArticleSavedAsync(model.UserId, model.ArticleId);
        }

        public async Task RemoveSavedArticleAsync(SaveArticleServiceModel model)
        {
            UserArticle? userArticle = await _userArticleDataService
                .GetUserArticleAsync(model.UserId, model.ArticleId);

            if (userArticle == null)
            {
                throw new KeyNotFoundException();
            }

            await _userArticleDataService
                .RemoveUserArticleAsync(userArticle);
        }

        public async Task SaveArticleAsync(SaveArticleServiceModel model)
        {
            Article? article = await _articleDataService
                .GetArticleAsync(model.ArticleId);

            if (article == null)
            {
                throw new KeyNotFoundException();
            }

            bool alreadySaved = await _userArticleDataService
                .IsArticleSavedAsync(model.UserId, model.ArticleId);

            if (alreadySaved)
            {
                throw new InvalidOperationException();
            }

            UserArticle userArticle = new()
            {
                UserId = model.UserId,
                ArticleId = model.ArticleId
            };

            await _userArticleDataService
                .AddUserArticleAsync(userArticle);
        }
    }
}
