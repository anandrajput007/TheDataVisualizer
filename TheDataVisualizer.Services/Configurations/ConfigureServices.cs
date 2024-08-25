using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheDataVisualizer.Services.Interfaces;
using TheDataVisualizer.Services.Repositories;
using TheDataVisualizer.Services.Services;
using TheDataVisualizer.Services.Strategies;

namespace TheDataVisualizer.Services.Configurations
{
    public static class ConfigureServices
    {
        public static void RegisterDependencies(this IServiceCollection services)
        {
            services.AddScoped<ICsvRepository, CsvRepository>();
            services.AddScoped<IFileProcessorStrategy, CsvFileProcessorStrategy>();

            services.AddScoped<IExcelRepository, ExcelRepository>();
            services.AddScoped<IFileProcessorStrategy, ExcelFileProcessorStrategy>();


            services.AddScoped<IFileProcessor, FileProcessor>();
        }
    }
}
