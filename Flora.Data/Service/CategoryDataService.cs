namespace Flora.Data.Service
{
    using Flora.Data.Entities;
    using Flora.Data.Interfaces;
    using Microsoft.EntityFrameworkCore;

    public class CategoryDataService : ICategoryDataService
    {
        private readonly FloraDbContext _context;

        public CategoryDataService(FloraDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _context
                .Categories
                .ToListAsync();
        }

        public async Task<Category?> GetCategoryByIdAsync(int id)
        {
            return await _context
                .Categories
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
