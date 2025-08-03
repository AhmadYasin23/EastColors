// hooks/useSlidesToShow.ts
import { useState, useEffect } from "react";

export default function useSlidesToShow() {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 480)       setSlidesToShow(2);
      else if (w < 768)  setSlidesToShow(4);
      else if (w < 1024) setSlidesToShow(4);
      else               setSlidesToShow(6);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return slidesToShow;
}
