namespace Flora.Server.Models.AccountModels
{
    using System.ComponentModel.DataAnnotations;
    using static Flora.Custom.ModelConstants.FormModelConstants;
    public class LoginModel
    {
        [Required(ErrorMessage = USERNAME_REQUIRED)]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = PASSWORD_REQUIRED)]
        public string Password { get; set; } = string.Empty;
    }
}
