import { useEffect, useRef, useCallback, type RefObject } from "react";

export function useInfiniteScroll(
  callback: () => void,
  hasMore: boolean,
  isLoading: boolean,
): { loaderRef: RefObject<HTMLDivElement | null> } {
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        callback();
      }
    },
    [callback, hasMore, isLoading]
  );
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, { threshold: 1 });
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleIntersect]);

  return { loaderRef };
}
