using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheDataVisualizer.Services.Enum;
using TheDataVisualizer.Services.Interfaces;

namespace TheDataVisualizer.Services.Services
{
    public class FileProcessor : IFileProcessor
    {
        private readonly IEnumerable<IFileProcessorStrategy> _strategies;

        public FileProcessor(IEnumerable<IFileProcessorStrategy> strategies)
        {
            _strategies = strategies;
        }

        public string ProcessFile(IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName).ToLower();
            var fileType = GetFileTypeByExtension(extension);

            var strategy = _strategies.FirstOrDefault(s => s.GetFileType() == fileType);

            if (strategy == null)
                throw new NotSupportedException($"File type {extension} is not supported.");

            return strategy.ProcessFile(file);
        }

        private FileType GetFileTypeByExtension(string extension)
        {
            return extension switch
            {
                ".csv" => FileType.Csv,
                ".xls" or ".xlsx" => FileType.Excel,
                ".txt" => FileType.Txt,
                _ => FileType.Unknown
            };
        }
    }
}
