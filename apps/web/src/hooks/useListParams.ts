import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { ListParams } from "@/types/api.types";

import { useDebounce } from "./useDebounce";

const RESERVED_KEYS = new Set(["limit", "page", "search", "filters"]);

export function useListParams(initial: Partial<ListParams> = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsString = searchParams.toString();

  const [filters, setFilters] = useState<Partial<ListParams>>(() => {
    const result: Record<string, unknown> = { ...initial };

    RESERVED_KEYS.forEach((key) => delete result[key]);

    new URLSearchParams(paramsString).forEach((value, key) => {
      if (!RESERVED_KEYS.has(key)) {
        result[key] = value;
      }
    });

    return result as Partial<ListParams>;
  });

  const [page, setPage] = useState(
    () => Number(searchParams.get("page")) || initial.page || 1
  );

  const [searchInput, setSearchInput] = useState(
    () => searchParams.get("search") ?? initial.search ?? ""
  );

  const search = useDebounce(searchInput);

  // Track whether the latest URL change was made by this hook.
  const lastWrittenUrl = useRef<string | null>(null);

  // Sync external URL changes (KPI cards, browser back/forward, etc.).
  useEffect(() => {
    if (lastWrittenUrl.current === paramsString) {
      lastWrittenUrl.current = null;
      return;
    }

    const url = new URLSearchParams(paramsString);
    const nextFilters: Record<string, unknown> = {};

    url.forEach((value, key) => {
      if (!RESERVED_KEYS.has(key)) {
        nextFilters[key] = value;
      }
    });

    setFilters(nextFilters as Partial<ListParams>);
    setPage(Number(url.get("page")) || 1);
    setSearchInput(url.get("search") ?? "");
  }, [paramsString]);

  const params = useMemo(
    () =>
      ({
        ...filters,
        limit: Number(searchParams.get("limit")) || 10,
        page,
        search: search || undefined,
      }) as ListParams,
    [filters, page, search, searchParams]
  );

  // Debounced state -> URL synchronization.
  useEffect(() => {
    const timeout = setTimeout(() => {
      const next = new URLSearchParams(paramsString);

      next.set("limit", String(params.limit));
      next.set("page", String(params.page));

      if (params.search) {
        next.set("search", params.search);
      } else {
        next.delete("search");
      }

      // Remove old filters and write the current ones.
      for (const key of next.keys()) {
        if (!RESERVED_KEYS.has(key) && !(key in filters)) {
          next.delete(key);
        }
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (RESERVED_KEYS.has(key)) return;

        if (value == null || value === "") {
          next.delete(key);
        } else if (typeof value !== "object") {
          next.set(key, String(value));
        }
      });

      next.delete("filters");

      if (next.toString() !== paramsString) {
        lastWrittenUrl.current = next.toString();
        setSearchParams(next, { replace: true });
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [filters, params, paramsString, setSearchParams]);

  return {
    params,
    filters,
    searchInput,

    setSearch: (value: string) => {
      setSearchInput(value);
      setPage(1);
    },

    setPage,

    setFilter: (patch: Partial<ListParams>) => {
      const {
        page: _page,
        limit: _limit,
        search: _search,
        ...filterPatch
      } = patch;

      setFilters((prev) => ({ ...prev, ...filterPatch }));
      setPage(1);
    },
  };
}
