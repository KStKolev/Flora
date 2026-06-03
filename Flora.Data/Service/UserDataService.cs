namespace Flora.Data.Service
{
    using Flora.Data.Entities;
    using Flora.Data.Interfaces;
    using Microsoft.EntityFrameworkCore;

    public class UserDataService : IUserDataService
    {
        private readonly FloraDbContext _dbContext;

        public UserDataService(FloraDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddUserAsync(User user)
        {
            _dbContext
                .Users
                .Add(user);

            await _dbContext
                .SaveChangesAsync();
        }

        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await _dbContext
                .Users
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _dbContext
                .Users
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task UpdateUserAsync(User user)
        {
            _dbContext
                .Users
                .Update(user);

            await _dbContext
                .SaveChangesAsync();
        }
    }
}
