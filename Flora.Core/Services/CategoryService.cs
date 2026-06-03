namespace Flora.Core.Services
{
    using Flora.Core.Interfaces;
    using Flora.Data.Entities;
    using Flora.Data.Interfaces;

    public class CategoryService : ICategoryService
    {
        private readonly ICategoryDataService _categoryDataService;

        public CategoryService(ICategoryDataService categoryDataService)
        {
            _categoryDataService = categoryDataService;
        }

        public async Task<bool> CheckCategoryByIdAsync(int id)
        {
            return await _categoryDataService
                .GetCategoryByIdAsync(id) != null;
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _categoryDataService
                .GetCategoriesAsync();
        }
    }
}
