namespace Flora.Core.Interfaces
{
    using Flora.Core.Models;

    public interface ICategoryService
    {
        Task<List<CategoryModel>> GetCategoriesAsync();

        Task<bool> CheckCategoryByIdAsync(int id);
    }
}
