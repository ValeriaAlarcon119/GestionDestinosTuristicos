using HotelBediaX.Api.Models;

namespace HotelBediaX.Api.Repositories;

public interface IDestinationRepository
{
    IQueryable<Destination> Query();
    Destination? GetById(int id);
    Destination Add(Destination destination);
    bool Update(Destination destination);
    bool Delete(int id);
}


