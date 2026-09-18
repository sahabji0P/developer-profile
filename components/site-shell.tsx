"use client";

import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { RightPanel } from "@/components/right-panel";
import { useDesignVariant } from "@/components/design-variant-provider";

export function SiteShell({ children }: { children: ReactNode }) {
  const { variant } = useDesignVariant();

  return (
    <div className={`site-shell site-shell--${variant}`}>
      <Nav />
      <div className="site-column">
        {children}
        <Footer />
      </div>
      {variant === "studio" ? <RightPanel /> : null}
    </div>
  );
}
