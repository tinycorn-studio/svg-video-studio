import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Earth, Sprite, Tag, clamp, useReveal } from "./parts";
import { OrbitField, Rings, fmt } from "./orbit";
import { C, EASE_OUT, FONT, H, W } from "./theme";

const CX = W / 2;
const CY = H / 2 + 20;

/** 0s–5s: calm Earth, thousands of satellites light up, then debris creeps in. */
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 165], [1.18, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  const counter = useReveal(6, 80);
  const debrisIn = useReveal(100, 40);
  const eyebrow = useReveal(0, 16);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          scale: zoom,
          transformOrigin: `${CX}px ${CY}px`,
        }}
      >
        <svg width={W} height={H} style={{ position: "absolute" }}>
          <Rings cx={CX} cy={CY} radii={[380, 450, 520]} />
          <OrbitField
            cx={CX}
            cy={CY}
            rMin={370}
            rMax={520}
            count={150}
            color={C.cyan}
            seed="hook-sat"
            appearFrom={8}
            appearSpan={85}
            speed={0.004}
            rDot={5}
            glow
          />
          <g opacity={debrisIn}>
            <OrbitField
              cx={CX}
              cy={CY}
              rMin={350}
              rMax={540}
              count={170}
              color={C.magenta}
              seed="hook-debris"
              appearFrom={100}
              appearSpan={50}
              speed={0.0055}
              rDot={3.6}
              oneWay={false}
            />
          </g>
        </svg>
        <Earth cx={CX} cy={CY} r={300} spin={frame * 0.05} />
        <Sprite name="satellite" x={CX + 330} y={CY - 300} size={120} rotate={25 + frame * 0.2} />
        <Sprite name="starlink" x={CX - 400} y={CY + 250} size={110} rotate={-30 - frame * 0.2} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          color: C.white,
          opacity: eyebrow,
        }}
      >
        <div
          style={{
            fontSize: 150,
            fontWeight: 800,
            color: C.cyan,
            textShadow: `0 0 60px ${C.cyan}66`,
            lineHeight: 1,
          }}
        >
          {fmt(15800 * counter)}
        </div>
        <div style={{ fontSize: 40, fontWeight: 600, color: C.lilac, marginTop: 8 }}>
          vệ tinh đang hoạt động
        </div>
      </div>
      <Tag text="Quỹ đạo Trái Đất" x={96} y={90} color={C.magenta} from={90} />
    </AbsoluteFill>
  );
};
