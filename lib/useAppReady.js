"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Centralised "the app is ready to be seen" flag. The Preloader flips this to
 * true when it has finished its exit animation. Components that want their
 * on-mount reveals to fire AFTER the preloader (instead of uselessly playing
 * underneath it) gate their animations on this value.
 *
 * Defaults:
 *  - If sessionStorage has "eve_preload_shown" → preloader will skip → ready=true
 *  - Otherwise the preloader will run → ready stays false until it completes
 */
const Ctx = createContext({ ready: true, setReady: () => {} });

export function AppReadyProvider({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("eve_preload_shown")) {
        setReady(true);
      }
    } catch {
      // sessionStorage may be blocked → fall back to showing preloader once
    }
  }, []);

  return <Ctx.Provider value={{ ready, setReady }}>{children}</Ctx.Provider>;
}

export default function useAppReady() {
  return useContext(Ctx);
}
