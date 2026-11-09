import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Sprite, Strip, Tag, clamp, useReveal } from "./parts";
import { OrbitField, Rings, fmt } from "./orbit";
import { C, EASE_OUT, FONT, H, W } from "./theme";

// Orbits are huge arcs centred far below the frame (ground-level view of the sky).
const OCX = W / 2;
const OCY = H + 300;

/** 0s–5s: two people look up at a sky full of satellites; debris creeps in. */
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const tilt = interpolate(frame, [0, 165], [60, 0], { ...clamp, easing: EASE_OUT });
  const counter = useReveal(6, 80);
  const debrisIn = useReveal(100, 40);
  const people = useReveal(0, 24);
  const bob = Math.sin(frame * 0.05) * 4;

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, translate: `0 ${tilt}px` }}>
        <svg width={W} height={H} style={{ position: "absolute" }}>
          <Rings cx={OCX} cy={OCY} radii={[1000, 1180, 1360, 1540, 1720]} />
          <OrbitField
            cx={OCX}
            cy={OCY}
            rMin={980}
            rMax={1740}
            count={230}
            color={C.cyan}
            seed="hook-sat"
            appearFrom={8}
            appearSpan={85}
            speed={0.0016}
            rDot={6}
            glow
          />
          <g opacity={debrisIn}>
            <OrbitField
              cx={OCX}
              cy={OCY}
              rMin={960}
              rMax={1760}
              count={260}
              color={C.magenta}
              seed="hook-debris"
              appearFrom={100}
              appearSpan={50}
              speed={0.0022}
              rDot={4}
              oneWay={false}
            />
          </g>
        </svg>
        <Sprite name="satellite" x={820} y={560} size={190} rotate={25 + frame * 0.2} />
        <Sprite name="starlink" x={230} y={820} size={170} rotate={-30 - frame * 0.2} />
      </div>

      <Strip name="hill" aspect={1080 / 520} />
      <div style={{ opacity: people, translate: `0 ${(1 - people) * 60 + bob}px` }}>
        <Sprite name="stargazer" x={330} y={1380} size={620} />
        <Sprite name="kid" x={690} y={1500} size={440} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          color: C.white,
        }}
      >
        <div
          style={{
            fontSize: 200,
            fontWeight: 800,
            color: C.cyan,
            textShadow: `0 0 60px ${C.cyan}66`,
            lineHeight: 1,
            opacity: counter,
          }}
        >
          {fmt(15800 * counter)}
        </div>
        <div style={{ fontSize: 52, fontWeight: 600, color: C.lilac, marginTop: 10, opacity: counter }}>
          active satellites overhead
        </div>
      </div>
      <Tag text="Earth orbit" x={72} y={470} color={C.magenta} from={90} size={44} />
    </AbsoluteFill>
  );
};
