namespace Flora.Server.Controllers.MainPage
{
    using Flora.Core.Infrastructure;
    using Flora.Data;
    using Flora.Data.Entities;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("api/[controller]")]
    public class SaveController : ControllerBase
    {
        private readonly FloraDbContext dbContext;

        public SaveController(FloraDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("SaveArticle")]
        public async Task<IActionResult> SaveArticle([FromBody] int articleId)
        {
            var user = await dbContext
                .Users
                .FirstAsync(u => u.Username == CurrentUser.User.Username);

            var article = await dbContext
                .Articles
                .FirstAsync(a => a.Id == articleId);
            bool alreadySaved = await dbContext.UserArticles
                .AnyAsync(ua => ua.UserId == user.Id && ua.ArticleId == articleId);

            if (alreadySaved)
            {
                return BadRequest();
            }

            UserArticle userArticle = new UserArticle
            {
                UserId = user.Id,
                User = user,
                Article = article,
                ArticleId = articleId
            };

            await dbContext.UserArticles.AddAsync(userArticle);
            await dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("GetSavedArticles")]
        public async Task<IActionResult> GetSavedArticles()
        {
            var user = await dbContext
                .Users
                .FirstAsync(u => u.Username == CurrentUser.User.Username);

            var savedArticles = await dbContext.UserArticles
                .Where(ua => ua.UserId == user.Id)
                .Select(ua => new
                {
                    ua.Article.Id,
                    ua.Article.Title,
                    ua.Article.Description,
                    ua.Article.TimeToRead,
                    Image = Convert.ToBase64String(ua.Article.Image),
                    Username = ua.Article.User.Username,
                    UserImage = ua.Article.User.Image,
                    IsAuthor = ua.Article.User.Username == user.Username
                })
                .ToListAsync();

            return Ok(savedArticles);
        }

        [HttpDelete("RemoveSavedArticle/{id}")]
        public async Task<IActionResult> RemoveSavedArticle(int id)
        {
            User user = await dbContext
                .Users
                .FirstAsync(u => u.Username == CurrentUser.User.Username);

            var userArticle = await dbContext.UserArticles
                .FirstOrDefaultAsync(ua => ua.UserId == user.Id && ua.ArticleId == id);

            if (userArticle == null)
            {
                return NotFound("Article not found in your saved list.");
            }

            dbContext.UserArticles.Remove(userArticle);
            await dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("IsArticleSaved/{id}")]
        public async Task<IActionResult> IsArticleSaved(int id)
        {
            User user = await dbContext
                .Users
                .FirstAsync(u => u.Username == CurrentUser.User.Username);

            bool isSaved = await dbContext.UserArticles
                .AnyAsync(ua => ua.UserId == user.Id && ua.ArticleId == id);

            return Ok(isSaved);
        }
    }
}
