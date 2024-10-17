namespace Flora.Data.Entities
{
    using System.ComponentModel.DataAnnotations;
    public class Role
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
