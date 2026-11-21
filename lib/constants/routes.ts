export const ROUTE_LOCATIONS = '/locations';
export const ROUTE_CATEGORIES = '/categories';
export const ROUTE_CATALOG = '/catalog';

export function categoryEditRoute(id: string) {
  return `${ROUTE_CATEGORIES}/${id}`;
}

export function locationEditRoute(id: string) {
  return `${ROUTE_LOCATIONS}/${id}`;
}
