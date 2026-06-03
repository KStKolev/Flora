namespace Flora.Data
{
    using Flora.Data.Entities;
    using Microsoft.EntityFrameworkCore;

    public class FloraDbContext : DbContext
    {
        public FloraDbContext(DbContextOptions<FloraDbContext> options)
            : base(options) { }

        public DbSet<Article> Articles { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<UserArticle> UserArticles { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;

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
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<Article>()
                .HasOne(a => a.User)
                .WithMany(u => u.Articles)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder
                .Entity<Article>()
                .HasOne(a => a.Category)
                .WithMany(c => c.Articles)
                .HasForeignKey(a => a.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder
                .Entity<Category>()
                .HasData(
                    new Category { Id = 1, Name = "Indoor Plants" },
                    new Category { Id = 2, Name = "Outdoor Plants" },
                    new Category { Id = 3, Name = "Flowers" },
                    new Category { Id = 4, Name = "Trees" },
                    new Category { Id = 5, Name = "Herbs" }
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
