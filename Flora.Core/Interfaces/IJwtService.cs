namespace Flora.Core.Interfaces
{
    using Flora.Core.Models;

    public interface IJwtService
    {
        string GenerateToken(AuthUserModel user);
    }
}
