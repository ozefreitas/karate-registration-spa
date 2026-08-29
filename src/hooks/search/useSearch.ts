import { useState, useEffect, useRef, useCallback } from "react";
import { CancelablePromise, SearchService, SearchResult } from "../../openapi";

interface UseSearchOptions {
  query?: string;
  setQuery?: (value: string) => void;
  debounceMs?: number;
  minChars?: number;
}

export function useSearch({
  query = "",
  setQuery = () => {},
  debounceMs = 500,
  minChars = 2,
}: UseSearchOptions = {}) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRequest = useRef<CancelablePromise<any> | null>(null);
  const requestId = useRef(0);

  const runSearch = useCallback((q: string) => {
    // Cancel any in-flight request so a slow earlier response can't
    // overwrite results from a more recent keystroke.
    pendingRequest.current?.cancel();

    const thisRequestId = ++requestId.current;
    setLoading(true);
    setError(null);

    const request = SearchService.globalSearch(q);
    pendingRequest.current = request;

    request
      .then((response) => {
        if (thisRequestId === requestId.current) {
          setResults(response.results ?? []);
        }
      })
      .catch((err: any) => {
        // .cancel() rejects the promise too — CancelError, ignore it.
        if (
          err?.name !== "CancelError" &&
          thisRequestId === requestId.current
        ) {
          setError("Procura falhou. Por favor, tente novamente.");
          setResults([]);
        }
      })
      .finally(() => {
        if (thisRequestId === requestId.current) {
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    const trimmed = query.trim();
    if (trimmed.length < minChars) {
      setResults([]);
      setLoading(false);
      return;
    }

    debounceTimer.current = setTimeout(() => runSearch(trimmed), debounceMs);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query, debounceMs, minChars, runSearch]);

  useEffect(() => {
    return () => pendingRequest.current?.cancel();
  }, []);

  return { query, setQuery, results, loading, error };
}
