import { useRef, useState, useCallback, ChangeEvent } from "react";

export default function useInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");

  const updateQuery = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setQuery(target.value);
    },
    [setQuery]
  );

  const clearQuery = useCallback(() => setQuery(""), [setQuery]);

  const scrollTo = useCallback(() => {
    if (!inputRef?.current) {
      return;
    }
    inputRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return {
    ref: inputRef,
    query,
    setQuery,
    updateQuery,
    clearQuery,
    scrollTo,
  };
}
