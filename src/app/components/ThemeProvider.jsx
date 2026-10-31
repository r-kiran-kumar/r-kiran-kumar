// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : ThemeProvider.jsx
// Description : ThemeProvider UI component.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

'use client';

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'rkk-theme';

// The inline script in <head> already stamped `dark` on <html> before first
// paint, so that class — not React state — is the source of truth. Reading it
// through useSyncExternalStore makes the value correct in the very first client
// render. The previous version withheld the Provider until a mount effect ran,
// so consumers rendered once against the default context and then again with
// the real one — a visible flash on every page open.
const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());

function subscribe(onStoreChange) {
  listeners.add(onStoreChange);
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', onStoreChange);
  window.addEventListener('storage', onStoreChange); // preference changed in another tab
  return () => {
    listeners.delete(onStoreChange);
    observer.disconnect();
    media.removeEventListener('change', onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

const readPreference = () => localStorage.getItem(STORAGE_KEY) || 'system';
const readResolved = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
const serverPreference = () => 'system';
const serverResolved = () => 'light';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, readPreference, serverPreference);
  const resolvedTheme = useSyncExternalStore(subscribe, readResolved, serverResolved);

  const setTheme = useCallback((next) => {
    if (next === 'system') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);

    const resolved = next === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : next;
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    notify();
  }, []);

  // Cycles system → light → dark → system.
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system');
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
}
