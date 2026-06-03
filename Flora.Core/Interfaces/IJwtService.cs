namespace Flora.Core.Interfaces
{
    using Flora.Data.Entities;

    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
