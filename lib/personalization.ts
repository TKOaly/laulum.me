export type HitRecord = {
  lastVisited: number;
  timesVisited: number;
};

export type HitsMap = Record<string, HitRecord>;
export type TimestampMap = Record<string, number>;
export type SortMode = "alphabetical" | "mostVisited";

export type PersonalizationState = {
  hits: HitsMap;
  favorites: TimestampMap;
  hidden: TimestampMap;
  sortMode: SortMode;
};

export const DEFAULT_PERSONALIZATION_STATE: PersonalizationState = {
  hits: {},
  favorites: {},
  hidden: {},
  sortMode: "alphabetical",
};

const STORAGE_KEYS = {
  hits: "hits",
  favorites: "favorites",
  hidden: "hidden",
  sortMode: "sortMode",
} as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readObject = <T extends Record<string, unknown>>(
  key: string
): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return null;
    }
    return parsed as T;
  } catch (_error) {
    return null;
  }
};

const readSortMode = (): SortMode => {
  if (typeof window === "undefined") {
    return DEFAULT_PERSONALIZATION_STATE.sortMode;
  }

  const raw = window.localStorage.getItem(STORAGE_KEYS.sortMode);
  if (raw === "alphabetical" || raw === "mostVisited") {
    return raw;
  }
  return DEFAULT_PERSONALIZATION_STATE.sortMode;
};

const omitKey = <T extends Record<string, unknown>>(map: T, key: string): T => {
  const { [key]: _removed, ...rest } = map;
  return rest as T;
};

const toggleTimestampMap = (map: TimestampMap, slug: string): TimestampMap =>
  typeof map[slug] === "number"
    ? omitKey(map, slug)
    : { ...map, [slug]: Date.now() };

const writeMaps = (state: PersonalizationState) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEYS.hits, JSON.stringify(state.hits));
  window.localStorage.setItem(
    STORAGE_KEYS.favorites,
    JSON.stringify(state.favorites)
  );
  window.localStorage.setItem(STORAGE_KEYS.hidden, JSON.stringify(state.hidden));
  window.localStorage.setItem(STORAGE_KEYS.sortMode, state.sortMode);
};

export const readPersonalization = (): PersonalizationState => {
  const hits = readObject<HitsMap>(STORAGE_KEYS.hits) ?? {};
  const favorites = readObject<TimestampMap>(STORAGE_KEYS.favorites) ?? {};
  const hidden = readObject<TimestampMap>(STORAGE_KEYS.hidden) ?? {};

  return {
    hits,
    favorites,
    hidden,
    sortMode: readSortMode(),
  };
};

export const writePersonalization = (next: PersonalizationState) => {
  writeMaps(next);
};

export const recordSongVisit = (slug: string): PersonalizationState => {
  const current = readPersonalization();
  const now = Date.now();

  const currentRecord = current.hits[slug];
  const hits: HitsMap = {
    ...current.hits,
    [slug]: {
      lastVisited: now,
      timesVisited: currentRecord ? currentRecord.timesVisited + 1 : 1,
    },
  };

  const next = {
    ...current,
    hits,
  };

  writeMaps(next);
  return next;
};

export const toggleSongFavorite = (slug: string): PersonalizationState => {
  const current = readPersonalization();
  const favorites = toggleTimestampMap(current.favorites, slug);

  const next = {
    ...current,
    favorites,
  };

  writeMaps(next);
  return next;
};

export const toggleSongHidden = (slug: string): PersonalizationState => {
  const current = readPersonalization();
  const hidden = toggleTimestampMap(current.hidden, slug);

  const next = {
    ...current,
    hidden,
  };

  writeMaps(next);
  return next;
};

export const setSongSortMode = (mode: SortMode): PersonalizationState => {
  const current = readPersonalization();
  const next = {
    ...current,
    sortMode: mode,
  };

  writeMaps(next);
  return next;
};
