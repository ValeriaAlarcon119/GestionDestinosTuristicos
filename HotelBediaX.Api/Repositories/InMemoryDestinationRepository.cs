using HotelBediaX.Api.Models;

namespace HotelBediaX.Api.Repositories;

public class InMemoryDestinationRepository : IDestinationRepository
{
    private readonly List<Destination> _destinations;
    private int _nextId;

    public InMemoryDestinationRepository()
    {
        // Puedes aumentar este número a 200_000 para probar grandes volúmenes.
        _destinations = SeedDestinations(50_000);
        _nextId = _destinations.Max(d => d.Id) + 1;
    }

    public IQueryable<Destination> Query() => _destinations.AsQueryable();

    public Destination? GetById(int id) =>
        _destinations.FirstOrDefault(d => d.Id == id);

    public Destination Add(Destination destination)
    {
        destination.Id = _nextId++;
        _destinations.Add(destination);
        return destination;
    }

    public bool Update(Destination destination)
    {
        var index = _destinations.FindIndex(d => d.Id == destination.Id);
        if (index == -1) return false;
        _destinations[index] = destination;
        return true;
    }

    public bool Delete(int id)
    {
        var existing = GetById(id);
        if (existing is null) return false;
        return _destinations.Remove(existing);
    }

    private static List<Destination> SeedDestinations(int count)
    {
        var countries = new[]
        {
            "Spain", "France", "Italy", "United States", "Mexico",
            "Brazil", "Japan", "Australia", "Canada", "Portugal"
        };

        var citiesByCountry = new Dictionary<string, string[]>
        {
            ["Spain"] = new[] { "Madrid", "Barcelona", "Seville", "Valencia" },
            ["France"] = new[] { "Paris", "Lyon", "Nice", "Marseille" },
            ["Italy"] = new[] { "Rome", "Milan", "Florence", "Venice" },
            ["United States"] = new[] { "New York", "Miami", "Los Angeles", "San Francisco" },
            ["Mexico"] = new[] { "Cancún", "Mexico City", "Guadalajara", "Tulum" },
            ["Brazil"] = new[] { "Rio de Janeiro", "São Paulo", "Salvador" },
            ["Japan"] = new[] { "Tokyo", "Osaka", "Kyoto" },
            ["Australia"] = new[] { "Sydney", "Melbourne", "Brisbane" },
            ["Canada"] = new[] { "Toronto", "Vancouver", "Montreal" },
            ["Portugal"] = new[] { "Lisbon", "Porto", "Faro" }
        };

        var random = new Random(42);
        var list = new List<Destination>(capacity: count);

        for (var i = 1; i <= count; i++)
        {
            var country = countries[random.Next(countries.Length)];
            var availableCities = citiesByCountry[country];
            var city = availableCities[random.Next(availableCities.Length)];

            var destination = new Destination
            {
                Id = i,
                Name = $"{city} Getaway #{i}",
                Country = country,
                City = city,
                Description = $"Beautiful destination in {city}, {country}. Perfect for a relaxing stay.",
                PricePerNight = Math.Round((decimal)(random.NextDouble() * 200.0 + 50.0), 2),
                Rating = Math.Round(random.NextDouble() * 5.0, 1),
                IsActive = random.Next(0, 2) == 1
            };

            list.Add(destination);
        }

        return list;
    }
}


