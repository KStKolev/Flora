namespace Flora.Server.Controllers
{
    using Flora.Core.Interfaces;
    using Flora.Data.Entities;
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
            List<Category> categories = await _categoryService
                .GetCategoriesAsync();

            return Ok(categories);
        }

    }
}
