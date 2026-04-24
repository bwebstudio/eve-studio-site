"use client";

import { LangProvider } from "@/lib/useLang";
import { AppReadyProvider } from "@/lib/useAppReady";
import TransitionProvider from "./TransitionProvider";

export default function Providers({ children }) {
  return (
    <AppReadyProvider>
      <LangProvider>
        <TransitionProvider>{children}</TransitionProvider>
      </LangProvider>
    </AppReadyProvider>
  );
}
