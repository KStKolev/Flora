namespace Flora.Core.Interfaces
{
    using Flora.Core.Models;
    using Flora.Core.Services;

    public interface IUserService
    {
        Task<AuthUserModel?> LoginUser(string username, string password, PasswordHash passwordHash);

        Task<AuthUserModel?> RegisterUser(string username, string email, string password, PasswordHash passwordHash);

        Task<AuthUserModel?> SetNewPassword(string username, string email, string newPassword, PasswordHash passwordHash);

        Task<UserProfileModel?> GetUserProfileAsync(Guid userId);

        Task<UserProfileModel?> UploadUserImageAsync(Guid userId, string imageUrl);
    }
}
