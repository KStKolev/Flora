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
        public DbSet<Article> Articles { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<UserArticle> UserArticles { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "FloraDb");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<UserArticle>()
                .HasKey(k => new 
            {
                k.ArticleId, k.UserId
            });

            modelBuilder
                .Entity<UserArticle>()
                .HasOne(u => u.User)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder
                .Entity<UserArticle>()
                .HasOne(a => a.Article)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder
                .Entity<Article>()
                .HasOne(a => a.User)
                .WithMany(u => u.Articles)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }
    }
}
