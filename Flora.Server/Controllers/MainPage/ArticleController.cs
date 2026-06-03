namespace Flora.Server.Controllers.MainPage
{
    using Flora.Core.Interfaces;
    using Flora.Core.Models;
    using Flora.Server.Models.ArticleModels;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly ICategoryService _categoryService;
        private readonly IImageService _imageService;

        public ArticleController(IArticleService articleService, IImageService imageService, 
            ICategoryService categoryService) 
        {
            _articleService = articleService;
            _imageService = imageService;
            _categoryService = categoryService;
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

            bool categoryExists = await _categoryService
                .CheckCategoryByIdAsync(dto.CategoryId);

            if (!categoryExists)
            {
                return BadRequest("Invalid category.");
            }

            using var stream = dto
                .Image
                .OpenReadStream();

            string imageUrl = await _imageService
                .UploadImageAsync(stream, dto.Image.FileName);

            if (string.IsNullOrWhiteSpace(imageUrl))
            {
                return BadRequest("Image upload failed.");
            }

            Guid userId = Guid
                .Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            CreateArticleServiceModel article = new()
            {
                Title = dto.Title,
                Description = dto.Description,
                TimeToRead = dto.TimeToRead,
                ImageUrl = imageUrl,
                CategoryId = dto.CategoryId,
                UserId = userId,
            };

            await _articleService
                .CreateArticleAsync(article);

            return Ok();
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Guid userId = Guid
                .Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            try
            {
                await _articleService
                    .DeleteArticleAsync(id, userId);
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Article not found.");
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid("User is forbidden to remove the article.");
            }

            return Ok();
        }
    }
}
