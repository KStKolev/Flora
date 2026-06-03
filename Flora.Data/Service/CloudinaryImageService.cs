namespace Flora.Data.Service
{
    using CloudinaryDotNet;
    using CloudinaryDotNet.Actions;
    using Flora.Core.Interfaces;
    using Microsoft.Extensions.Configuration;

    public class CloudinaryImageService : IImageService
    {
        private readonly Cloudinary cloudinary;

        public CloudinaryImageService(
            IConfiguration configuration)
        {
            Account account = new(
                configuration["Cloudinary:CloudName"],
                configuration["Cloudinary:ApiKey"],
                configuration["Cloudinary:ApiSecret"]);

            cloudinary = new Cloudinary(account);
        }

        public async Task<string> UploadImageAsync(Stream stream, string fileName)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(fileName, stream)
            };

            var result = await cloudinary
                .UploadAsync(uploadParams);

            return result
                .SecureUrl
                .ToString();
        }
    }
}
