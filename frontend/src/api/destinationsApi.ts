import axios from 'axios'

export interface Destination {
  id: number
  name: string
  country: string
  city: string
  description: string
  pricePerNight: number
  rating: number
  isActive: boolean
}

export interface PagedResult<T> {
  items: T[]
  totalItems: number
  page: number
  pageSize: number
  totalPages: number
}

export interface DestinationQuery {
  search?: string
  country?: string
  city?: string
  minPrice?: number
  maxPrice?: number
  isActive?: boolean
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5210/api',
})

export async function getDestinations(
  query: DestinationQuery,
): Promise<PagedResult<Destination>> {
  const response = await api.get<PagedResult<Destination>>('/destinations', {
    params: query,
  })
  return response.data
}

export async function createDestination(
  destination: Omit<Destination, 'id'>,
): Promise<Destination> {
  const response = await api.post<Destination>('/destinations', destination)
  return response.data
}

export async function updateDestination(
  id: number,
  destination: Omit<Destination, 'id'>,
): Promise<Destination> {
  const response = await api.put<Destination>(`/destinations/${id}`, destination)
  return response.data
}

export async function deleteDestination(id: number): Promise<void> {
  await api.delete(`/destinations/${id}`)
}


