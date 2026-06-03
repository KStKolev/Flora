namespace Flora.Server.Controllers.MainPage
{
    using Flora.Core.Interfaces;
    using Flora.Core.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly IArticleService _articleService;

        public MainController(IArticleService articleService) 
        {
            _articleService = articleService;
        }

        [HttpGet("LoadArticles")]
        public async Task<IActionResult> LoadArticles()
        {
            Guid userId = Guid
                .Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            List<ArticlePreviewModel> articles = await _articleService
                .GetArticlesAsync(userId);

            return Ok(articles);
        }
    }
}
