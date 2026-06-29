import {
  CONTINENT_PATHS,
  FLIGHT_ROUTE,
  MAP_H,
  MAP_W,
  buildTrailPoints,
  cubicPathD,
  pointOnCubic,
  sampleCubicLength,
  tangentOnCubic,
} from "./worldMap";

export const WorldMapRoute: React.FC<{
  progress: number;
  fromLabel: string;
  toLabel: string;
}> = ({ progress, fromLabel, toLabel }) => {
  const { from, to, c1, c2 } = FLIGHT_ROUTE;
  const pathD = cubicPathD(from, c1, c2, to);
  const pathLength = sampleCubicLength(from, c1, c2, to);
  const drawn = pathLength * progress;
  const marker = pointOnCubic(progress, from, c1, c2, to);
  const tangent = tangentOnCubic(progress, from, c1, c2, to);
  const angle = (Math.atan2(tangent.y, tangent.x) * 180) / Math.PI;
  const trail = buildTrailPoints(progress, from, c1, c2, to);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <radialGradient id="mapOcean" cx="45%" cy="40%" r="75%">
          <stop offset="0%" stopColor="#c5e8f7" />
          <stop offset="100%" stopColor="#7eb8d8" />
        </radialGradient>
        <filter id="mapWatercolor" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="4" />
        </filter>
        <filter id="routeGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e85d4c" />
          <stop offset="55%" stopColor="#4a90d9" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      <rect width={MAP_W} height={MAP_H} fill="url(#mapOcean)" />

      {/* Graticule */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={`lat-${i}`}
          x1={0}
          x2={MAP_W}
          y1={(i + 1) * (MAP_H / 8)}
          y2={(i + 1) * (MAP_H / 8)}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.8"
        />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={`lon-${i}`}
          x1={(i + 1) * (MAP_W / 12)}
          x2={(i + 1) * (MAP_W / 12)}
          y1={0}
          y2={MAP_H}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="0.8"
        />
      ))}

      {/* Continents */}
      <g filter="url(#mapWatercolor)">
        {CONTINENT_PATHS.map((c) => (
          <path
            key={c.id}
            d={c.d}
            fill={c.fill}
            stroke="rgba(30,58,95,0.18)"
            strokeWidth="1"
            opacity="0.92"
          />
        ))}
      </g>

      {/* Route shadow */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(30,58,95,0.2)"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Full route guide (faint) */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(74,144,217,0.22)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />

      {/* Animated route — dash length matches sampled path length */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#routeGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray={`${drawn} ${pathLength}`}
        filter="url(#routeGlow)"
      />

      {/* Trail dots along path */}
      {trail.map((pt, i) => (
        <circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={3 - i * 0.2}
          fill="#4a90d9"
          opacity={0.5 - i * 0.04}
        />
      ))}

      {/* Origin pin */}
      <circle cx={from.x} cy={from.y} r="12" fill="#e85d4c" opacity="0.2" />
      <circle cx={from.x} cy={from.y} r="6" fill="#e85d4c" stroke="#fff" strokeWidth="2" />

      {/* Destination pin */}
      <circle cx={to.x} cy={to.y} r="12" fill="#22c55e" opacity="0.2" />
      <circle cx={to.x} cy={to.y} r="6" fill="#22c55e" stroke="#fff" strokeWidth="2" />

      {/* Marker locked to curve tangent */}
      <g transform={`translate(${marker.x}, ${marker.y}) rotate(${angle})`}>
        <circle r="9" fill="#fff" stroke="#4a90d9" strokeWidth="2" />
        <path d="M0,-6 L4,4 L-4,4 Z" fill="#4a90d9" />
      </g>

      <text
        x={from.x - 18}
        y={from.y + 22}
        fontSize="12"
        fontWeight="700"
        fill="#1e3a5f"
        fontFamily="Inter, sans-serif"
      >
        {fromLabel}
      </text>
      <text
        x={to.x - 22}
        y={to.y + 22}
        fontSize="12"
        fontWeight="700"
        fill="#1e3a5f"
        fontFamily="Inter, sans-serif"
      >
        {toLabel}
      </text>
    </svg>
  );
};