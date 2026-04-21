"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import content from "./content";

const LangContext = createContext({ lang: "en", t: content.en, toggle: () => {}, setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("en");
  const toggle = useCallback(
    () => setLangState((l) => (l === "en" ? "es" : "en")),
    []
  );
  const setLang = useCallback((next) => setLangState(next), []);
  const t = useMemo(() => content[lang], [lang]);
  const value = useMemo(() => ({ lang, t, toggle, setLang }), [lang, t, toggle, setLang]);

  return (
    <LangContext.Provider value={value}>{children}</LangContext.Provider>
  );
}

export default function useLang() {
  return useContext(LangContext);
}
