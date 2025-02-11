import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return; // Skip observing if there's no more data.

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 0.5 } // Lower threshold for better UX
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
      console.log("Observing loaderRef");
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [callback, hasMore]);

  return { loaderRef };
}
