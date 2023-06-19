import { useEffect, useState } from "react";

const useScroll = (): number => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = (): void => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScroll;
