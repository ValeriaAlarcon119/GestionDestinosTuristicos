using HotelBediaX.Api.Models;
using HotelBediaX.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS para permitir llamadas desde el frontend (localhost en dev, Render en prod)
const string AllowFrontend = "AllowFrontend";
var allowedOrigins = new[]
{
    "http://localhost:5173",
    "https://localhost:5173",
    "https://gestiondestinosturisticos.netlify.app",
    "https://gestiondestinosturisticos.onrender.com",
    builder.Configuration["FRONTEND_URL"] ?? ""
}.Where(o => !string.IsNullOrWhiteSpace(o)).ToArray();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowFrontend, policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Repositorio en memoria para destinos
builder.Services.AddSingleton<IDestinationRepository, InMemoryDestinationRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(AllowFrontend);

var destinationsGroup = app.MapGroup("/api/destinations").WithTags("Destinations");

// GET /api/destinations - listado con filtros, orden y paginación
destinationsGroup.MapGet("", (
    [FromServices] IDestinationRepository repository,
    [FromQuery] string? search,
    [FromQuery] string? country,
    [FromQuery] string? city,
    [FromQuery] decimal? minPrice,
    [FromQuery] decimal? maxPrice,
    [FromQuery] bool? isActive,
    [FromQuery] string? sortBy,
    [FromQuery] string? sortDir,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 20) =>
{
    if (page < 1) page = 1;
    if (pageSize <= 0 || pageSize > 200) pageSize = 20;

    var query = repository.Query();

    if (!string.IsNullOrWhiteSpace(search))
    {
        var term = search.Trim().ToLowerInvariant();
        query = query.Where(d =>
            d.Name.ToLower().Contains(term) ||
            d.Country.ToLower().Contains(term) ||
            d.City.ToLower().Contains(term));
    }

    if (!string.IsNullOrWhiteSpace(country))
    {
        query = query.Where(d =>
            d.Country.Equals(country, StringComparison.OrdinalIgnoreCase));
    }

    if (!string.IsNullOrWhiteSpace(city))
    {
        query = query.Where(d =>
            d.City.Equals(city, StringComparison.OrdinalIgnoreCase));
    }

    if (minPrice.HasValue)
    {
        query = query.Where(d => d.PricePerNight >= minPrice.Value);
    }

    if (maxPrice.HasValue)
    {
        query = query.Where(d => d.PricePerNight <= maxPrice.Value);
    }

    if (isActive.HasValue)
    {
        query = query.Where(d => d.IsActive == isActive.Value);
    }

    var descending = string.Equals(sortDir, "desc", StringComparison.OrdinalIgnoreCase);

    query = (sortBy?.ToLowerInvariant()) switch
    {
        "name" => descending ? query.OrderByDescending(d => d.Name) : query.OrderBy(d => d.Name),
        "country" => descending ? query.OrderByDescending(d => d.Country) : query.OrderBy(d => d.Country),
        "city" => descending ? query.OrderByDescending(d => d.City) : query.OrderBy(d => d.City),
        "price" or "pricepernight" =>
            descending ? query.OrderByDescending(d => d.PricePerNight) : query.OrderBy(d => d.PricePerNight),
        "rating" =>
            descending ? query.OrderByDescending(d => d.Rating) : query.OrderBy(d => d.Rating),
        _ => query.OrderBy(d => d.Id)
    };

    var totalItems = query.Count();
    var items = query
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToList();

    var result = new PagedResult<Destination>
    {
        Items = items,
        TotalItems = totalItems,
        Page = page,
        PageSize = pageSize
    };

    return Results.Ok(result);
})
.WithName("GetDestinations")
.WithOpenApi();

// GET /api/destinations/{id}
destinationsGroup.MapGet("{id:int}", ([FromServices] IDestinationRepository repository, int id) =>
{
    var destination = repository.GetById(id);
    return destination is null ? Results.NotFound() : Results.Ok(destination);
})
.WithName("GetDestinationById")
.WithOpenApi();

// POST /api/destinations
destinationsGroup.MapPost("", ([FromServices] IDestinationRepository repository, [FromBody] Destination destination) =>
{
    if (string.IsNullOrWhiteSpace(destination.Name) ||
        string.IsNullOrWhiteSpace(destination.Country) ||
        string.IsNullOrWhiteSpace(destination.City))
    {
        return Results.BadRequest("Name, Country and City are required.");
    }

    // El Id lo asigna el repositorio
    destination.Id = 0;
    var created = repository.Add(destination);
    return Results.Created($"/api/destinations/{created.Id}", created);
})
.WithName("CreateDestination")
.WithOpenApi();

// PUT /api/destinations/{id}
destinationsGroup.MapPut("{id:int}", (
    [FromServices] IDestinationRepository repository,
    int id,
    [FromBody] Destination destination) =>
{
    var existing = repository.GetById(id);
    if (existing is null)
    {
        return Results.NotFound();
    }

    if (string.IsNullOrWhiteSpace(destination.Name) ||
        string.IsNullOrWhiteSpace(destination.Country) ||
        string.IsNullOrWhiteSpace(destination.City))
    {
        return Results.BadRequest("Name, Country and City are required.");
    }

    destination.Id = id;
    var updated = repository.Update(destination);
    return updated ? Results.Ok(destination) : Results.NotFound();
})
.WithName("UpdateDestination")
.WithOpenApi();

// DELETE /api/destinations/{id}
destinationsGroup.MapDelete("{id:int}", ([FromServices] IDestinationRepository repository, int id) =>
{
    var deleted = repository.Delete(id);
    return deleted ? Results.NoContent() : Results.NotFound();
})
.WithName("DeleteDestination")
.WithOpenApi();

app.Run();
