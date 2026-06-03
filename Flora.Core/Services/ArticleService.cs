namespace Flora.Core.Services
{
    using Flora.Core.Interfaces;
    using Flora.Core.Models;
    using Flora.Data.Entities;
    using Flora.Data.Interfaces;

    public class ArticleService : IArticleService
    {
        private readonly IArticleDataService _articleDataService;

        public ArticleService(IArticleDataService articleDataService) 
        {
            _articleDataService = articleDataService;
        }

        public async Task CreateArticleAsync(CreateArticleServiceModel model)
        {
            Article article = new()
            {
                Title = model.Title,
                Description = model.Description,
                TimeToRead = model.TimeToRead,
                ImageUrl = model.ImageUrl,
                CategoryId = model.CategoryId,
                UserId = model.UserId,
            };

            await _articleDataService
                .AddArticleAsync(article);
        }

        public async Task<List<ArticlePreviewModel>> GetArticlesAsync(Guid currentUserId)
        {
            return await _articleDataService
                .GetArticlesAsync(a => new ArticlePreviewModel
                {
                    Id = a.Id,
                    Title = a.Title,
                    Description = a.Description,
                    TimeToRead = a.TimeToRead,
                    ImageUrl = a.ImageUrl,
                    IsAuthor = a.UserId == currentUserId,
                    Username = a.User.Username,
                    UserImageUrl = a.User.ImageUrl,
                    CategoryId = a.CategoryId,
                    CategoryName = a.Category.Name
                });
        }

        public async Task<bool> FindArticleAsync(int id)
        {
            return await _articleDataService
                .GetArticleAsync(id) != null;
        }

        public async Task DeleteArticleAsync(int id, Guid userId)
        {
            Article? article = await _articleDataService
                .GetArticleAsync(id);

            if (article == null)
            {
                throw new KeyNotFoundException();
            }
            else if (article.UserId != userId)
            {
                throw new UnauthorizedAccessException();
            }

            await _articleDataService
                .RemoveArticleAsync(article);
        }
    }
}
