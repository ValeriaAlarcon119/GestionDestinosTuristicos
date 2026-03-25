# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiamos el archivo de proyecto usando la ruta COMPLETA desde la raíz
COPY ["HotelBediaX.Api/HotelBediaX.Api.csproj", "HotelBediaX.Api/"]
RUN dotnet restore "HotelBediaX.Api/HotelBediaX.Api.csproj"

# Copiamos todo el contenido del repositorio
COPY . .

# Nos movemos a la carpeta de la API para construir
WORKDIR "/src/HotelBediaX.Api"
RUN dotnet build "HotelBediaX.Api.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "HotelBediaX.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "HotelBediaX.Api.dll"]
