using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TheDataVisualizer.Services.Interfaces;

namespace TheDataVisualizer.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileReaderController : ControllerBase
    {
        private readonly IFileProcessor _fileProcessor;

        public FileReaderController(IFileProcessor fileProcessor)
        {
            _fileProcessor = fileProcessor;
        }

        [AllowAnonymous]
        [HttpGet("healthcheck")]
        public IActionResult HealthCheck()
        {
            return Ok();
        }

        [HttpPost("upload")]
        public IActionResult UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is empty.");

            try
            {
                var json = _fileProcessor.ProcessFile(file);
                return Ok(json);
            }
            catch (NotSupportedException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
