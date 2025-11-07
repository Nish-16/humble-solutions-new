"use client";

import { useState, useEffect } from "react";

// --- Custom Hook to Load External Scripts ---
export const useScripts = (urls: string[]): boolean => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadScripts = async () => {
      const promises = urls.map((url) => {
        return new Promise((resolve, reject) => {
          if (document.querySelector(`script[src="${url}"]`))
            return resolve(true);
          const script = document.createElement("script");
          script.src = url;
          script.onload = () => resolve(true);
          script.onerror = () =>
            reject(new Error(`Script load error for ${url}`));
          document.body.appendChild(script);
        });
      });
      try {
        await Promise.all(promises);
        setLoaded(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load scripts:", error);
      }
    };
    loadScripts();
  }, [urls]);

  return loaded;
};
