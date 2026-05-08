// Free, keyless geocoding via Open-Meteo.
export interface GeocodeHit {
  name: string;
  country?: string;
  admin1?: string;
  lat: number;
  lon: number;
  tz: string;
}

export async function geocodeCity(query: string, signal?: AbortSignal): Promise<GeocodeHit[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=en&format=json`;
  const res = await fetch(url, { signal });
  if (!res.ok) return [];
  const data = await res.json();
  const results = (data?.results ?? []) as Array<{
    name: string; country?: string; admin1?: string;
    latitude: number; longitude: number; timezone: string;
  }>;
  return results.map(r => ({
    name: r.name, country: r.country, admin1: r.admin1,
    lat: r.latitude, lon: r.longitude, tz: r.timezone,
  }));
}
