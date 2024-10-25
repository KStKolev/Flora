namespace Flora.Server.Models.ArticleModels
{
    using Microsoft.AspNetCore.Http;
    using System.ComponentModel.DataAnnotations;
    using static Flora.Custom.ModelConstants.ArticleConstants;
    public class CreateArticleDto
    {
        [Required(ErrorMessage = TITLE_REQUIREMENT)]
        [MaxLength(TITLE_MAX_LENGTH, ErrorMessage = TITLE_LENGTH_ERROR)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = DESCRIPTION_REQUIREMENT)]
        [MaxLength(DESCRIPTION_MAX_LENGTH, ErrorMessage = DESCRIPTION_LENGTH_ERROR)]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = IMAGE_REQUIREMENT)]
        public IFormFile Image { get; set; } = null!;
        public int TimeToRead { get; set; }
    }
}
