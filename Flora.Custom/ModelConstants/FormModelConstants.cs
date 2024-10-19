namespace Flora.Custom.ModelConstants
{
    public static class FormModelConstants
    {
        public const string USERNAME_REQUIRED = "Username is required";
        public const string USERNAME_LENGTH = "Username must be at least 4 digits long";
        public const string EMAIL_REQUIRED = "Email is required";
        public const string INVALID_EMAIL = "Invalid email address";
        public const string PASSWORD_REQUIRED = "Password is required";
        public const string PASSWORD_LENGTH = "Password must be between 8 and 12 digits long";
        public const string PASSWORD_CONFIRM_REQUIRED = "Please confirm your password";
        public const string PASSWORD_NOT_MATCH = "Passwords do not match";

        public const int MIN_USERNAME_LENGTH = 4;
        public const int MIN_PASSWORD_LENGTH = 8;
        public const int MAX_PASSWORD_LENGTH = 12;
    }
}
