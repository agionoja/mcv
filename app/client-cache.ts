import { ROUTES } from "~/routes";

interface CacheEntry<T = unknown> {
  route: `${ROUTES}`;
  data: T;
  timestamp: number;
  maxAge: number;
}

type CacheOptions<T> = Omit<
  CacheEntry<T>,
  "timestamp" & { timestamp?: number }
>;

const CACHE_NAME = "client-cache" as const;
const DEFAULT_MAX_AGE = 60 * 60;

export function getAllCache() {
  const cache = localStorage.getItem(CACHE_NAME);

  if (!cache) {
    return [];
  }
  return JSON.parse(cache) as CacheEntry[];
}

export function getRouteCache(route: CacheEntry["route"]) {
  const cache = getAllCache();

  return cache.find((c) => c.route === route);
}

export function addRouteCache({ maxAge, route, timestamp, data }: CacheEntry) {
  const cache = getAllCache();
  const updatedCache = [...cache, { maxAge, route, timestamp, data }];
  localStorage.setItem(CACHE_NAME, JSON.stringify(updatedCache));
}

export function inValidateCache(route: CacheEntry["route"]) {
  const cache = getAllCache();
  localStorage.setItem(
    CACHE_NAME,
    JSON.stringify(cache.filter((c) => c.route !== route)),
  );
}

class CacheError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CacheError";
  }
}

export class ClientCache {
  private static instance: ClientCache;
  private storage: Storage;

  private constructor() {
    this.storage = localStorage;
  }

  static get getInstance() {
    if (!ClientCache.instance) ClientCache.instance = new ClientCache();
    return ClientCache.instance;
  }

  invalidateCache(route: CacheEntry["route"]) {
    try {
      const cache = this.getAllCache();
      this.storage.setItem(
        CACHE_NAME,
        JSON.stringify(cache.filter((c) => c.route !== route)),
      );
    } catch (error) {
      console.error(`Failed to invalidate cache for route ${route}:`, error);
    }
  }

  clearCache(): void {
    try {
      this.storage.removeItem(CACHE_NAME);
    } catch (error) {
      console.error("Failed to clear cache:", error);
    }
  }

  isValidCache<T extends CacheEntry = CacheEntry>(cache: T) {
    if (!cache) return false;
    const age = (Date.now() - cache.timestamp) / 1000;
    return age <= cache.maxAge;
  }

  getAllCache(): CacheEntry[] {
    try {
      const cache = this.storage.getItem(CACHE_NAME);
      return cache ? JSON.parse(cache) : [];
    } catch (err) {
      console.error("Failed to get cache:", err);
      return [];
    }
  }

  getCacheAge(route: CacheEntry["route"]) {
    const cache = this.getRouteCache(route);
    if (!cache) return null;

    return (Date.now() - cache.timestamp) / 1000;
  }

  getRouteCache<T>(route: `${ROUTES}`) {
    try {
      const cache = getAllCache();
      const entry = cache.find((c) => c.route === route) as
        | CacheEntry<T>
        | undefined;

      if (!entry || !this.isValidCache<CacheEntry<T>>(entry)) return null;

      return entry;
    } catch (error) {
      console.error(`Failed to get cache for route ${route}:`, error);
      return null;
    }
  }

  setRouteCache<T>({ route, maxAge = DEFAULT_MAX_AGE, data }: CacheOptions<T>) {
    try {
      const cache = this.getAllCache();
      const timestamp = Date.now();

      const filteredCache = cache.filter((c) => c.route !== route);

      const updatedCache = [
        ...filteredCache,
        {
          route,
          data,
          timestamp,
          maxAge,
        },
      ];

      this.storage.setItem(CACHE_NAME, JSON.stringify(updatedCache));
    } catch (err) {
      console.error(`Failed to set cache for route ${route}:`, err);
    }
  }
}

export const clientCache = ClientCache.getInstance;
