/**
 * Desktop-only abstract visual for the right half of the viewport.
 * Pure CSS/SVG — no animation libraries. Frozen under prefers-reduced-motion.
 */
export function RightPanel() {
  return (
    <aside className="right-panel" aria-hidden="true">
      <div className="right-panel-atmosphere" />
      <div className="right-panel-orb right-panel-orb-a" />
      <div className="right-panel-orb right-panel-orb-b" />
      <div className="right-panel-orb right-panel-orb-c" />
      <svg
        className="right-panel-mesh"
        viewBox="0 0 800 1200"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="rp-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="right-panel-lines" fill="none" stroke="url(#rp-line)">
          <path d="M40 180 C220 80, 380 260, 560 140 S760 40, 820 120" strokeWidth="1.1" />
          <path d="M-20 420 C160 320, 340 520, 520 380 S740 280, 860 360" strokeWidth="0.9" />
          <path d="M60 680 C240 560, 400 780, 600 640 S820 520, 900 600" strokeWidth="1" />
          <path d="M-40 920 C180 800, 360 1040, 560 880 S780 760, 880 840" strokeWidth="0.85" />
          <line x1="180" y1="0" x2="420" y2="1200" strokeWidth="0.6" opacity="0.45" />
          <line x1="420" y1="0" x2="660" y2="1200" strokeWidth="0.55" opacity="0.35" />
          <line x1="640" y1="0" x2="780" y2="1200" strokeWidth="0.5" opacity="0.28" />
        </g>
        <g className="right-panel-nodes" fill="var(--accent)">
          <circle cx="220" cy="210" r="2.2" opacity="0.55" />
          <circle cx="480" cy="360" r="1.8" opacity="0.4" />
          <circle cx="340" cy="620" r="2.4" opacity="0.5" />
          <circle cx="610" cy="780" r="1.6" opacity="0.35" />
          <circle cx="260" cy="940" r="2" opacity="0.45" />
        </g>
      </svg>
      <div className="right-panel-grain" />
    </aside>
  );
}
