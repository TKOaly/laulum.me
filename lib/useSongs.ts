import { useCallback, useEffect, useMemo, useState } from "react";
import { partial_ratio } from "fuzzball";

import {
  PersonalizationState,
  SortMode,
  DEFAULT_PERSONALIZATION_STATE,
  readPersonalization,
  recordSongVisit,
  setSongSortMode,
  toggleSongFavorite,
  toggleSongHidden,
} from "@/lib/personalization";

export type BaseSong = {
  title: string;
  slug: string;
  isContentHidden: boolean;
};

export type SongView = {
  title: string;
  slug: string;
  timesVisited: number;
  lastVisited: number | null;
  favoritedAt: number | null;
  hiddenAt: number | null;
  isFavorite: boolean;
  isUserHidden: boolean;
  isContentHidden: boolean;
  isHiddenEffective: boolean;
};

export type UseSongsResult = {
  query: string;
  setQuery: (value: string) => void;
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
  showHidden: boolean;
  setShowHidden: (value: boolean) => void;
  visibleSongs: SongView[];
  favoriteSongs: SongView[];
  allSongs: SongView[];
  hasHydrated: boolean;
  hiddenCount: number;
  toggleFavorite: (slug: string) => void;
  toggleHidden: (slug: string) => void;
  recordVisit: (slug: string) => void;
};

const orderAlphabetically = (a: SongView, b: SongView) =>
  a.title.localeCompare(b.title);

const orderByMostVisited = (a: SongView, b: SongView) => {
  if (a.timesVisited !== b.timesVisited) {
    return b.timesVisited - a.timesVisited;
  }

  return a.title.localeCompare(b.title);
};

const toSongView = (song: BaseSong, state: PersonalizationState): SongView => {
  const hit = state.hits[song.slug];
  const favoritedAt = state.favorites[song.slug];
  const hiddenAt = state.hidden[song.slug];
  const isUserHidden = typeof hiddenAt === "number";

  return {
    title: song.title,
    slug: song.slug,
    timesVisited: hit?.timesVisited ?? 0,
    lastVisited: hit?.lastVisited ?? null,
    favoritedAt: typeof favoritedAt === "number" ? favoritedAt : null,
    hiddenAt: isUserHidden ? hiddenAt : null,
    isFavorite: typeof favoritedAt === "number",
    isUserHidden,
    isContentHidden: song.isContentHidden,
    isHiddenEffective: song.isContentHidden || isUserHidden,
  };
};

export const useSongs = (baseSongs: BaseSong[]): UseSongsResult => {
  const [query, setQuery] = useState("");
  const [showHidden, setShowHidden] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [state, setState] = useState<PersonalizationState>(
    DEFAULT_PERSONALIZATION_STATE
  );

  useEffect(() => {
    setState(readPersonalization());
    setHasHydrated(true);
  }, []);

  const allSongs = useMemo(
    () => baseSongs.map((song) => toSongView(song, state)),
    [baseSongs, state]
  );

  const nonContentHiddenSongs = useMemo(
    () => allSongs.filter((song) => !song.isContentHidden),
    [allSongs]
  );

  const hiddenCount = useMemo(
    () => nonContentHiddenSongs.filter((song) => song.isUserHidden).length,
    [nonContentHiddenSongs]
  );

  const favoriteSongs = useMemo(
    () =>
      nonContentHiddenSongs
        .filter((song) => song.isFavorite && (showHidden || !song.isUserHidden))
        .sort((a, b) => {
          const aFavoritedAt = a.favoritedAt ?? 0;
          const bFavoritedAt = b.favoritedAt ?? 0;

          if (aFavoritedAt !== bFavoritedAt) {
            return bFavoritedAt - aFavoritedAt;
          }

          return a.title.localeCompare(b.title);
        }),
    [nonContentHiddenSongs, showHidden]
  );

  const visibleSongs = useMemo(() => {
    const maybeFiltered = showHidden
      ? nonContentHiddenSongs
      : nonContentHiddenSongs.filter((song) => !song.isUserHidden);

    if (query.trim().length > 0) {
      return maybeFiltered
        .map((song) => ({
          song,
          score: partial_ratio(query, song.title),
        }))
        .filter(({ score }) => score >= 40)
        .sort((a, b) => {
          if (a.score !== b.score) {
            return b.score - a.score;
          }

          return orderAlphabetically(a.song, b.song);
        })
        .slice(0, 15)
        .map(({ song }) => song);
    }

    const sortedSongs = [...maybeFiltered];
    sortedSongs.sort(
      state.sortMode === "mostVisited" ? orderByMostVisited : orderAlphabetically
    );
    return sortedSongs;
  }, [nonContentHiddenSongs, query, showHidden, state.sortMode]);

  const handleSortMode = useCallback((mode: SortMode) => {
    const next = setSongSortMode(mode);
    setState(next);
  }, []);

  const handleToggleFavorite = useCallback((slug: string) => {
    const next = toggleSongFavorite(slug);
    setState(next);
  }, []);

  const handleToggleHidden = useCallback((slug: string) => {
    const next = toggleSongHidden(slug);
    setState(next);
  }, []);

  const handleRecordVisit = useCallback((slug: string) => {
    const next = recordSongVisit(slug);
    setState(next);
  }, []);

  return {
    query,
    setQuery,
    sortMode: state.sortMode,
    setSortMode: handleSortMode,
    showHidden,
    setShowHidden,
    visibleSongs,
    favoriteSongs,
    allSongs,
    hasHydrated,
    hiddenCount,
    toggleFavorite: handleToggleFavorite,
    toggleHidden: handleToggleHidden,
    recordVisit: handleRecordVisit,
  };
};
