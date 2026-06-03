namespace Flora.Data.Interfaces
{
    using Flora.Data.Entities;
    using System.Linq.Expressions;

    public interface IUserArticleDataService
    {
        Task<bool> IsArticleSavedAsync(Guid userId, int articleId);

        Task AddUserArticleAsync(UserArticle userArticle);

        Task<UserArticle?> GetUserArticleAsync(Guid userId, int articleId);

        Task RemoveUserArticleAsync(UserArticle userArticle);

        Task<List<TModel>> GetSavedUserArticlesAsync<TModel>(Guid userId, Expression<Func<UserArticle, TModel>> selector);
    }
}
