namespace Flora.Data.Interfaces
{
    using Flora.Data.Entities;
    using System.Linq.Expressions;

    public interface IArticleDataService
    {
        Task AddArticleAsync(Article article);

        Task<Article?> GetArticleAsync(int id);

        Task<List<TModel>> GetArticlesAsync<TModel>(Expression<Func<Article, TModel>> selector);

        Task RemoveArticleAsync(Article article);
    }
}
