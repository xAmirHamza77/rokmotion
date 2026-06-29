import { OffthreadVideo, interpolate, useCurrentFrame } from "remotion";
import type { z } from "zod";
import type { pipPositionSchema, pipShapeSchema } from "../lib/video-modes";

type PipShape = z.infer<typeof pipShapeSchema>;
type PipPosition = z.infer<typeof pipPositionSchema>;

const POSITION_STYLES: Record<
  PipPosition,
  { bottom?: number; top?: number; left?: number; right?: number }
> = {
  "bottom-right": { bottom: 40, right: 40 },
  "bottom-left": { bottom: 40, left: 40 },
  "top-right": { top: 40, right: 40 },
  "top-left": { top: 40, left: 40 },
};

export const UserVideoPiP: React.FC<{
  src: string;
  shape: PipShape;
  position: PipPosition;
  size?: number;
  enterFrame?: number;
  startFrom?: number;
}> = ({ src, shape, position, size = 0.22, enterFrame = 0, startFrom = 0 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [enterFrame, enterFrame + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [enterFrame, enterFrame + 15], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const widthPercent = `${size * 100}%`;
  const pos = POSITION_STYLES[position];

  return (
    <div
      style={{
        position: "absolute",
        ...pos,
        width: widthPercent,
        aspectRatio: "16 / 9",
        opacity,
        scale,
        borderRadius: shape === "circle" ? "50%" : 16,
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        border: "3px solid rgba(255,255,255,0.9)",
        zIndex: 20,
      }}
    >
      <OffthreadVideo
        src={src}
        startFrom={startFrom}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        muted
      />
    </div>
  );
};