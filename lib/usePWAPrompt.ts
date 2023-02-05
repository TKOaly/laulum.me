import { useEffect, useCallback, useState } from "react";

// https://github.com/shadowwalker/next-pwa/blob/master/examples/lifecycle/pages/index.js#L26-L38
export const usePWAPrompt = () => {
  const [promptVisible, setPrompt] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;

      const promptNewVersionAvailable = () => {
        setPrompt(true);
      };

      wb.addEventListener("waiting", promptNewVersionAvailable);
    }
  }, [setPrompt]);

  const updateWorker = useCallback(() => {
    const wb = window.workbox;

    wb.addEventListener("controlling", () => {
      window.location.reload();
    });

    wb.messageSkipWaiting();
  }, []);

  const rejectUpdate = useCallback(() => {
    setPrompt(false);
  }, [setPrompt]);

  return { promptVisible, rejectUpdate, updateWorker };
};
