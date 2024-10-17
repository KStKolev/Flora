namespace Flora.Core.Infrastructure
{
    using Flora.Core.Interfaces;
    using Flora.Data;
    using Flora.Data.Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    public static class CurrentUser
    {
        private static ApplicationUser user = null!;

        private static IPasswordHash passwordHash = new ServiceCollection().
            BuildServiceProvider()
            .GetService<IPasswordHash>()!;

        public static ApplicationUser User 
        {
            get { return user; }
            set { user = value; }
        }

        public async static Task<ApplicationUser?> UserExists(string userName) 
        {
            using (var dbContext = new FloraDbContext())
            {
                var foundUser = await dbContext
                    .ApplicationUser
                    .FirstOrDefaultAsync(u => u.UserName == userName);

                return foundUser;
            }
        }

        public async static Task<ApplicationUser?> LoginUser(string userName, string password) 
        {
            using (var dbContext = new FloraDbContext())
            {
                ApplicationUser? foundUser = await UserExists(userName);
                if (foundUser != null)
                {
                    bool isUserPassword = passwordHash.VerifyPassword(password, foundUser.PasswordHash);
                    if (isUserPassword == false) 
                        return null;

                    return user = await dbContext
                    .ApplicationUser
                    .FirstAsync(u => u.UserName == userName);
                }
                return null;
            }
        }

        public async static Task<ApplicationUser?> RegisterUser(string userName, string email, 
            string password, string confirmPassword) 
        {
            if (password == confirmPassword)
            {
                using (var dbContext = new FloraDbContext())
                {
                    ApplicationUser? foundUser = await UserExists(userName);
                    if (foundUser != null)
                        return null;

                    ApplicationUser applicationUser = new ApplicationUser()
                    {
                        UserName = userName,
                        Email = email,
                        PasswordHash = passwordHash.HashPassword(password),
                        Role = new Role() { Name = "User" }
                    };

                    await dbContext
                        .ApplicationUser
                        .AddAsync(applicationUser);
                    await dbContext
                        .SaveChangesAsync();

                    user = applicationUser;
                    return user;
                }
            }
            return null;
        }

        public static bool IsAdmin() 
        {
            if (user.Role.Name == "Admin")
            {
                return true;
            }
            return false;
        }
    }
}