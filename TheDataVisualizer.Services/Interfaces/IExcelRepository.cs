using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheDataVisualizer.Services.Interfaces
{
    public interface IExcelRepository
    {
        string ReadExcel(IFormFile file);
    }
}
