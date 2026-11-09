import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { clamp } from "./parts";

export const fmt = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

type FieldProps = {
  cx: number;
  cy: number;
  rMin: number;
  rMax: number;
  count: number;
  color: string;
  seed: string;
  /** frame at which the first dot appears */
  appearFrom?: number;
  /** frames over which all dots appear */
  appearSpan?: number;
  /** angular speed in rad/frame (sign = direction), scaled by orbit radius */
  speed?: number;
  rDot?: number;
  glow?: boolean;
  /** clockwise-only dots when true; random directions otherwise */
  oneWay?: boolean;
};

/** Dots orbiting a center on random rings; deterministic per frame. */
export const OrbitField: React.FC<FieldProps> = ({
  cx,
  cy,
  rMin,
  rMax,
  count,
  color,
  seed,
  appearFrom = 0,
  appearSpan = 60,
  speed = 0.006,
  rDot = 5,
  glow = false,
  oneWay = true,
}) => {
  const frame = useCurrentFrame();
  const dots = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        a: random(`${seed}a${i}`) * Math.PI * 2,
        r: rMin + random(`${seed}r${i}`) * (rMax - rMin),
        dir: oneWay ? 1 : random(`${seed}d${i}`) > 0.5 ? 1 : -1,
        t: random(`${seed}t${i}`),
        s: 0.6 + random(`${seed}s${i}`) * 0.8,
      })),
    [count, rMin, rMax, seed, oneWay],
  );
  return (
    <g>
      {dots.map((d, i) => {
        const vis = interpolate(
          frame,
          [appearFrom + d.t * appearSpan, appearFrom + d.t * appearSpan + 10],
          [0, 1],
          clamp,
        );
        if (vis <= 0) return null;
        const ang = d.a + frame * speed * d.dir * (rMax / d.r);
        const x = cx + Math.cos(ang) * d.r;
        const y = cy + Math.sin(ang) * d.r;
        const rr = rDot * d.s * vis;
        return (
          <g key={i}>
            {glow ? (
              <circle cx={x} cy={y} r={rr * 3.2} fill={color} opacity={0.18 * vis} />
            ) : null}
            <circle cx={x} cy={y} r={rr} fill={color} />
          </g>
        );
      })}
    </g>
  );
};

/** Faint orbit ring guides. */
export const Rings: React.FC<{
  cx: number;
  cy: number;
  radii: number[];
  color?: string;
  opacity?: number;
}> = ({ cx, cy, radii, color = "#4cc9f0", opacity = 0.14 }) => (
  <g>
    {radii.map((r) => (
      <circle
        key={r}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={3}
        opacity={opacity}
      />
    ))}
  </g>
);
