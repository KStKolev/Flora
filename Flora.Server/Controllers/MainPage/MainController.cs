namespace Flora.Server.Controllers.MainPage
{
    using Flora.Data;
    using Flora.Data.Entities;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private FloraDbContext dbContext;

        public MainController(FloraDbContext _dbContext) 
        {
            dbContext = _dbContext;
        }

        [HttpGet("LoadArticles")]

        public async Task<IActionResult> LoadArticles() 
        {
            var articles = await dbContext
            .Articles
            .Select(a => new
            {
                a.Id,
                a.Title,
                a.Description,
                a.TimeToRead,
                Image = Convert.ToBase64String(a.Image),
                Username = a.User.Username,
                UserImage = a.User.Image
            })
            .ToListAsync();

            if (articles.Count() > 0)
            {
                return Ok(articles);
            }
            return Ok(Enumerable.Empty<Article>());
        }
    }
}
