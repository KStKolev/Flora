namespace Flora.Data.Interfaces
{
    using Flora.Data.Entities;

    public interface IUserDataService
    {
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task<User?> GetUserByIdAsync(Guid id);
        Task<User?> GetUserByUsernameAsync(string username);
    }
}
