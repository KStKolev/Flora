namespace Flora.Core.Interfaces
{
    using Flora.Core.Models;

    public interface IUserArticleService
    {
        Task SaveArticleAsync(SaveArticleServiceModel model);

        Task RemoveSavedArticleAsync(SaveArticleServiceModel model);

        Task<bool> IsArticleSavedAsync(SaveArticleServiceModel model);

        Task<List<SavedArticleModel>> GetSavedArticlesAsync(Guid userId);
    }
}
