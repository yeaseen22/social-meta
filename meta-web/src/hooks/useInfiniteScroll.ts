import { useEffect, useRef, useCallback, type RefObject } from "react";

export function useInfiniteScroll(
  callback: () => void,
  hasMore: boolean
): { loaderRef: RefObject<HTMLDivElement | null> } {
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        callback();
      }
    },
    [callback, hasMore]
  );

  useEffect(() => {
    const currentLoader = loaderRef.current;
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 1,
    });

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [handleIntersect]);

  return { loaderRef };
}
