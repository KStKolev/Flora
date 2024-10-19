namespace Flora.Server.Models.AccountModels
{
    using System.ComponentModel.DataAnnotations;
    using static Flora.Custom.ModelConstants.FormModelConstants;

    public class RegisterModel
    {
        [Required(ErrorMessage = USERNAME_REQUIRED)]
        [MinLength(MIN_USERNAME_LENGTH, 
            ErrorMessage = USERNAME_LENGTH)]
        public string Username { get; set; } = string.Empty;


        [Required(ErrorMessage = EMAIL_REQUIRED)]
        [EmailAddress(ErrorMessage = INVALID_EMAIL)]
        public string Email { get; set; } = string.Empty;


        [Required(ErrorMessage = PASSWORD_REQUIRED)]
        [StringLength(MAX_PASSWORD_LENGTH,
            MinimumLength = MIN_PASSWORD_LENGTH, 
            ErrorMessage = PASSWORD_LENGTH)]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = PASSWORD_CONFIRM_REQUIRED)]
        [Compare("Password", ErrorMessage = PASSWORD_NOT_MATCH)]
        public string PasswordConfirm { get; set; } = string.Empty;
    }
}
