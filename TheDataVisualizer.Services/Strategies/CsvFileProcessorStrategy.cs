using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheDataVisualizer.Services.Enum;
using TheDataVisualizer.Services.Interfaces;

namespace TheDataVisualizer.Services.Strategies
{
    public class CsvFileProcessorStrategy : IFileProcessorStrategy
    {
        private readonly ICsvRepository _csvRepository;

        public CsvFileProcessorStrategy(ICsvRepository csvRepository)
        {
            _csvRepository = csvRepository;
        }

        public FileType GetFileType() => FileType.Csv;

        public string ProcessFile(IFormFile file)
        {
            return _csvRepository.ReadCsv(file);
        }
    }
}
