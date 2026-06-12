namespace Flora.Core.Services
{
    using Flora.Core.Interfaces;
    using Flora.Core.Models;
    using Flora.Data.Entities;
    using Flora.Data.Interfaces;

    public class UserService : IUserService
    {
        private readonly IUserDataService _userDataService;

        public UserService(IUserDataService userDataService)
        {
            _userDataService = userDataService;
        }

        public async Task<UserProfileModel?> GetUserProfileAsync(Guid userId)
        {
            User? user = await _userDataService
                .GetUserByIdAsync(userId);

            if (user == null)
            {
                return null;
            }

            return new UserProfileModel
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                ImageUrl = user.ImageUrl
            };
        }

        public async Task<AuthUserModel?> LoginUser(string username, string password, PasswordHash passwordHash)
        {
            User? user = await _userDataService
                .GetUserByUsernameAsync(username);

            if (user == null) 
            {
                return null;
            }

            bool isPasswordValid = passwordHash
                .VerifyPassword(password, user.PasswordHash);

            if (!isPasswordValid) 
            {
                return null;
            }

            return new AuthUserModel
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email
            };
        }

        public async Task<AuthUserModel?> RegisterUser(string username, string email, string password, PasswordHash passwordHash)
        {
            User? existingUser = await _userDataService
                .GetUserByUsernameAsync(username);

            if (existingUser != null) 
            {
                return null;
            }

            User user = new()
            {
                Username = username,
                Email = email,
                PasswordHash = passwordHash.HashPassword(password),
                ImageUrl = string.Empty
            };

            await _userDataService
                .AddUserAsync(user);

            return new AuthUserModel
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email
            };
        }

        public async Task<AuthUserModel?> SetNewPassword(string username, string email, string newPassword, PasswordHash passwordHash)
        {
            User? user = await _userDataService
                .GetUserByUsernameAsync(username);

            if (user == null || user.Email != email) 
            {
                return null;
            }

            user.PasswordHash = passwordHash
                .HashPassword(newPassword);

            await _userDataService
                .UpdateUserAsync(user);

            return new AuthUserModel
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email
            };
        }

        public async Task<UserProfileModel?> UploadUserImageAsync(Guid userId, string imageUrl)
        {
            User? user = await _userDataService
                .GetUserByIdAsync(userId);

            if (user == null)
            {
                return null;
            }

            user.ImageUrl = imageUrl;

            await _userDataService
                .UpdateUserAsync(user);

            return new UserProfileModel
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                ImageUrl = user.ImageUrl
            };
        }
    }
}
