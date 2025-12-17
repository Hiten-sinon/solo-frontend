import { useEffect, useRef, useState, type RefObject } from "react";

function useScrollAnimation<T extends HTMLElement>(
  threshold: number = 0.3
): [RefObject<T | null>, boolean] {
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    console.log(node,'node');
    if (!node) return;
console.log("hiiiii")
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry,'entry');
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [elementRef, isVisible];
}

export default useScrollAnimation;
