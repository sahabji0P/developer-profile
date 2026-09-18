"use client";

import type { ReactNode } from "react";
import { EssayFly } from "@/components/essay-fly";
import { EssayRevealProvider } from "@/components/essay-reveal-context";
import { EssayStageCard } from "@/components/essay-stage";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { RightPanel } from "@/components/right-panel";
import { useDesignVariant } from "@/components/design-variant-provider";

export function SiteShell({ children }: { children: ReactNode }) {
  const { variant } = useDesignVariant();

  return (
    <EssayRevealProvider>
      <div className={`site-shell site-shell--${variant}`}>
        <Nav />
        <div className="site-column">
          {children}
          <Footer />
        </div>
        {variant === "essay" ? (
          <RightPanel>
            <EssayStageCard variant="desktop" />
          </RightPanel>
        ) : (
          <RightPanel />
        )}
        {variant === "essay" ? <EssayFly /> : null}
      </div>
    </EssayRevealProvider>
  );
}
