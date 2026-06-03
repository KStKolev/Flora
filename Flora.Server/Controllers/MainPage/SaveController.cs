namespace Flora.Server.Controllers.MainPage
{
    using Flora.Core.Interfaces;
    using Flora.Core.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class SaveController : ControllerBase
    {
        private readonly IUserArticleService _userArticleService;

        public SaveController(IUserArticleService userArticleService)
        {
            _userArticleService = userArticleService;
        }

        [HttpPost("SaveArticle")]
        public async Task<IActionResult> SaveArticle([FromBody] int articleId)
        {
            Guid userId = Guid
                .Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            SaveArticleServiceModel model = new()
            {
                UserId = userId,
                ArticleId = articleId
            };

            try
            {
                await _userArticleService
                    .SaveArticleAsync(model);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Article not found.");
            }
            catch (InvalidOperationException)
            {
                return BadRequest("Article is already saved.");
            }

            return Ok();
        }

        [HttpGet("GetSavedArticles")]
        public async Task<IActionResult> GetSavedArticles()
        {
            Guid userId = Guid
                .Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var savedArticles = await _userArticleService
                .GetSavedArticlesAsync(userId);

            return Ok(savedArticles);
        }

        [HttpDelete("RemoveSavedArticle/{id}")]
        public async Task<IActionResult> RemoveSavedArticle(int id)
        {
            Guid userId = Guid
                .Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            SaveArticleServiceModel model = new()
            {
                UserId = userId,
                ArticleId = id
            };

            try
            {
                await _userArticleService
                    .RemoveSavedArticleAsync(model);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Article not found in your saved list.");
            }

            return Ok();
        }

        [HttpGet("IsArticleSaved/{id}")]
        public async Task<IActionResult> IsArticleSaved(int id)
        {
            Guid userId = Guid
                .Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            SaveArticleServiceModel model = new()
            {
                UserId = userId,
                ArticleId = id
            };

            bool isSaved = await _userArticleService
                .IsArticleSavedAsync(model);

            return Ok(isSaved);
        }
    }
}
