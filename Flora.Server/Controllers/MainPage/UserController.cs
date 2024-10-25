namespace Flora.Server.Controllers.MainPage
{
    using Flora.Core.Infrastructure;
    using Flora.Data;
    using Flora.Data.Entities;
    using Flora.Server.Models.UserModels;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FloraDbContext dbContext;

        public UserController(FloraDbContext _dbContext) 
        {
            dbContext = _dbContext;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser() 
        {
            User? user = await dbContext
                .Users
                .FirstOrDefaultAsync(u => u.Username == CurrentUser.User.Username);

            if (user == null) 
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("UploadImage")]
        public async Task<IActionResult> UploadImage([FromBody]ImageUploadDto imageDto) 
        {
            User? user = await dbContext
                .Users
                .FirstOrDefaultAsync(u => u.Username == CurrentUser.User.Username);

            if (user == null) 
            {
                return NotFound();
            }

            user.Image = Convert.FromBase64String(imageDto.Image.Split(",")[1]);
            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();
            return Ok(user);
        }
    }
}
