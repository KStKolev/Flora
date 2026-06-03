namespace Flora.Data.Service
{
    using Flora.Data.Entities;
    using Flora.Data.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using System.Linq.Expressions;

    public class UserArticleDataService : IUserArticleDataService
    {
        private readonly FloraDbContext _context;

        public UserArticleDataService(FloraDbContext context)
        {
            _context = context;
        }

        public async Task AddUserArticleAsync(UserArticle userArticle)
        {
            await _context
                .UserArticles
                .AddAsync(userArticle);

            await _context
                .SaveChangesAsync();
        }

        public async Task<List<TModel>> GetSavedUserArticlesAsync<TModel>(Guid userId, Expression<Func<UserArticle, TModel>> selector)
        {
            return await _context
                .UserArticles
                .Where(ua => ua.UserId == userId)
                .Select(selector)
                .ToListAsync();
        }

        public async Task<UserArticle?> GetUserArticleAsync(Guid userId, int articleId)
        {
            return await _context
                .UserArticles
                .FirstOrDefaultAsync(ua => ua.UserId == userId && ua.ArticleId == articleId);
        }

        public async Task<bool> IsArticleSavedAsync(Guid userId, int articleId)
        {
            return await _context
                .UserArticles
                .AnyAsync(ua => ua.UserId == userId && ua.ArticleId == articleId);
        }

        public async Task RemoveUserArticleAsync(UserArticle userArticle)
        {
            _context
                .UserArticles
                .Remove(userArticle);

            await _context
                .SaveChangesAsync();
        }
    }
}
