import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Earth, StatCard, Tag, clamp } from "./parts";
import { OrbitField, Rings, fmt } from "./orbit";
import { C, EASE_OUT, W } from "./theme";

const CX = W / 2;
const CY = 470;

/**
 * Local frame 0 = absolute 153. VO cues (absolute s): 5.3 / 8.0 / 11.0
 * → local frames ≈ 6 / 87 / 177.
 */
export const Scene2Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = interpolate(frame, [0, 30], [160, 0], { ...clamp, easing: EASE_OUT });
  const streak = interpolate(frame, [177, 215], [-700, 1300], clamp);
  const streakOpacity = interpolate(frame, [177, 190, 235, 255], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, translate: `0 ${-rise}px` }}>
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          <Rings cx={CX} cy={CY} radii={[330, 410, 490]} />
          <OrbitField
            cx={CX}
            cy={CY}
            rMin={320}
            rMax={500}
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
            rMin={320}
            rMax={500}
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
            rMin={310}
            rMax={510}
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
        <Earth cx={CX} cy={CY} r={240} spin={frame * 0.05} />
      </div>

      <Tag text="Objects in orbit" x={72} y={90} color={C.cyan} size={44} />
      <StatCard
        from={6}
        x={90}
        y={1000}
        value={68450}
        format={fmt}
        caption="objects larger than 10 cm"
        color={C.magenta}
        width={900}
      />
      <StatCard
        from={87}
        x={90}
        y={1205}
        value={1.5}
        format={(n) => `${(Math.round(n * 10) / 10).toFixed(1)} million`}
        caption="fragments, 1 – 10 cm"
        color={C.gold}
        width={900}
      />
      <StatCard
        from={177}
        x={90}
        y={1410}
        value={27000}
        format={(n) => `${fmt(n)} km/h`}
        caption="≈ 10× faster than a bullet"
        color={C.cyan}
        width={900}
      />

      {/* speed streak across the Earth */}
      <div
        style={{
          position: "absolute",
          top: CY + 30,
          left: streak,
          width: 560,
          height: 10,
          borderRadius: 10,
          background: `linear-gradient(90deg, transparent, ${C.white})`,
          opacity: streakOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
