import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Earth, StatCard, Tag, clamp, useReveal } from "./parts";
import { OrbitField, Rings, fmt } from "./orbit";
import { C, EASE_OUT, FONT } from "./theme";

const CX = 560;
const CY = 540;

/**
 * Local frame 0 = absolute 153. VO cues (absolute s): 5.3 / 8.0 / 11.0
 * → local frames ≈ 6 / 87 / 177.
 */
export const Scene2Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 30], [200, 0], { ...clamp, easing: EASE_OUT });
  // Speed streak across the Earth for the "27.000 km/h" beat.
  const streak = interpolate(frame, [177, 215], [-600, 2400], clamp);
  const streakOpacity = interpolate(frame, [177, 190, 235, 255], [0, 1, 1, 0], clamp);
  const bullet = useReveal(210, 20);

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, translate: `${-slide}px 0` }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <Rings cx={CX} cy={CY} radii={[340, 420, 500]} />
          <OrbitField
            cx={CX}
            cy={CY}
            rMin={330}
            rMax={510}
            count={90}
            color={C.cyan}
            seed="scale-sat"
            appearFrom={0}
            appearSpan={10}
            speed={0.004}
            glow
          />
          <OrbitField
            cx={CX}
            cy={CY}
            rMin={330}
            rMax={510}
            count={260}
            color={C.magenta}
            seed="scale-d1"
            appearFrom={6}
            appearSpan={70}
            speed={0.005}
            rDot={3.8}
            oneWay={false}
          />
          <OrbitField
            cx={CX}
            cy={CY}
            rMin={320}
            rMax={520}
            count={520}
            color={C.gold}
            seed="scale-d2"
            appearFrom={87}
            appearSpan={80}
            speed={0.0055}
            rDot={2.6}
            oneWay={false}
          />
        </svg>
        <Earth cx={CX} cy={CY} r={250} spin={frame * 0.05} />
      </div>

      <Tag text="Vật thể trên quỹ đạo" x={900} y={88} color={C.cyan} />
      <StatCard
        from={6}
        x={1160}
        y={190}
        value={68450}
        format={fmt}
        caption="vật thể lớn hơn 10 cm"
        color={C.magenta}
        width={680}
      />
      <StatCard
        from={87}
        x={1160}
        y={440}
        value={1.5}
        format={(n) => `${(Math.round(n * 10) / 10).toString().replace(".", ",")} triệu`}
        caption="mảnh vỡ từ 1 – 10 cm"
        color={C.gold}
        width={680}
      />
      <StatCard
        from={177}
        x={1160}
        y={690}
        value={27000}
        format={(n) => `${fmt(n)} km/h`}
        caption="tốc độ quỹ đạo"
        color={C.cyan}
        width={680}
      />

      {/* speed streak */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: streak,
          width: 520,
          height: 10,
          borderRadius: 10,
          background: `linear-gradient(90deg, transparent, ${C.white})`,
          opacity: streakOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1160,
          top: 920,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 40,
          color: C.white,
          opacity: bullet,
          translate: `0 ${(1 - bullet) * 30}px`,
        }}
      >
        ≈ 10× nhanh hơn viên đạn
      </div>
    </AbsoluteFill>
  );
};
