import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Sprite, Tag, clamp, useReveal } from "./parts";
import { C, EASE_OUT, FONT } from "./theme";

const BASE_Y = 880;
const PX_PER_UNIT = 11; // 50 → 550px tall

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
  const pulse = 1 + 0.04 * Math.sin(frame * 0.3);

  return (
    <AbsoluteFill>
      <Tag text="ESA · Báo cáo môi trường không gian 2026" x={96} y={70} size={34} />

      {/* LEFT: 10 launches per day */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 190,
          fontFamily: FONT,
          color: C.white,
          opacity: head,
        }}
      >
        <div style={{ fontSize: 190, fontWeight: 800, color: C.gold, lineHeight: 1 }}>10</div>
        <div style={{ fontSize: 44, fontWeight: 600, color: C.lilac }}>
          vệ tinh mới được phóng mỗi ngày
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
            x={170 + col * 150}
            y={640 + row * 160}
            size={140}
            rotate={-18 + ((i * 11) % 36)}
            scale={pop}
            opacity={pop}
          />
        );
      })}

      {/* RIGHT: Health Index */}
      <div
        style={{
          position: "absolute",
          left: 1020,
          top: 70,
          width: 820,
          fontFamily: FONT,
          color: C.white,
          textAlign: "center",
          opacity: headTwo,
        }}
      >
        <div style={{ fontSize: 46, fontWeight: 800 }}>Chỉ số sức khỏe quỹ đạo</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 1000,
          top: BASE_Y - PX_PER_UNIT,
          width: 840,
          height: 4,
          background: `repeating-linear-gradient(90deg, ${C.cyan} 0 18px, transparent 18px 32px)`,
          opacity: sustainable,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1000,
          top: BASE_Y - PX_PER_UNIT - 52,
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 30,
          color: C.cyan,
          opacity: sustainable,
        }}
      >
        mức bền vững = 1
      </div>

      <Bar x={1090} value={4} from={140} color={C.cyan} label="Năm trước" />
      <Bar x={1450} value={50} from={160} color={C.magenta} label="Báo cáo 2026" />

      <div
        style={{
          position: "absolute",
          left: 1000,
          top: 330,
          width: 420,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 110,
          color: C.white,
          opacity: multiplier,
          scale: pulse * multiplier,
          textShadow: `0 0 50px ${C.magenta}`,
        }}
      >
        ×50
      </div>
    </AbsoluteFill>
  );
};
