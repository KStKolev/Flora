namespace Flora.Server.Controllers.MainPage
{
    using Flora.Core.Infrastructure;
    using Flora.Data;
    using Flora.Data.Entities;
    using Flora.Server.Models.ArticleModels;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly FloraDbContext dbContext;
        public ArticleController(FloraDbContext _dbContext) 
        {
            dbContext = _dbContext;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromForm] CreateArticleDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (dto.Image == null || dto.Image.Length == 0)
            {
                return BadRequest("Image is required.");
            }

            byte[] imageBytes;
            using (var memoryStream = new MemoryStream())
            {
                await dto.Image.CopyToAsync(memoryStream);
                imageBytes = memoryStream.ToArray();
            }

            User articleCreator = await dbContext
                .Users
                .FirstAsync(u => u.Username == CurrentUser.User.Username);

            Article article = new()
            {
                Title = dto.Title,
                Description = dto.Description,
                TimeToRead = dto.TimeToRead,
                Image = imageBytes,
                UserId = articleCreator.Id,
                User = articleCreator
            };
            articleCreator.Articles.Add(article);

            await dbContext.Articles.AddAsync(article);
            await dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var article = await dbContext.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound("Article not found.");
            }

            dbContext.Articles.Remove(article);
            await dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
