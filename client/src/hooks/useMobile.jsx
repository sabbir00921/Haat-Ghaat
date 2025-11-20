import { useEffect, useState } from "react";

const useMobile = (breakpoint = 768) => {
  const [ismobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  const handleResize = () => {
    const checkPointValue = window.innerWidth < breakpoint;
    setIsMobile(checkPointValue);
    useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  };
  return [ismobile];
};

export default useMobile
