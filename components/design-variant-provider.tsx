"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type DesignVariant = "studio" | "essay";

const STORAGE_KEY = "design-variant";

function isValidVariant(value: string | null): value is DesignVariant {
  return value === "studio" || value === "essay";
}

function applyVariantToDocument(variant: DesignVariant) {
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
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = isValidVariant(stored) ? stored : "studio";
    setVariantState(initial);
    applyVariantToDocument(initial);
    setReady(true);
  }, []);

  const setVariant = (next: DesignVariant) => {
    setVariantState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyVariantToDocument(next);
  };

  return (
    <DesignVariantContext.Provider value={{ variant, setVariant, ready }}>
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
