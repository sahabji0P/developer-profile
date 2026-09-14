import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { RightPanel } from "@/components/right-panel";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Nav />
      <div className="site-column">
        {children}
        <Footer />
      </div>
      <RightPanel />
    </div>
  );
}
