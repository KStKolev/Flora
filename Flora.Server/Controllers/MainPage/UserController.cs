namespace Flora.Server.Controllers.MainPage
{
    using Flora.Core.Interfaces;
    using Flora.Core.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IImageService _imageStorageService;

        public UserController(IUserService userService,IImageService imageStorageService) 
        {
            _userService = userService;
            _imageStorageService = imageStorageService;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser() 
        {
            Guid userId = Guid
                .Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            UserProfileModel? user = await _userService
                .GetUserProfileAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("UploadImage")]
        public async Task<IActionResult> UploadImage(IFormFile image) 
        {
            Guid userId = Guid
                .Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            if (image == null || image.Length == 0)
            {
                return BadRequest("Image is required.");
            }

            using var stream = image
                .OpenReadStream();

            string? imageUrl = await _imageStorageService
                .UploadImageAsync(stream, image.FileName);

            if (string.IsNullOrWhiteSpace(imageUrl))
            {
                return BadRequest("Image upload failed.");
            }

            UserProfileModel? user = await _userService
                .UploadUserImageAsync(userId, imageUrl);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
