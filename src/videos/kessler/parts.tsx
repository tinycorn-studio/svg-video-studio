import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, EASE_OUT, FONT, H, W, svg } from "./theme";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** 0 → 1 with a soft ease-out between two frames. */
export const useReveal = (from: number, dur = 18) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, from + dur], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
};

/** Deep-purple space with drifting parallax stars and soft nebula glows. */
export const Backdrop: React.FC<{ drift?: number; tint?: string }> = ({
  drift = 0.25,
  tint = C.magenta,
}) => {
  const frame = useCurrentFrame();
  const stars = React.useMemo(
    () =>
      Array.from({ length: 140 }, (_, i) => ({
        x: random(`sx${i}`) * W,
        y: random(`sy${i}`) * H,
        r: 1 + random(`sr${i}`) * 2.6,
        depth: 0.3 + random(`sd${i}`) * 1.2,
        phase: random(`sp${i}`) * Math.PI * 2,
        color: random(`sc${i}`) > 0.8 ? C.cyan : C.white,
      })),
    [],
  );
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 45%, ${C.bg2} 0%, ${C.bg} 70%)`,
      }}
    >
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="neb1">
            <stop offset="0%" stopColor={tint} stopOpacity={0.22} />
            <stop offset="100%" stopColor={tint} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="neb2">
            <stop offset="0%" stopColor={C.blue} stopOpacity={0.25} />
            <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
          </radialGradient>
        </defs>
        <circle cx={W * 0.82} cy={H * 0.18} r={520} fill="url(#neb1)" />
        <circle cx={W * 0.12} cy={H * 0.85} r={560} fill="url(#neb2)" />
        {stars.map((s, i) => {
          const x = (((s.x - frame * drift * s.depth) % W) + W) % W;
          const tw = 0.55 + 0.45 * Math.sin(frame * 0.07 + s.phase);
          return (
            <circle
              key={i}
              cx={x}
              cy={s.y}
              r={s.r}
              fill={s.color}
              opacity={tw * (0.35 + s.depth * 0.35)}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Positioned, rotatable SVG sprite (centered on x,y). */
export const Sprite: React.FC<{
  name: string;
  x: number;
  y: number;
  size: number;
  rotate?: number;
  scale?: number;
  opacity?: number;
}> = ({ name, x, y, size, rotate = 0, scale = 1, opacity = 1 }) => (
  <Img
    src={svg(name)}
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      rotate: `${rotate}deg`,
      scale,
      opacity,
    }}
  />
);

export const Earth: React.FC<{
  cx: number;
  cy: number;
  r: number;
  spin?: number;
}> = ({ cx, cy, r, spin = 0 }) => {
  const size = (r / 380) * 800;
  return (
    <Sprite name="earth" x={cx} y={cy} size={size} rotate={spin} />
  );
};

/** Big stat with count-up number and caption, Kurzgesagt flat card. */
export const StatCard: React.FC<{
  from: number;
  x: number;
  y: number;
  value: number;
  format: (n: number) => string;
  caption: string;
  color: string;
  width?: number;
}> = ({ from, x, y, value, format, caption, color, width = 640 }) => {
  const p = useReveal(from, 22);
  const count = useReveal(from + 4, 38);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        padding: "26px 36px",
        borderRadius: 36,
        background: "rgba(26,20,70,0.88)",
        boxShadow: `0 0 0 4px ${color}55`,
        fontFamily: FONT,
        color: C.white,
        opacity: p,
        translate: `${(1 - p) * 120}px 0`,
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 800, color, lineHeight: 1.05 }}>
        {format(Math.round(value * count))}
      </div>
      <div style={{ fontSize: 34, fontWeight: 600, color: C.lilac }}>
        {caption}
      </div>
    </div>
  );
};

/** Small eyebrow/title tag used on scenes. */
export const Tag: React.FC<{
  text: string;
  from?: number;
  color?: string;
  x?: number;
  y?: number;
  size?: number;
}> = ({ text, from = 0, color = C.cyan, x = 96, y = 80, size = 40 }) => {
  const p = useReveal(from, 16);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: 4,
        color,
        opacity: p,
        translate: `0 ${(1 - p) * -24}px`,
        textTransform: "uppercase",
      }}
    >
      {text}
    </div>
  );
};

/** Frame helper for scenes that need fps. */
export const useSec = () => {
  const { fps } = useVideoConfig();
  return (s: number) => Math.round(s * fps);
};
