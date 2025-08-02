// // var builder = WebApplication.CreateBuilder(args);

// // // Add services to the container.

// // builder.Services.AddControllers();
// // // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// // builder.Services.AddEndpointsApiExplorer();
// // builder.Services.AddSwaggerGen();

// // var app = builder.Build();

// // // Configure the HTTP request pipeline.
// // if (app.Environment.IsDevelopment())
// // {
// //     app.UseSwagger();
// //     app.UseSwaggerUI();
// // }

// // app.UseHttpsRedirection();

// // app.UseAuthorization();

// // app.MapControllers();

// // app.Run();



// using Microsoft.KernelMemory;
// using Microsoft.KernelMemory.AI.OpenAI;
// using Microsoft.KernelMemory.MongoDbAtlas;
// using DotNetEnv;

// // Load environment variables from .env file
// Env.Load();

// var builder = WebApplication.CreateBuilder(args);

// // --- Configuration Loading ---
// var openAiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY")
//     ?? throw new ArgumentException("Missing OPENAI_API_KEY in .env");
// var embeddingModel = Environment.GetEnvironmentVariable("OPENAI_EMBEDDING_MODEL")
//     ?? "text-embedding-3-small";
// var textModel = Environment.GetEnvironmentVariable("OPENAI_TEXT_MODEL")
//     ?? "gpt-4o-mini";
// var mongoConn = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING")
//     ?? throw new ArgumentException("Missing MONGODB_CONNECTION_STRING in .env");
// var databaseName = Environment.GetEnvironmentVariable("DATABASE_NAME")
//     ?? throw new ArgumentException("Missing DATABASE_NAME in .env");

// // --- Kernel Memory Configuration ---
// var openAiConfig = new OpenAIConfig
// {
//     APIKey = openAiKey,
//     EmbeddingModel = embeddingModel,
//     TextModel = textModel,
//     TextModelMaxTokenTotal = 8192,
//     EmbeddingModelMaxTokenTotal = 8191
// };

// var mongoConfig = new MongoDbAtlasConfig()
//     .WithConnectionString(mongoConn)
//     .WithDatabaseName(databaseName)
//     .WithSingleCollectionForVectorSearch(true);

// // --- Build and Register Kernel Memory as a Singleton ---
// IKernelMemory memory = new KernelMemoryBuilder()
//     .WithOpenAITextGeneration(openAiConfig)
//     .WithOpenAITextEmbeddingGeneration(openAiConfig)
//     .WithMongoDbAtlasMemoryDbAndDocumentStorage(mongoConfig)
//     .Build();

// builder.Services.AddSingleton(memory);

// // Add services to the container.
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();
// app.UseAuthorization();
// app.MapControllers();

// app.Run();







// using Microsoft.AspNetCore.Builder;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
// using Microsoft.KernelMemory;
// using Microsoft.KernelMemory.AI.OpenAI;
// using Microsoft.KernelMemory.MongoDbAtlas;
// using DotNetEnv;

// Env.Load();  // Load .env

// var builder = WebApplication.CreateBuilder(args);

// // 1. Read environment variables
// var openAiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY")
//     ?? throw new ArgumentException("Missing OPENAI_API_KEY");
// var embeddingModel = Environment.GetEnvironmentVariable("OPENAI_EMBEDDING_MODEL") ?? "text-embedding-3-small";
// var textModel = Environment.GetEnvironmentVariable("OPENAI_TEXT_MODEL") ?? "gpt-4o-mini";
// var mongoConn = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING")
//     ?? throw new ArgumentException("Missing MONGODB_CONNECTION_STRING");
// var databaseName = Environment.GetEnvironmentVariable("DATABASE_NAME")
//     ?? throw new ArgumentException("Missing DATABASE_NAME");

// // 2. Configure OpenAI & MongoDB Atlas
// var openAiConfig = new OpenAIConfig
// {
//     APIKey = openAiKey,
//     EmbeddingModel = embeddingModel,
//     TextModel = textModel,
//     TextModelMaxTokenTotal = 8192,
//     EmbeddingModelMaxTokenTotal = 8191
// };
// var mongoConfig = new MongoDbAtlasConfig()
//     .WithConnectionString(mongoConn)
//     .WithDatabaseName(databaseName)
//     .WithSingleCollectionForVectorSearch(true);

// // 3. Build KernelMemory and register as singleton
// IKernelMemory memory = new KernelMemoryBuilder()
//     .WithOpenAITextGeneration(openAiConfig)
//     .WithOpenAITextEmbeddingGeneration(openAiConfig)
//     .WithMongoDbAtlasMemoryDbAndDocumentStorage(mongoConfig)
//     .Build();
// builder.Services.AddSingleton(memory);

// // 4. Add controllers & Swagger
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();
// app.UseAuthorization();
// app.MapControllers();
// app.Run();








// Working ===================================================================================================================



// using Microsoft.AspNetCore.Builder;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
// using Microsoft.KernelMemory;
// using Microsoft.KernelMemory.AI.OpenAI;
// using Microsoft.KernelMemory.MongoDbAtlas;
// using DotNetEnv;

// Env.Load();  // Load .env

// var builder = WebApplication.CreateBuilder(args);

// // 1. Read environment variables
// var openAiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY")
//     ?? throw new ArgumentException("Missing OPENAI_API_KEY");
// var embeddingModel = Environment.GetEnvironmentVariable("OPENAI_EMBEDDING_MODEL") ?? "text-embedding-3-small";
// var textModel = Environment.GetEnvironmentVariable("OPENAI_TEXT_MODEL") ?? "gpt-4o-mini";
// var mongoConn = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING")
//     ?? throw new ArgumentException("Missing MONGODB_CONNECTION_STRING");
// var databaseName = Environment.GetEnvironmentVariable("DATABASE_NAME")
//     ?? throw new ArgumentException("Missing DATABASE_NAME");

// // 2. Configure OpenAI & MongoDB Atlas
// var openAiConfig = new OpenAIConfig
// {
//     APIKey = openAiKey,
//     EmbeddingModel = embeddingModel,
//     TextModel = textModel,
//     TextModelMaxTokenTotal = 8192,
//     EmbeddingModelMaxTokenTotal = 8191
// };
// var mongoConfig = new MongoDbAtlasConfig()
//     .WithConnectionString(mongoConn)
//     .WithDatabaseName(databaseName)
//     .WithSingleCollectionForVectorSearch(true);

// // 3. Build KernelMemory and register as singleton
// IKernelMemory memory = new KernelMemoryBuilder()
//     .WithOpenAITextGeneration(openAiConfig)
//     .WithOpenAITextEmbeddingGeneration(openAiConfig)
//     .WithMongoDbAtlasMemoryDbAndDocumentStorage(mongoConfig)
//     .Build();
// builder.Services.AddSingleton(memory);

// // 4. Add CORS policy for React frontend
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowReactApp", policy =>
//     {
//         policy.WithOrigins("http://localhost:3000") // React development server
//               .AllowAnyHeader()
//               .AllowAnyMethod()
//               .AllowCredentials(); // Optional: if you need to send cookies/auth
//     });
// });

// // 5. Add controllers & Swagger
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// // IMPORTANT: Add CORS before other middleware
// app.UseCors("AllowReactApp");

// app.UseHttpsRedirection();
// app.UseAuthorization();
// app.MapControllers();
// app.Run();








// ==================================================================================================================================================

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.KernelMemory;
using Microsoft.KernelMemory.AI.OpenAI;
using Microsoft.KernelMemory.MongoDbAtlas;
using DotNetEnv;

// Only load .env in development
if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "Production")
{
    Env.Load();
}

var builder = WebApplication.CreateBuilder(args);

// 1. Read environment variables
var openAiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY")
    ?? throw new ArgumentException("Missing OPENAI_API_KEY");
var embeddingModel = Environment.GetEnvironmentVariable("OPENAI_EMBEDDING_MODEL") ?? "text-embedding-3-small";
var textModel = Environment.GetEnvironmentVariable("OPENAI_TEXT_MODEL") ?? "gpt-4o-mini";
var mongoConn = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING")
    ?? throw new ArgumentException("Missing MONGODB_CONNECTION_STRING");
var databaseName = Environment.GetEnvironmentVariable("DATABASE_NAME")
    ?? throw new ArgumentException("Missing DATABASE_NAME");

// 2. Configure OpenAI & MongoDB Atlas
var openAiConfig = new OpenAIConfig
{
    APIKey = openAiKey,
    EmbeddingModel = embeddingModel,
    TextModel = textModel,
    TextModelMaxTokenTotal = 8192,
    EmbeddingModelMaxTokenTotal = 8191
};
var mongoConfig = new MongoDbAtlasConfig()
    .WithConnectionString(mongoConn)
    .WithDatabaseName(databaseName)
    .WithSingleCollectionForVectorSearch(true);

// 3. Build KernelMemory and register as singleton
IKernelMemory memory = new KernelMemoryBuilder()
    .WithOpenAITextGeneration(openAiConfig)
    .WithOpenAITextEmbeddingGeneration(openAiConfig)
    .WithMongoDbAtlasMemoryDbAndDocumentStorage(mongoConfig)
    .Build();
builder.Services.AddSingleton(memory);

// 4. Add CORS policy - allow any origin for now (update later with your domain)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 5. Add controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure for development and production
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS
app.UseCors("AllowAll");

// Don't redirect to HTTPS in containerized environments (handled by load balancer)
// app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();
app.Run();

























