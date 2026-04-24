"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

const CURTAIN_MS = 700;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

const TransitionContext = createContext({
  navigate: () => {},
  phase: "idle",
});

/**
 * Editorial shutter transition for cross-page navigation.
 *
 * Flow:
 *   1. User clicks a TransitionLink → navigate(href).
 *   2. Phase goes "idle" → "cover" → two halves slide to cover the viewport.
 *   3. After CURTAIN_MS, router.push(href) fires. The target pathname is
 *      stored in a ref — we do NOT immediately uncover.
 *   4. A pathname-watching effect waits for Next.js to actually render the
 *      new page. Once pathname matches the target, we give React a tick to
 *      paint, THEN flip to "uncover". Prevents the brief flash of the old
 *      page that happens when uncovering before the route has rendered.
 */
export default function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState("idle");
  const pendingPath = useRef(null);
  const scrollLockRef = useRef(null);

  const navigate = useCallback(
    (href) => {
      setPhase((current) => {
        if (current !== "idle") return current;
        scrollLockRef.current = href;
        setTimeout(() => {
          // Parse pathname from href (strip hash/search) for matching
          try {
            const url = new URL(href, window.location.origin);
            pendingPath.current = url.pathname;
          } catch {
            pendingPath.current = href;
          }
          router.push(href);
          window.scrollTo(0, 0);
          // Don't uncover here. The pathname-watcher will do it once the
          // new route is actually rendered.
        }, CURTAIN_MS);
        return "cover";
      });
    },
    [router]
  );

  // When pathname changes and matches the pending target, uncover.
  useEffect(() => {
    if (pendingPath.current && pathname === pendingPath.current) {
      pendingPath.current = null;
      // Give React one paint to mount the new route content, then uncover.
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setPhase("uncover");
          setTimeout(() => setPhase("idle"), CURTAIN_MS);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [pathname]);

  // Safety net: if router.push somehow doesn't fire a pathname change
  // within a generous timeout, force uncover so the user isn't stuck
  // behind a black curtain.
  useEffect(() => {
    if (phase !== "cover") return;
    const safety = setTimeout(() => {
      if (phase === "cover") {
        pendingPath.current = null;
        setPhase("uncover");
        setTimeout(() => setPhase("idle"), CURTAIN_MS);
      }
    }, CURTAIN_MS + 2000);
    return () => clearTimeout(safety);
  }, [phase]);

  const value = useMemo(() => ({ navigate, phase }), [navigate, phase]);

  const topY = phase === "cover" ? "0%" : "-100%";
  const bottomY = phase === "cover" ? "0%" : "100%";

  return (
    <TransitionContext.Provider value={value}>
      {children}

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "51%",
          zIndex: 60,
          backgroundColor: "#0B0B0B",
          pointerEvents: phase === "cover" ? "auto" : "none",
          transform: `translateY(${topY})`,
          transition: `transform ${CURTAIN_MS}ms ${EASE}`,
          willChange: "transform",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "51%",
          zIndex: 60,
          backgroundColor: "#0B0B0B",
          pointerEvents: phase === "cover" ? "auto" : "none",
          transform: `translateY(${bottomY})`,
          transition: `transform ${CURTAIN_MS}ms ${EASE}`,
          willChange: "transform",
        }}
      />
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}
