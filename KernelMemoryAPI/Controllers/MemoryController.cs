// using Microsoft.AspNetCore.Mvc;
// using Microsoft.KernelMemory;
// using System.ComponentModel.DataAnnotations;

// // The namespace should match your project name
// namespace KernelMemoryAPI.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class MemoryController : ControllerBase
//     {
//         private readonly IKernelMemory _memory;
//         private readonly ILogger<MemoryController> _logger;

//         public MemoryController(IKernelMemory memory, ILogger<MemoryController> logger)
//         {
//             _memory = memory;
//             _logger = logger;
//         }

//         // DTO for the import request body
//         public class ImportDocumentRequest
//         {
//             [Required]
//             public string DocumentId { get; set; } = string.Empty;
//             [Required]
//             public string FilePath { get; set; } = string.Empty;
//         }

//         [HttpPost("import")]
//         public async Task<IActionResult> ImportDocument([FromBody] ImportDocumentRequest request)
//         {
//             if (!System.IO.File.Exists(request.FilePath))
//             {
//                 _logger.LogWarning("File not found: {Path}", request.FilePath);
//                 return NotFound(new { message = $"File not found: {request.FilePath}" });
//             }

//             _logger.LogInformation("Checking if document {DocId} is already indexed.", request.DocumentId);
//             if (await _memory.IsDocumentReadyAsync(request.DocumentId))
//             {
//                 _logger.LogInformation("Document {DocId} already exists. No import needed.", request.DocumentId);
//                 return Ok(new { message = $"Document '{request.DocumentId}' already exists." });
//             }

//             try
//             {
//                 _logger.LogInformation("Importing document {DocId} from {Path}", request.DocumentId, request.FilePath);
//                 await _memory.ImportDocumentAsync(request.FilePath, documentId: request.DocumentId);
//                 _logger.LogInformation("Document {DocId} imported successfully.", request.DocumentId);
//                 return Ok(new { message = $"Document '{request.DocumentId}' imported successfully." });
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "Error during document import for {DocId}", request.DocumentId);
//                 return StatusCode(500, new { message = "An error occurred during import.", error = ex.Message });
//             }
//         }

//         [HttpGet("ask")]
//         public async Task<IActionResult> Ask([FromQuery, Required] string documentId, [FromQuery, Required] string question)
//         {
//             _logger.LogInformation("Received question for document {DocId}: '{Question}'", documentId, question);
//             try
//             {
//                 var answer = await _memory.AskAsync(question, filter: new MemoryFilter().ByDocument(documentId));
//                 _logger.LogInformation("Answer generated for document {DocId}. Found {SourceCount} sources.", documentId, answer.RelevantSources.Count);
//                 return Ok(answer);
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "Error processing 'ask' request for document {DocId}", documentId);
//                 return StatusCode(500, new { message = "An error occurred while asking the question.", error = ex.Message });
//             }
//         }

//         [HttpGet("inspect")]
//         public async Task<IActionResult> Inspect([FromQuery, Required] string documentId)
//         {
//             _logger.LogInformation("Inspecting memory for document {DocId}", documentId);
//             try
//             {
//                 var results = await _memory.SearchAsync(
//                     query: "*",
//                     filter: new MemoryFilter().ByDocument(documentId)
//                 );

//                 if (!results.Results.Any())
//                 {
//                     _logger.LogWarning("No data found for document {DocId} during inspection.", documentId);
//                     return NotFound(new { message = "No data found for this document." });
//                 }

//                 var chunks = results.Results.Select(r => r.Partitions.First().Text);
//                 _logger.LogInformation("Inspection found {Count} chunks for document {DocId}", chunks.Count(), documentId);
//                 return Ok(new { documentId, chunkCount = chunks.Count(), chunks });
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "Error during memory inspection for {DocId}", documentId);
//                 return StatusCode(500, new { message = "An error occurred during inspection.", error = ex.Message });
//             }
//         }
//     }
// }








// using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.Http;
// using Microsoft.KernelMemory;
// using System.ComponentModel.DataAnnotations;
// using System.IO;
// using System.Linq;
// using System.Threading.Tasks;

// namespace KernelMemoryAPI.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class MemoryController : ControllerBase
//     {
//         private readonly IKernelMemory _memory;
//         private readonly ILogger<MemoryController> _logger;

//         public MemoryController(IKernelMemory memory, ILogger<MemoryController> logger)
//         {
//             _memory = memory;
//             _logger = logger;
//         }

//         // --- WHAT CHANGED (1/2) ---
//         // The file (IFormFile) is now a property inside the request model.
//         // This bundles all multipart/form-data inputs into a single object.
//         public class ImportDocumentRequest
//         {
//             [Required]
//             public string DocumentId { get; set; } = string.Empty;

//             [Required]
//             public IFormFile? File { get; set; }
//         }

//         [HttpPost("import")]
//         public async Task<IActionResult> ImportDocument([FromForm] ImportDocumentRequest request)
//         {
//             if (request.File == null || request.File.Length == 0)
//                 return BadRequest(new { message = "No file uploaded." });

//             // Save the uploaded file to a temporary path
//             var tempFile = Path.Combine(Path.GetTempPath(), request.File.FileName);
//             await using (var stream = System.IO.File.Create(tempFile))
//             {
//                 await request.File.CopyToAsync(stream);
//             }

//             // Check if the document is already indexed
//             if (await _memory.IsDocumentReadyAsync(request.DocumentId))
//             {
//                 _logger.LogInformation("Document {DocId} already exists.", request.DocumentId);
//                 return Ok(new { message = $"Document '{request.DocumentId}' already exists." });
//             }

//             // Import the document from the temporary file into Kernel Memory
//             _logger.LogInformation("Importing document {DocId} from temporary file {Path}", request.DocumentId, tempFile);
//             await _memory.ImportDocumentAsync(tempFile, documentId: request.DocumentId);

//             // Clean up the temporary file
//             System.IO.File.Delete(tempFile);

//             return Ok(new { message = $"Document '{request.DocumentId}' imported successfully." });
//         }

//         // [HttpGet("ask")]
//         // public async Task<IActionResult> Ask(
//         //     [FromQuery, Required] string documentId,
//         //     [FromQuery, Required] string question)
//         // {
//         //     var answer = await _memory.AskAsync(
//         //         question,
//         //         filter: MemoryFilters.ByDocument(documentId)
//         //     );
//         //     return Ok(answer);
//         // }

//         [HttpGet("ask")]
//         public async Task<IActionResult> Ask(
//             [FromQuery] string? documentId,  // Remove [Required] attribute
//             [FromQuery, Required] string question)
//         {
//             _logger.LogInformation("Received question: '{Question}' for documentId: '{DocId}'",
//                 question, documentId ?? "ALL");

//             try
//             {
//                 MemoryAnswer answer;

//                 if (!string.IsNullOrEmpty(documentId))
//                 {
//                     // Document-specific search
//                     answer = await _memory.AskAsync(
//                         question,
//                         filter: MemoryFilters.ByDocument(documentId)
//                     );
//                     _logger.LogInformation("Document-specific search completed for {DocId}", documentId);
//                 }
//                 else
//                 {
//                     // Global search across all documents
//                     answer = await _memory.AskAsync(question);
//                     _logger.LogInformation("Global search completed across all documents");
//                 }

//                 return Ok(answer);
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "Error processing ask request");
//                 return StatusCode(500, new { message = "An error occurred while processing the question.", error = ex.Message });
//             }
//         }


//         // [HttpGet("ask-global")]
//         // public async Task<IActionResult> AskGlobal([FromQuery, Required] string question)
//         // {
//         //     _logger.LogInformation("Received global question: '{Question}'", question);

//         //     try
//         //     {
//         //         var answer = await _memory.AskAsync(question); // No filter = searches all documents
//         //         _logger.LogInformation("Global search completed. Found {SourceCount} sources.", 
//         //             answer.RelevantSources.Count);
//         //         return Ok(answer);
//         //     }
//         //     catch (Exception ex)
//         //     {
//         //         _logger.LogError(ex, "Error processing global ask request");
//         //         return StatusCode(500, new { message = "An error occurred while asking the global question.", error = ex.Message });
//         //     }
//         // }


//         [HttpGet("inspect")]
//         public async Task<IActionResult> Inspect([FromQuery, Required] string documentId)
//         {
//             var results = await _memory.SearchAsync(
//                 query: "*",
//                 filter: MemoryFilters.ByDocument(documentId)
//             );

//             if (!results.Results.Any())
//                 return NotFound(new { message = "No data found for this document." });

//             var chunks = results.Results.Select(r => r.Partitions.First().Text);
//             return Ok(new { documentId, chunkCount = chunks.Count(), chunks });
//         }

//         [HttpGet("documents/{documentId}/exists")]
//         public async Task<IActionResult> DocumentExists(string documentId)
//         {
//             try
//             {
//                 bool exists = await _memory.IsDocumentReadyAsync(documentId);
//                 return Ok(new { documentId, exists });
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "Error checking document existence");
//                 return StatusCode(500, new { message = "An error occurred while checking document existence.", error = ex.Message });
//             }
//         }




//     }


// }
















using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.KernelMemory;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace KernelMemoryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MemoryController : ControllerBase
    {
        private readonly IKernelMemory _memory;
        private readonly ILogger<MemoryController> _logger;

        public MemoryController(IKernelMemory memory, ILogger<MemoryController> logger)
        {
            _memory = memory;
            _logger = logger;
        }

        public class ImportDocumentRequest
        {
            [Required]
            public string DocumentId { get; set; } = string.Empty;

            [Required]
            public IFormFile? File { get; set; }
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportDocument([FromForm] ImportDocumentRequest request)
        {
            if (request.File == null || request.File.Length == 0)
                return BadRequest(new { message = "No file uploaded." });

            // Save the uploaded file to a temporary path
            var tempFile = Path.Combine(Path.GetTempPath(), request.File.FileName);
            await using (var stream = System.IO.File.Create(tempFile))
            {
                await request.File.CopyToAsync(stream);
            }

            // Check if the document is already indexed
            if (await _memory.IsDocumentReadyAsync(request.DocumentId))
            {
                _logger.LogInformation("Document {DocId} already exists.", request.DocumentId);
                return Ok(new { message = $"Document '{request.DocumentId}' already exists." });
            }

            // Import the document from the temporary file into Kernel Memory
            _logger.LogInformation("Importing document {DocId} from temporary file {Path}", request.DocumentId, tempFile);
            await _memory.ImportDocumentAsync(tempFile, documentId: request.DocumentId);

            // Clean up the temporary file
            System.IO.File.Delete(tempFile);

            return Ok(new { message = $"Document '{request.DocumentId}' imported successfully." });
        }

        [HttpGet("ask")]
        public async Task<IActionResult> Ask(
            [FromQuery] string? documentId,
            [FromQuery, Required] string question)
        {
            _logger.LogInformation("Received question: '{Question}' for documentId: '{DocId}'",
                question, documentId ?? "ALL");

            try
            {
                MemoryAnswer answer;

                if (!string.IsNullOrEmpty(documentId))
                {
                    answer = await _memory.AskAsync(
                        question,
                        filter: MemoryFilters.ByDocument(documentId)
                    );
                    _logger.LogInformation("Document-specific search completed for {DocId}", documentId);
                }
                else
                {
                    answer = await _memory.AskAsync(question);
                    _logger.LogInformation("Global search completed across all documents");
                }

                return Ok(answer);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing ask request");
                return StatusCode(500, new { message = "An error occurred while processing the question.", error = ex.Message });
            }
        }

        [HttpGet("inspect")]
        public async Task<IActionResult> Inspect([FromQuery, Required] string documentId)
        {
            var results = await _memory.SearchAsync(
                query: "*",
                filter: MemoryFilters.ByDocument(documentId)
            );

            if (!results.Results.Any())
                return NotFound(new { message = "No data found for this document." });

            var chunks = results.Results.Select(r => r.Partitions.First().Text);
            return Ok(new { documentId, chunkCount = chunks.Count(), chunks });
        }

        // NEW ENDPOINTS FOR DOCUMENT MANAGEMENT

        /// <summary>
        /// Get all available documents in the memory store
        /// </summary>
        [HttpGet("documents")]
        public async Task<IActionResult> GetAllDocuments()
        {
            try
            {
                _logger.LogInformation("Retrieving all documents from memory store");

                // Search for all documents with a wildcard query
                var results = await _memory.SearchAsync(
                    query: "*",
                    limit: 1000 // Adjust based on your needs
                );

                if (!results.Results.Any())
                {
                    return Ok(new
                    {
                        message = "No documents found in the memory store.",
                        documents = new List<object>(),
                        totalCount = 0
                    });
                }

                // Group results by document ID and get document info
                var documents = results.Results
                    .SelectMany(r => r.Partitions)
                    .GroupBy(p => p.Tags.ContainsKey("__document_id") ? p.Tags["__document_id"].FirstOrDefault() : "unknown")
                    .Select(g => new
                    {
                        DocumentId = g.Key,
                        ChunkCount = g.Count(),
                        TotalCharacters = g.Sum(p => p.Text.Length),
                        FirstChunkPreview = g.First().Text.Length > 100
                            ? g.First().Text.Substring(0, 100) + "..."
                            : g.First().Text,
                        Tags = g.First().Tags.Where(kvp => !kvp.Key.StartsWith("__")).ToDictionary(kvp => kvp.Key, kvp => kvp.Value)
                    })
                    .OrderBy(d => d.DocumentId)
                    .ToList();

                _logger.LogInformation("Found {DocumentCount} documents in memory store", documents.Count);

                return Ok(new
                {
                    documents,
                    totalCount = documents.Count,
                    message = $"Found {documents.Count} documents in the memory store."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving documents from memory store");
                return StatusCode(500, new { message = "An error occurred while retrieving documents.", error = ex.Message });
            }
        }

        /// <summary>
        /// Get detailed information about a specific document
        /// </summary>
        [HttpGet("documents/{documentId}")]
        public async Task<IActionResult> GetDocumentDetails(string documentId)
        {
            try
            {
                _logger.LogInformation("Retrieving details for document: {DocId}", documentId);

                // Check if document exists and is ready
                var isReady = await _memory.IsDocumentReadyAsync(documentId);
                if (!isReady)
                {
                    return NotFound(new { message = $"Document '{documentId}' not found or not ready." });
                }

                // Get all chunks for this document
                var results = await _memory.SearchAsync(
                    query: "*",
                    filter: MemoryFilters.ByDocument(documentId),
                    limit: 1000
                );

                if (!results.Results.Any())
                {
                    return NotFound(new { message = $"No data found for document '{documentId}'." });
                }

                var allPartitions = results.Results.SelectMany(r => r.Partitions).ToList();

                var documentDetails = new
                {
                    DocumentId = documentId,
                    IsReady = isReady,
                    ChunkCount = allPartitions.Count,
                    TotalCharacters = allPartitions.Sum(p => p.Text.Length),
                    AverageChunkSize = allPartitions.Any() ? (int)allPartitions.Average(p => p.Text.Length) : 0,
                    Tags = allPartitions.FirstOrDefault()?.Tags?.Where(kvp => !kvp.Key.StartsWith("__")).ToDictionary(kvp => kvp.Key, kvp => kvp.Value) ?? new Dictionary<string, List<string?>>(),
                    Chunks = allPartitions.Select((p, index) => new
                    {
                        Index = index + 1,
                        CharacterCount = p.Text.Length,
                        Preview = p.Text.Length > 200 ? p.Text.Substring(0, 200) + "..." : p.Text,
                        FullText = p.Text // Include full text if needed
                    }).ToList()
                };

                _logger.LogInformation("Retrieved details for document {DocId}: {ChunkCount} chunks, {TotalChars} characters",
                    documentId, documentDetails.ChunkCount, documentDetails.TotalCharacters);

                return Ok(documentDetails);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving details for document {DocId}", documentId);
                return StatusCode(500, new { message = "An error occurred while retrieving document details.", error = ex.Message });
            }
        }

        /// <summary>
        /// Check if a specific document exists and is ready
        /// </summary>
        [HttpGet("documents/{documentId}/status")]
        public async Task<IActionResult> GetDocumentStatus(string documentId)
        {
            try
            {
                _logger.LogInformation("Checking status for document: {DocId}", documentId);

                var isReady = await _memory.IsDocumentReadyAsync(documentId);

                return Ok(new
                {
                    DocumentId = documentId,
                    IsReady = isReady,
                    Status = isReady ? "Ready" : "Not Found or Processing",
                    Message = isReady
                        ? $"Document '{documentId}' is ready for querying."
                        : $"Document '{documentId}' not found or still processing."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking status for document {DocId}", documentId);
                return StatusCode(500, new { message = "An error occurred while checking document status.", error = ex.Message });
            }
        }

        /// <summary>
        /// Get a list of just document IDs (lightweight endpoint)
        /// </summary>
        [HttpGet("documents/ids")]
        public async Task<IActionResult> GetDocumentIds()
        {
            try
            {
                _logger.LogInformation("Retrieving all document IDs");

                var results = await _memory.SearchAsync(
                    query: "*",
                    limit: 1000
                );

                if (!results.Results.Any())
                {
                    return Ok(new
                    {
                        documentIds = new List<string>(),
                        totalCount = 0,
                        message = "No documents found."
                    });
                }

                var documentIds = results.Results
                    .SelectMany(r => r.Partitions)
                    .Where(p => p.Tags.ContainsKey("__document_id"))
                    .Select(p => p.Tags["__document_id"].FirstOrDefault())
                    .Where(id => !string.IsNullOrEmpty(id))
                    .Distinct()
                    .OrderBy(id => id)
                    .ToList();

                _logger.LogInformation("Found {DocumentCount} unique document IDs", documentIds.Count);

                return Ok(new
                {
                    documentIds,
                    totalCount = documentIds.Count,
                    message = $"Found {documentIds.Count} document(s)."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving document IDs");
                return StatusCode(500, new { message = "An error occurred while retrieving document IDs.", error = ex.Message });
            }
        }

        /// <summary>
        /// Delete a specific document from memory store
        /// </summary>
        [HttpDelete("documents/{documentId}")]
        public async Task<IActionResult> DeleteDocument(string documentId)
        {
            try
            {
                _logger.LogInformation("Attempting to delete document: {DocId}", documentId);

                // Check if document exists first
                var isReady = await _memory.IsDocumentReadyAsync(documentId);
                if (!isReady)
                {
                    return NotFound(new { message = $"Document '{documentId}' not found." });
                }

                // Delete the document
                await _memory.DeleteDocumentAsync(documentId);

                _logger.LogInformation("Successfully deleted document: {DocId}", documentId);

                return Ok(new
                {
                    message = $"Document '{documentId}' deleted successfully.",
                    documentId = documentId
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting document {DocId}", documentId);
                return StatusCode(500, new { message = "An error occurred while deleting the document.", error = ex.Message });
            }
        }
    }
}