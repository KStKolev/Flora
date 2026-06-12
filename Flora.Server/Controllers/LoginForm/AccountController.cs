namespace Flora.Server.Controllers.LoginForm
{
    using Flora.Core.Interfaces;
    using Flora.Core.Models;
    using Flora.Core.Services;
    using Flora.Server.Models.AccountModels;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly IUserService _userService;

        public AccountController(IJwtService jwtService, IUserService userService)
        {
            _jwtService = jwtService;
            _userService = userService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginModel) 
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            PasswordHash passwordHash = new();

            AuthUserModel? foundUser = await _userService
                .LoginUser(loginModel.Username, loginModel.Password, passwordHash);

            if (foundUser == null)
            {
                return BadRequest();
            }

            string token = _jwtService
                .GenerateToken(foundUser);

            return Ok(new { token });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerModel) 
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            PasswordHash passwordHash = new();

            AuthUserModel? userRegistered = await _userService
                .RegisterUser(registerModel.Username, registerModel.Email, 
                    registerModel.Password, passwordHash);

            if (userRegistered == null)
            {
                return BadRequest();
            }

            string token = _jwtService
                .GenerateToken(userRegistered);

            return Ok(new { token });
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordModel) 
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            PasswordHash passwordHash = new();

            AuthUserModel? foundUser = await _userService
                .SetNewPassword(forgotPasswordModel.Username, forgotPasswordModel.Email, 
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
