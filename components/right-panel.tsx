/**
 * Inspired by abstract tech/AI panel language (stipple orbs, soft volumes), original artwork.
 * Desktop-only abstract visual — pure CSS/SVG, no external images.
 */
import type { ReactNode } from "react"
import styles from "./right-panel.module.css"

type Dot = { x: number; y: number; r: number; opacity: number }

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateStipple(
  cx: number,
  cy: number,
  radius: number,
  count: number,
  seed: number,
): Dot[] {
  const rand = mulberry32(seed)
  const dots: Dot[] = []

  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2
    const dist = Math.sqrt(rand()) * radius
    const x = cx + Math.cos(angle) * dist
    const y = cy + Math.sin(angle) * dist
    const norm = dist / radius
    const density = 1 - norm * norm * 0.82

    if (rand() > density * 0.9 + 0.1) continue

    dots.push({
      x: Math.round(x * 1000) / 1000,
      y: Math.round(y * 1000) / 1000,
      r: Math.round((0.3 + rand() * 0.85 * (1 - norm * 0.45)) * 1000) / 1000,
      opacity:
        Math.round(
          Math.min(0.12 + (1 - norm) * 0.58 + rand() * 0.22, 0.82) * 1000,
        ) / 1000,
    })
  }

  return dots
}

const PRIMARY_ORB = generateStipple(500, 400, 290, 420, 0x7a3e21)
const SECONDARY_ORB = generateStipple(210, 760, 130, 140, 0x9c4f18)
const TERTIARY_ORB = generateStipple(640, 880, 95, 90, 0xb2610c)
const SCENE2_ORB = generateStipple(420, 520, 220, 280, 0x5e2d41)
const SCENE3_ORB = generateStipple(280, 340, 110, 120, 0x3f1a55)

const NEURAL_NODES = [
  { x: 180, y: 280 },
  { x: 340, y: 200 },
  { x: 520, y: 260 },
  { x: 680, y: 340 },
  { x: 240, y: 480 },
  { x: 420, y: 420 },
  { x: 600, y: 500 },
  { x: 360, y: 640 },
  { x: 540, y: 720 },
  { x: 200, y: 820 },
  { x: 460, y: 900 },
  { x: 700, y: 860 },
]

const NEURAL_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [1, 5],
  [2, 5],
  [2, 6],
  [4, 5],
  [5, 6],
  [4, 7],
  [5, 7],
  [6, 8],
  [7, 8],
  [7, 9],
  [8, 10],
  [8, 11],
  [9, 10],
  [10, 11],
]

function SceneSvg({
  children,
  idPrefix,
}: {
  children: ReactNode
  idPrefix: string
}) {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 800 1200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${idPrefix}-orb-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
          <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.03" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`${idPrefix}-line-fade`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="45%" stopColor="#67e8f9" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  )
}

function ScenePrimary() {
  return (
    <SceneSvg idPrefix="rp-a">
      <ellipse
        cx="500"
        cy="400"
        rx="310"
        ry="300"
        fill="url(#rp-a-orb-glow)"
      />
      <g className={styles.stippleOrb} fill="currentColor">
        {PRIMARY_ORB.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} opacity={dot.opacity} />
        ))}
      </g>
      <g className={styles.stippleOrbSmall} fill="currentColor">
        {SECONDARY_ORB.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} opacity={dot.opacity} />
        ))}
      </g>
      <g className={styles.diagramEnergy} fill="none" stroke="url(#rp-a-line-fade)">
        <path
          d="M120 180 C280 80, 420 220, 580 140 S760 60, 820 160"
          strokeWidth="0.7"
          opacity="0.55"
        />
        <path
          d="M60 520 C220 420, 380 580, 560 460 S740 360, 860 440"
          strokeWidth="0.55"
          opacity="0.4"
        />
      </g>
      <g fill="var(--accent)" opacity="0.35">
        {TERTIARY_ORB.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} opacity={dot.opacity} />
        ))}
      </g>
    </SceneSvg>
  )
}

function SceneNeural() {
  return (
    <SceneSvg idPrefix="rp-b">
      <ellipse
        cx="420"
        cy="520"
        rx="250"
        ry="240"
        fill="url(#rp-b-orb-glow)"
      />
      <g className={styles.stippleOrb} fill="currentColor">
        {SCENE2_ORB.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} opacity={dot.opacity} />
        ))}
      </g>
      <g className={styles.constellation}>
        <g fill="none" stroke="url(#rp-b-line-fade)" strokeWidth="0.65">
          {NEURAL_EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NEURAL_NODES[a].x}
              y1={NEURAL_NODES[a].y}
              x2={NEURAL_NODES[b].x}
              y2={NEURAL_NODES[b].y}
              opacity="0.42"
            />
          ))}
        </g>
        <g fill="var(--accent)">
          {NEURAL_NODES.map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={i % 3 === 0 ? 2.2 : 1.4}
              opacity={0.35 + (i % 4) * 0.12}
            />
          ))}
        </g>
      </g>
      <g className={styles.stippleOrbSmall} fill="currentColor" opacity="0.7">
        {SCENE3_ORB.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} opacity={dot.opacity} />
        ))}
      </g>
    </SceneSvg>
  )
}

function SceneWireCube() {
  const cx = 520
  const cy = 620
  const s = 140
  const iso = Math.sqrt(3) / 2

  const top = `${cx},${cy - s}`
  const right = `${cx + s * iso},${cy - s * 0.5}`
  const left = `${cx - s * iso},${cy - s * 0.5}`
  const bottom = `${cx},${cy}`
  const backRight = `${cx + s * iso},${cy + s * 0.5}`
  const backLeft = `${cx - s * iso},${cy + s * 0.5}`
  const deep = `${cx},${cy + s}`

  return (
    <SceneSvg idPrefix="rp-c">
      <ellipse
        cx="520"
        cy="620"
        rx="220"
        ry="210"
        fill="url(#rp-c-orb-glow)"
        opacity="0.85"
      />
      <g className={styles.wireCube} fill="none" stroke="var(--accent)" strokeWidth="0.75">
        <polygon points={`${top} ${right} ${bottom} ${left}`} opacity="0.38" />
        <polygon points={`${bottom} ${right} ${backRight} ${deep}`} opacity="0.28" />
        <polygon points={`${bottom} ${left} ${backLeft} ${deep}`} opacity="0.22" />
        <line x1={cx} y1={cy - s} x2={cx} y2={cy + s} opacity="0.18" />
        <line x1={cx - s * iso} y1={cy - s * 0.5} x2={cx - s * iso} y2={cy + s * 0.5} opacity="0.15" />
        <line x1={cx + s * iso} y1={cy - s * 0.5} x2={cx + s * iso} y2={cy + s * 0.5} opacity="0.15" />
      </g>
      <g className={styles.stippleOrbSmall} fill="currentColor">
        {PRIMARY_ORB.slice(0, 180).map((dot, i) => (
          <circle
            key={i}
            cx={dot.x * 0.85 + 80}
            cy={dot.y * 0.9 + 60}
            r={dot.r}
            opacity={dot.opacity * 0.75}
          />
        ))}
      </g>
      <g className={styles.diagramEnergy} fill="none" stroke="#67e8f9" strokeWidth="0.5">
        <path
          d="M100 960 C260 880, 400 1020, 580 940 S760 860, 840 920"
          opacity="0.3"
        />
        <path
          d="M140 200 C300 120, 460 280, 620 180"
          opacity="0.22"
        />
      </g>
      <g fill="currentColor" opacity="0.55">
        {SECONDARY_ORB.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} opacity={dot.opacity * 0.8} />
        ))}
      </g>
    </SceneSvg>
  )
}

export function RightPanel() {
  return (
    <aside className="right-panel" aria-hidden="true">
      <div className={styles.root}>
        <div className={styles.atmosphere} />
        <div className={styles.volumePrimary} />
        <div className={styles.volumeSecondary} />
        <div className={styles.scenes}>
          <div className={`${styles.scene} ${styles.scene0}`}>
            <ScenePrimary />
          </div>
          <div className={`${styles.scene} ${styles.scene1}`}>
            <SceneNeural />
          </div>
          <div className={`${styles.scene} ${styles.scene2}`}>
            <SceneWireCube />
          </div>
        </div>
        <div className={styles.vignette} />
        <div className={styles.grain} />
      </div>
    </aside>
  )
}
