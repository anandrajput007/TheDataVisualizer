using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheDataVisualizer.Services.Enum;

namespace TheDataVisualizer.Services.Interfaces
{
    public interface IFileProcessorStrategy
    {
        FileType GetFileType();
        string ProcessFile(IFormFile file);
    }
}
