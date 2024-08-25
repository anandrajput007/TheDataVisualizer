using Aspose.Cells;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TheDataVisualizer.Services.Interfaces;

namespace TheDataVisualizer.Services.Repositories
{
    public class ExcelRepository : IExcelRepository
    {
        public string ReadExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File is null or empty");

            using (var stream = file.OpenReadStream())
            {
                var workbook = new Workbook(stream);
                var worksheet = workbook.Worksheets[0]; // Assuming we only process the first sheet
                var cells = worksheet.Cells;
                var rowCount = cells.MaxDataRow + 1;
                var colCount = cells.MaxDataColumn + 1;

                var result = new List<Dictionary<string, object>>();

                // Read the headers first
                var headers = new List<string>();
                for (int col = 0; col < colCount; col++)
                {
                    var header = cells[0, col].StringValue;
                    headers.Add(header);
                }

                // Read the rows
                for (int row = 1; row < rowCount; row++)
                {
                    var rowData = new Dictionary<string, object>();
                    for (int col = 0; col < colCount; col++)
                    {
                        var cellValue = cells[row, col].StringValue;
                        rowData[headers[col]] = cellValue;
                    }
                    result.Add(rowData);
                }

                return JsonSerializer.Serialize(result);
            }
        }
    }
}
