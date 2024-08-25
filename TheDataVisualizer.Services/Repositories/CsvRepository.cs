using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Http;
using System.Globalization;
using System.Text.Json;
using TheDataVisualizer.Services.Interfaces;

namespace TheDataVisualizer.Services.Repositories
{
    public class CsvRepository : ICsvRepository
    {
        public string ReadCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File is null or empty");

            using (var stream = file.OpenReadStream())
            using (var reader = new StreamReader(stream))
            using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true,
                HeaderValidated = null,
                MissingFieldFound = null
            }))
            {
                var records = new List<Dictionary<string, object>>();

                // Read the headers first
                if (!csv.Read())
                    throw new Exception("CSV file does not contain any records.");

                csv.ReadHeader();
                var headers = csv.Context.Reader.HeaderRecord;

                if (headers == null)
                    throw new Exception("CSV file does not contain headers.");

                while (csv.Read())
                {
                    var row = new Dictionary<string, object>();
                    foreach (var header in headers)
                    {
                        row[header] = csv.GetField(header);
                    }
                    records.Add(row);
                }

                return JsonSerializer.Serialize(records);
            }
        }
    }
}
