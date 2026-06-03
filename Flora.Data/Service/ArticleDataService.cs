namespace Flora.Data.Service
{
    using Flora.Data.Entities;
    using Flora.Data.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using System.Linq.Expressions;

    public class ArticleDataService : IArticleDataService
    {
        private readonly FloraDbContext _context;

        public ArticleDataService(FloraDbContext context)
        {
            _context = context;
        }

        public async Task AddArticleAsync(Article article)
        {
            await _context
                .AddAsync(article);

            await _context
                .SaveChangesAsync();
        }

        public async Task<Article?> GetArticleAsync(int id)
        {
            return await _context
                .Articles
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<TModel>> GetArticlesAsync<TModel>(Expression<Func<Article, TModel>> selector)
        {
            return await _context
                .Articles
                .Select(selector)
                .ToListAsync();
        }

        public async Task RemoveArticleAsync(Article article)
        {
            _context
                .Articles
                .Remove(article);

            await _context
                .SaveChangesAsync();
        }
    }
}
