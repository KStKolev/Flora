namespace Flora.Core.Interfaces
{
    using Flora.Core.Models;

    public interface IArticleService
    {
        Task<List<ArticlePreviewModel>> GetArticlesAsync(Guid currentUserId);

        Task CreateArticleAsync(CreateArticleServiceModel model);

        Task<bool> FindArticleAsync(int id);

        Task DeleteArticleAsync(int id, Guid userId);
    }
}
