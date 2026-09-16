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
            <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="right-panel-lines" fill="none" stroke="url(#rp-line)">
          <path
            d="M40 180 C220 80, 380 260, 560 140 S760 40, 820 120"
            strokeWidth="0.7"
          />
          <path
            d="M-20 420 C160 320, 340 520, 520 380 S740 280, 860 360"
            strokeWidth="0.55"
          />
          <path
            d="M60 680 C240 560, 400 780, 600 640 S820 520, 900 600"
            strokeWidth="0.6"
          />
          <line
            x1="220"
            y1="0"
            x2="460"
            y2="1200"
            strokeWidth="0.4"
            opacity="0.35"
          />
          <line
            x1="520"
            y1="0"
            x2="700"
            y2="1200"
            strokeWidth="0.35"
            opacity="0.28"
          />
        </g>
        <g className="right-panel-nodes" fill="var(--accent)">
          <circle cx="220" cy="210" r="1.6" opacity="0.45" />
          <circle cx="480" cy="360" r="1.3" opacity="0.32" />
          <circle cx="340" cy="620" r="1.8" opacity="0.4" />
          <circle cx="610" cy="780" r="1.2" opacity="0.28" />
        </g>
      </svg>
      <div className="right-panel-grain" />
    </aside>
  );
}
