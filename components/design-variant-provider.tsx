"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
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

function readStoredVariant(): DesignVariant {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isValidVariant(stored) ? stored : "studio";
  } catch {
    return "studio";
  }
}

function subscribe(onStoreChange: () => void) {
  const handler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onStoreChange();
  };
  window.addEventListener("storage", handler);
  window.addEventListener("design-variant-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("design-variant-change", onStoreChange);
  };
}

function getSnapshot(): DesignVariant {
  const variant = readStoredVariant();
  applyVariantToDocument(variant);
  return variant;
}

function getServerSnapshot(): DesignVariant {
  return "studio";
}

type DesignVariantContextValue = {
  variant: DesignVariant;
  setVariant: (variant: DesignVariant) => void;
  ready: boolean;
};

const DesignVariantContext =
  createContext<DesignVariantContextValue | null>(null);

export function DesignVariantProvider({ children }: { children: ReactNode }) {
  const variant = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setVariant = useCallback((next: DesignVariant) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / private mode */
    }
    applyVariantToDocument(next);
    window.dispatchEvent(new Event("design-variant-change"));
  }, []);

  const value = useMemo(
    () => ({
      variant,
      setVariant,
      // Client snapshot is always available after hydration via useSyncExternalStore.
      ready: true,
    }),
    [variant, setVariant],
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
