"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DesignVariant = "studio" | "essay";

const STORAGE_KEY = "design-variant";

function isValidVariant(value: string | null): value is DesignVariant {
  return value === "studio" || value === "essay";
}

function applyVariantToDocument(variant: DesignVariant) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.variant = variant;
}

type DesignVariantContextValue = {
  variant: DesignVariant;
  setVariant: (variant: DesignVariant) => void;
  ready: boolean;
};

const DesignVariantContext =
  createContext<DesignVariantContextValue | null>(null);

export function DesignVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<DesignVariant>("studio");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Defer so this is not a synchronous setState-in-effect cascade.
    const id = window.setTimeout(() => {
      if (cancelled) return;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const initial = isValidVariant(stored) ? stored : "studio";
        setVariantState(initial);
        applyVariantToDocument(initial);
      } catch {
        applyVariantToDocument("studio");
      }
      setReady(true);
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  const setVariant = useCallback((next: DesignVariant) => {
    setVariantState(next);
    applyVariantToDocument(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ variant, setVariant, ready }),
    [variant, setVariant, ready],
  );

  return (
    <DesignVariantContext.Provider value={value}>
      {children}
    </DesignVariantContext.Provider>
  );
}

export function useDesignVariant() {
  const context = useContext(DesignVariantContext);
  if (!context) {
    throw new Error(
      "useDesignVariant must be used within DesignVariantProvider",
    );
  }
  return context;
}
