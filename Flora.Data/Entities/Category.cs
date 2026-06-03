using System.ComponentModel.DataAnnotations;

namespace Flora.Data.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public ICollection<Article> Articles { get; set; } = 
            new List<Article>();
    }
}
