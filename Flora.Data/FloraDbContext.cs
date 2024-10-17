namespace Flora.Data
{
    using Flora.Data.Entities;
    using Microsoft.EntityFrameworkCore;
    public class FloraDbContext : DbContext
    {
        public FloraDbContext(DbContextOptions<FloraDbContext> options)
            : base(options) { }

        public FloraDbContext() { }

        public DbSet<ApplicationUser> ApplicationUser { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;
        public DbSet<CommentSection> CommentSections { get; set; } = null!;
        public DbSet<Article> Articles { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "FloraDb");
        }
    }
}
