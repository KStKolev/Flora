namespace Flora.Data.Interfaces
{
    using Flora.Data.Entities;

    public interface ICategoryDataService
    {
        Task<List<Category>> GetCategoriesAsync();

        Task<Category?> GetCategoryByIdAsync(int id);
    }
}
