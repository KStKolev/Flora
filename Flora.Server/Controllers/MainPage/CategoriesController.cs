namespace Flora.Server.Controllers.MainPage
{
    using Flora.Core.Interfaces;
    using Flora.Core.Models;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<CategoryModel> categories = await _categoryService
                .GetCategoriesAsync();

            return Ok(categories);
        }
    }
}
