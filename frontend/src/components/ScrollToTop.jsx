import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ⏳ A tiny 10ms frame delay ensures the DOM has swapped paths completely
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 10);

    return () => clearTimeout(scrollTimeout); // Cleanup frame timeout safely
  }, [pathname]);

  return null;
}

export default ScrollToTop;
