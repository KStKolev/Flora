namespace Flora.Server.Controllers.LoginForm
{
    using Flora.Core.Infrastructure;
    using Flora.Core.Services;
    using Flora.Server.Models.AccountModels;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            PasswordHash passwordHash = new();
            var foundUser = await CurrentUser.LoginUser(loginModel.Username, loginModel.Password, passwordHash);
            if (foundUser != null)
            {
                return Ok();
            }
            else 
            {
                return BadRequest();
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            PasswordHash passwordHash = new();
            var userRegistered = await CurrentUser.RegisterUser(registerModel.Username, registerModel.Email, 
                registerModel.Password, passwordHash);

            if (userRegistered != null)
            {
                return Ok();
            }
            else 
            {
                return BadRequest();
            }
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel forgotPasswordModel) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            PasswordHash passwordHash = new();

            var foundUser = await CurrentUser.SetNewPassword(forgotPasswordModel.Username, forgotPasswordModel.Email, 
                forgotPasswordModel.NewPassword, passwordHash);

            if (foundUser != null)
            {
                return Ok();
            }
            else 
            {
                return BadRequest();
            }
        }
    }
}
