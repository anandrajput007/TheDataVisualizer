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
    public class ExcelFileProcessorStrategy : IFileProcessorStrategy
    {
        private readonly IExcelRepository _excelRepository;

        public ExcelFileProcessorStrategy(IExcelRepository excelRepository)
        {
            _excelRepository = excelRepository;
        }

        public FileType GetFileType() => FileType.Excel;

        public string ProcessFile(IFormFile file)
        {
            return _excelRepository.ReadExcel(file);
        }
    }
}
