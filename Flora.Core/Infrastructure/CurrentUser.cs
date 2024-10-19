namespace Flora.Core.Infrastructure
{
    using Flora.Core.Interfaces;
    using Flora.Data;
    using Flora.Data.Entities;
    using Microsoft.EntityFrameworkCore;

    public static class CurrentUser
    {
        private static ApplicationUser user = null!;

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
                    .FirstOrDefaultAsync(u => u.Username == userName);

                return foundUser;
            }
        }

        public async static Task<ApplicationUser?> LoginUser(string userName, string password, IPasswordHash passwordHash) 
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
                    .FirstAsync(u => u.Username == userName);
                }
                return null;
            }
        }

        public async static Task<ApplicationUser?> RegisterUser(string username, string email, 
            string password, IPasswordHash passwordHash) 
        {
            using (var dbContext = new FloraDbContext())
            {
                ApplicationUser? foundUser = await UserExists(username);
                if (foundUser != null)
                    return null;

                ApplicationUser applicationUser = new ApplicationUser()
                {
                    Username = username,
                    Email = email,
                    PasswordHash = passwordHash.HashPassword(password),
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

        public async static Task<ApplicationUser?> SetNewPassword(string username, string email, 
            string newPassword, IPasswordHash passwordHash) 
        {
            using (var dbContext = new FloraDbContext())
            {
                ApplicationUser? foundUser = await UserExists(username);
                if (foundUser == null || foundUser.Email != email)
                    return null;

                foundUser.PasswordHash = passwordHash.HashPassword(newPassword);
                dbContext.Entry(foundUser).State = EntityState.Modified;
                await dbContext.SaveChangesAsync();

                user = foundUser;
                return user;
            }
        } 
    }
}