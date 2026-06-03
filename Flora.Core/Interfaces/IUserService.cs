namespace Flora.Core.Interfaces
{
    using Flora.Core.Models;
    using Flora.Core.Services;
    using Flora.Data.Entities;

    public interface IUserService
    {
        Task<User?> LoginUser(string username, string password, PasswordHash passwordHash);

        Task<User?> GetUserByIdAsync(Guid id);

        Task<User?> RegisterUser(string username, string email, string password, PasswordHash passwordHash);

        Task<User?> SetNewPassword(string username, string email, string newPassword, PasswordHash passwordHash);

        Task<UserProfileModel?> GetUserProfileAsync(Guid userId);

        Task<UserProfileModel?> UploadUserImageAsync(Guid userId, string imageUrl);
    }
}
