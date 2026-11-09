import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Sprite, Tag, clamp, useReveal } from "./parts";
import { C, EASE_OUT, FONT } from "./theme";

const BASE_Y = 1500;
const PX_PER_UNIT = 7.5; // 50 → 375px tall

const Bar: React.FC<{
  x: number;
  value: number;
  from: number;
  color: string;
  label: string;
}> = ({ x, value, from, color, label }) => {
  const frame = useCurrentFrame();
  const g = interpolate(frame, [from, from + 50], [0, 1], { ...clamp, easing: EASE_OUT });
  const h = value * PX_PER_UNIT * g;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x,
          top: BASE_Y - h,
          width: 200,
          height: h,
          borderRadius: "28px 28px 0 0",
          background: `linear-gradient(180deg, ${color}, ${color}88)`,
          boxShadow: `0 0 60px ${color}55`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x,
          top: BASE_Y - h - 110,
          width: 200,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 88,
          color,
          opacity: g,
        }}
      >
        {Math.max(1, Math.round(value * g))}
      </div>
      <div
        style={{
          position: "absolute",
          left: x - 30,
          top: BASE_Y + 22,
          width: 260,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 32,
          color: C.lilac,
        }}
      >
        {label}
      </div>
    </>
  );
};

/** Local frame 0 = absolute 1122 (37.4s). Cues: 18 → 10/day, 138 → index 4→50, 270 → ×50. */
export const Scene5Data: React.FC = () => {
  const frame = useCurrentFrame();
  const head = useReveal(14, 18);
  const headTwo = useReveal(134, 18);
  const sustainable = useReveal(150, 20);
  const multiplier = useReveal(268, 18);
  const op = useReveal(130, 24);
  const pulse = 1 + 0.04 * Math.sin(frame * 0.3);

  return (
    <AbsoluteFill>
      <Tag text="ESA · Space Environment Report 2026" x={72} y={80} size={30} />

      {/* TOP: 10 launches per day */}
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 150,
          fontFamily: FONT,
          color: C.white,
          opacity: head,
        }}
      >
        <div style={{ fontSize: 200, fontWeight: 800, color: C.gold, lineHeight: 1 }}>10</div>
        <div style={{ fontSize: 44, fontWeight: 600, color: C.lilac }}>
          new satellites launched every day
        </div>
      </div>
      {Array.from({ length: 10 }, (_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const at = 22 + i * 7;
        const pop = interpolate(frame, [at, at + 14], [0, 1], { ...clamp, easing: EASE_OUT });
        return (
          <Sprite
            key={i}
            name={i % 2 ? "starlink" : "satellite"}
            x={130 + col * 205}
            y={630 + row * 170}
            size={180}
            rotate={-18 + ((i * 11) % 36)}
            scale={pop}
            opacity={pop}
          />
        );
      })}

      {/* BOTTOM: health index */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 905,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 52,
          color: C.white,
          opacity: headTwo,
        }}
      >
        Orbital health index
      </div>

      <div
        style={{
          position: "absolute",
          left: 250,
          top: BASE_Y - PX_PER_UNIT,
          width: 600,
          height: 4,
          background: `repeating-linear-gradient(90deg, ${C.cyan} 0 18px, transparent 18px 32px)`,
          opacity: sustainable,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 850,
          top: BASE_Y - PX_PER_UNIT - 30,
          width: 220,
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 26,
          lineHeight: 1.15,
          color: C.cyan,
          opacity: sustainable,
        }}
      >
        sustainable
        <br />
        level = 1
      </div>

      <Bar x={300} value={4} from={140} color={C.cyan} label="Last year" />
      <Bar x={620} value={50} from={160} color={C.magenta} label="2026 report" />

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 1030,
          width: 500,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 140,
          color: C.white,
          opacity: multiplier,
          scale: pulse * multiplier,
          textShadow: `0 0 50px ${C.magenta}`,
        }}
      >
        ×50
      </div>

      {/* the people watching the numbers */}
      <div style={{ opacity: op, translate: `${(1 - op) * -80}px 0` }}>
        <Sprite name="operator" x={150} y={1345} size={330} />
      </div>
    </AbsoluteFill>
  );
};
