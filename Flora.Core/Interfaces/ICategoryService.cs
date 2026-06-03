namespace Flora.Core.Interfaces
{
    using Flora.Data.Entities;

    public interface ICategoryService
    {
        Task<List<Category>> GetCategoriesAsync();

        Task<bool> CheckCategoryByIdAsync(int id);
    }
}
