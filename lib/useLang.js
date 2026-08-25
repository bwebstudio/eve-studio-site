"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import content, {
  LOCALES,
  LOCALE_LABELS,
  LOCALE_HTML_LANG,
} from "./content";

const DEFAULT_LANG = "en";

const LangContext = createContext({
  lang: DEFAULT_LANG,
  t: content[DEFAULT_LANG],
  toggle: () => {},
  setLang: () => {},
  locales: LOCALES,
  localeLabels: LOCALE_LABELS,
});

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  // Cycles through every available locale (en → es → it → en). Kept as
  // `toggle` so existing call sites don't change; with three locales the
  // header renders an explicit selector instead (see <Navigation>).
  const toggle = useCallback(
    () =>
      setLangState((current) => {
        const i = LOCALES.indexOf(current);
        return LOCALES[(i + 1) % LOCALES.length];
      }),
    []
  );

  const setLang = useCallback((next) => {
    setLangState(LOCALES.includes(next) ? next : DEFAULT_LANG);
  }, []);

  // Language is switched client-side (there is no /[locale] routing), so
  // the static <html lang> would otherwise lie to screen readers and
  // translation tooling. Keep it in sync with the active locale.
  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML_LANG[lang] || lang;
  }, [lang]);

  const t = useMemo(() => content[lang] || content[DEFAULT_LANG], [lang]);
  const value = useMemo(
    () => ({
      lang,
      t,
      toggle,
      setLang,
      locales: LOCALES,
      localeLabels: LOCALE_LABELS,
    }),
    [lang, t, toggle, setLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export default function useLang() {
  return useContext(LangContext);
}
