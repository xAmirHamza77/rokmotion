export const MAP_W = 640;
export const MAP_H = 360;

/** Equirectangular projection for the showcase map. */
export const geoToMap = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * MAP_W,
  y: ((90 - lat) / 180) * MAP_H,
});

export const PARIS = geoToMap(48.8566, 2.3522);
export const TOKYO = geoToMap(35.6762, 139.6503);

/** Simplified world continent silhouettes (640×360 equirectangular). */
export const CONTINENT_PATHS: { id: string; d: string; fill: string }[] = [
  {
    id: "north-america",
    fill: "#7ec8a0",
    d: "M48,92 72,68 108,52 148,44 188,42 222,48 242,62 252,82 248,104 232,128 208,148 182,162 154,172 126,176 100,168 78,148 62,124 52,104Z M138,176 152,192 168,208 182,222 168,236 144,228 124,208 118,188Z",
  },
  {
    id: "greenland",
    fill: "#a8e6b8",
    d: "M232,38 258,30 278,38 272,54 248,58 232,50Z",
  },
  {
    id: "south-america",
    fill: "#8fd4a8",
    d: "M178,182 202,172 222,180 234,202 238,234 228,266 208,292 184,306 166,298 156,272 160,240 166,210Z",
  },
  {
    id: "europe",
    fill: "#9edfb0",
    d: "M278,68 302,58 328,62 348,76 354,94 344,110 318,118 292,114 276,98 272,80Z",
  },
  {
    id: "uk",
    fill: "#8fd4a8",
    d: "M268,84 276,76 284,82 280,92 272,94Z",
  },
  {
    id: "africa",
    fill: "#84c99a",
    d: "M296,116 324,108 352,116 370,138 376,172 370,210 354,244 332,264 308,258 294,232 288,198 290,164 292,134Z",
  },
  {
    id: "asia",
    fill: "#7ec8a0",
    d: "M348,52 396,42 452,46 506,54 548,68 574,86 584,106 576,126 552,140 514,146 468,140 424,124 384,106 358,88 346,68Z M418,146 452,154 486,166 508,184 494,204 462,212 430,204 408,186 402,166Z",
  },
  {
    id: "india",
    fill: "#8fd4a8",
    d: "M398,148 418,142 432,158 426,182 408,190 392,178 388,158Z",
  },
  {
    id: "japan",
    fill: "#9edfb0",
    d: "M552,102 562,94 572,102 568,116 556,120 548,112Z",
  },
  {
    id: "australia",
    fill: "#9edfb0",
    d: "M492,214 528,208 556,218 566,236 552,252 522,258 496,248 486,230Z",
  },
  {
    id: "antarctica",
    fill: "#b8e6c8",
    d: "M48,318 128,308 248,302 392,298 528,304 608,314 608,336 48,336Z",
  },
];

export type MapPoint = { x: number; y: number };

export const pointOnCubic = (
  t: number,
  p0: MapPoint,
  p1: MapPoint,
  p2: MapPoint,
  p3: MapPoint,
): MapPoint => {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
};

export const tangentOnCubic = (
  t: number,
  p0: MapPoint,
  p1: MapPoint,
  p2: MapPoint,
  p3: MapPoint,
): MapPoint => {
  const u = 1 - t;
  return {
    x:
      3 * u * u * (p1.x - p0.x) +
      6 * u * t * (p2.x - p1.x) +
      3 * t * t * (p3.x - p2.x),
    y:
      3 * u * u * (p1.y - p0.y) +
      6 * u * t * (p2.y - p1.y) +
      3 * t * t * (p3.y - p2.y),
  };
};

/** Flight arc Paris → Tokyo (great-circle style, bulges north). */
export const FLIGHT_ROUTE = {
  from: PARIS,
  to: TOKYO,
  c1: geoToMap(66, 22),
  c2: geoToMap(62, 125),
};

export const cubicPathD = (
  p0: MapPoint,
  p1: MapPoint,
  p2: MapPoint,
  p3: MapPoint,
) =>
  `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} C ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} ${p3.x.toFixed(1)} ${p3.y.toFixed(1)}`;

export const sampleCubicLength = (
  p0: MapPoint,
  p1: MapPoint,
  p2: MapPoint,
  p3: MapPoint,
  steps = 100,
) => {
  let length = 0;
  let prev = p0;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const pt = pointOnCubic(t, p0, p1, p2, p3);
    length += Math.hypot(pt.x - prev.x, pt.y - prev.y);
    prev = pt;
  }
  return length;
};

export const buildTrailPoints = (
  progress: number,
  p0: MapPoint,
  p1: MapPoint,
  p2: MapPoint,
  p3: MapPoint,
  count = 10,
) =>
  Array.from({ length: count }).map((_, i) => {
    const t = Math.max(0, progress - (i + 1) * 0.035);
    return pointOnCubic(t, p0, p1, p2, p3);
  });