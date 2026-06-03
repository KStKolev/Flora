namespace Flora.Core.Interfaces
{
    public interface IImageService
    {
        Task<string> UploadImageAsync(Stream stream, string fileName);
    }
}
