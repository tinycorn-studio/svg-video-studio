import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Earth, Sprite, clamp, useReveal } from "./parts";
import { OrbitField, Rings } from "./orbit";
import { C, EASE_OUT, FONT, H, W } from "./theme";

const ECX = W / 2;
const ECY = 1500;
const ER = 820;

const Panel: React.FC<{
  x: number;
  from: number;
  out: number;
  title: string;
  color: string;
  children: React.ReactNode;
}> = ({ x, from, out, title, color, children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [from, from + 22], [0, 1], { ...clamp, easing: EASE_OUT });
  const o = interpolate(frame, [out, out + 18], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 150,
        width: 840,
        height: 600,
        opacity: p * o,
        translate: `0 ${(1 - p) * 80}px`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 44,
          overflow: "hidden",
          background: `linear-gradient(160deg, ${C.bg2}, ${C.bg})`,
          boxShadow: `0 0 0 5px ${color}66`,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 620,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 46,
          color,
        }}
      >
        {title}
      </div>
    </div>
  );
};

/** Controlled re-entry: satellite falls toward the atmosphere and burns up. */
const Reentry: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + 100], [0, 1], { ...clamp, easing: (x) => x * x });
  const x = interpolate(t, [0, 1], [110, 430]);
  const y = interpolate(t, [0, 1], [90, 430]);
  const burn = interpolate(t, [0.55, 0.95], [0, 1], clamp);
  const vanish = interpolate(t, [0.9, 1], [1, 0], clamp);
  return (
    <>
      <Earth cx={420} cy={1010} r={560} />
      <svg width={840} height={600} style={{ position: "absolute" }}>
      {Array.from({ length: 9 }, (_, i) => {
        const tt = Math.max(0, t - i * 0.03);
        return (
          <circle
            key={i}
            cx={interpolate(tt, [0, 1], [110, 430]) - 20 * i * burn}
            cy={interpolate(tt, [0, 1], [90, 430]) - 26 * i * burn}
            r={(34 - i * 3) * burn}
            fill={i % 2 ? C.orange : C.gold}
            opacity={0.7 * burn}
          />
        );
      })}
      </svg>
      <Sprite name="satellite" x={x} y={y} size={150} rotate={35 + t * 120} opacity={vanish} scale={1 - 0.4 * t} />
    </>
  );
};

/** Active debris removal: a chaser grabs a dead fragment and drags it down. */
const Collect: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const approach = interpolate(frame, [start, start + 55], [0, 1], { ...clamp, easing: EASE_OUT });
  const pull = interpolate(frame, [start + 55, start + 115], [0, 1], clamp);
  const cx = interpolate(approach, [0, 1], [120, 360]) + pull * 130;
  const cy = 280 + pull * 190;
  const debrisX = pull > 0 ? cx + 190 : 560 + Math.sin(frame * 0.05) * 8;
  const debrisY = pull > 0 ? cy : 280 + Math.cos(frame * 0.05) * 8;
  const vanish = interpolate(pull, [0.75, 1], [1, 0], clamp);
  return (
    <>
      <Earth cx={420} cy={1010} r={560} />
      <Sprite name="debris-2" x={debrisX} y={debrisY} size={110} rotate={frame * 2} opacity={vanish} />
      <Sprite name="collector" x={cx} y={cy} size={320} opacity={1} rotate={pull * 25} />
    </>
  );
};

/** Local frame 0 = absolute 1455 (48.5s). Cues: 33 solutions, 147 ESA 2030, 255 closing line. */
export const Scene6Future: React.FC = () => {
  const frame = useCurrentFrame();
  const clean = interpolate(frame, [150, 250], [1, 0], clamp);
  const badge = useReveal(150, 24);
  const badgeOut = interpolate(frame, [245, 262], [1, 0], clamp);
  const line1 = useReveal(258, 20);
  const line2 = useReveal(290, 20);
  const swell = interpolate(frame, [250, 345], [1.05, 1], { ...clamp, easing: EASE_OUT });

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, scale: swell, transformOrigin: "50% 100%" }}>
        <svg width={W} height={H} style={{ position: "absolute" }}>
          <Rings cx={ECX} cy={ECY} radii={[ER + 90, ER + 170]} />
          <OrbitField
            cx={ECX}
            cy={ECY}
            rMin={ER + 80}
            rMax={ER + 180}
            count={28}
            color={C.cyan}
            seed="future-sat"
            speed={0.0022}
            rDot={6}
            glow
          />
          <g opacity={clean}>
            <OrbitField
              cx={ECX}
              cy={ECY}
              rMin={ER + 60}
              rMax={ER + 200}
              count={260}
              color={C.magenta}
              seed="future-d"
              speed={0.003}
              rDot={3.6}
              oneWay={false}
            />
          </g>
        </svg>
        <Earth cx={ECX} cy={ECY} r={ER} />
      </div>

      <Panel x={100} from={30} out={150} title="Hạ quỹ đạo có kiểm soát" color={C.orange}>
        <Reentry start={34} />
      </Panel>
      <Panel x={980} from={80} out={150} title="Thu gom rác chủ động" color={C.cyan}>
        <Collect start={86} />
      </Panel>

      {/* ESA Zero Debris 2030 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 250,
          textAlign: "center",
          fontFamily: FONT,
          color: C.white,
          opacity: badge * badgeOut,
          scale: interpolate(badge, [0, 1], [0.85, 1]),
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 600, color: C.lilac }}>ESA · Zero Debris</div>
        <div
          style={{
            fontSize: 220,
            fontWeight: 800,
            color: C.cyan,
            lineHeight: 1,
            textShadow: `0 0 70px ${C.cyan}66`,
          }}
        >
          2030
        </div>
        <div style={{ fontSize: 44, fontWeight: 600 }}>hạn chế tối đa rác mới</div>
      </div>

      {/* closing line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 240,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          color: C.white,
        }}
      >
        <div style={{ fontSize: 120, opacity: line1, translate: `0 ${(1 - line1) * 40}px` }}>
          Bầu trời không vô tận.
        </div>
        <div
          style={{
            fontSize: 72,
            color: C.gold,
            marginTop: 20,
            opacity: line2,
            translate: `0 ${(1 - line2) * 40}px`,
          }}
        >
          Đừng biến nó thành bãi rác.
        </div>
      </div>
    </AbsoluteFill>
  );
};
