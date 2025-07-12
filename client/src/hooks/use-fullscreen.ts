// src/hooks/use-fullscreen.ts
import { useEffect } from "react";

export const useFullscreen = () => {
  useEffect(() => {
    const requestFullscreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
      else if ((el as any).msRequestFullscreen) (el as any).msRequestFullscreen();
    };

    if (window.matchMedia('(display-mode: fullscreen)').matches) {
      requestFullscreen();
    }
  }, []);
};

