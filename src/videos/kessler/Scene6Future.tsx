import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Earth, Sprite, Strip, clamp, useReveal } from "./parts";
import { OrbitField, Rings } from "./orbit";
import { C, EASE_OUT, FONT, H, W } from "./theme";

const ECX = W / 2;
const ECY = 2250;
const ER = 820;

const PW = 900;
const PH = 460;

const Panel: React.FC<{
  top: number;
  from: number;
  out: number;
  title: string;
  color: string;
  children: React.ReactNode;
}> = ({ top, from, out, title, color, children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [from, from + 22], [0, 1], { ...clamp, easing: EASE_OUT });
  const o = interpolate(frame, [out, out + 18], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: (W - PW) / 2,
        top,
        width: PW,
        height: PH,
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
          top: PH + 14,
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

/** Flat planet cap used inside the small illustration panels. */
const MiniPlanet: React.FC = () => (
  <svg width={PW} height={PH} style={{ position: "absolute" }}>
    <defs>
      <radialGradient id="mini-planet" cx="40%" cy="30%" r="80%">
        <stop offset="0%" stopColor={C.cyan} />
        <stop offset="55%" stopColor={C.blue} />
        <stop offset="100%" stopColor={C.bg2} />
      </radialGradient>
    </defs>
    <circle cx={PW / 2} cy={880} r={540} fill={C.cyan} opacity={0.18} />
    <circle cx={PW / 2} cy={880} r={500} fill="url(#mini-planet)" />
  </svg>
);

/** Controlled re-entry: satellite falls toward the atmosphere and burns up. */
const Reentry: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + 100], [0, 1], { ...clamp, easing: (x) => x * x });
  const x = interpolate(t, [0, 1], [150, 450]);
  const y = interpolate(t, [0, 1], [70, 360]);
  const burn = interpolate(t, [0.55, 0.95], [0, 1], clamp);
  const vanish = interpolate(t, [0.9, 1], [1, 0], clamp);
  return (
    <>
      <MiniPlanet />
      <svg width={PW} height={PH} style={{ position: "absolute" }}>
        {Array.from({ length: 9 }, (_, i) => {
          const tt = Math.max(0, t - i * 0.03);
          return (
            <circle
              key={i}
              cx={interpolate(tt, [0, 1], [150, 450]) - 20 * i * burn}
              cy={interpolate(tt, [0, 1], [70, 360]) - 26 * i * burn}
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
  const cx = interpolate(approach, [0, 1], [130, 330]) + pull * 100;
  const cy = 200 + pull * 150;
  const debrisX = pull > 0 ? cx + 180 : 640 + Math.sin(frame * 0.05) * 8;
  const debrisY = pull > 0 ? cy : 200 + Math.cos(frame * 0.05) * 8;
  const vanish = interpolate(pull, [0.75, 1], [1, 0], clamp);
  return (
    <>
      <MiniPlanet />
      <Sprite name="debris-2" x={debrisX} y={debrisY} size={110} rotate={frame * 2} opacity={vanish} />
      <Sprite name="collector" x={cx} y={cy} size={300} rotate={pull * 25} />
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
  const spaceView = interpolate(frame, [250, 280], [1, 0], clamp);
  const ground = interpolate(frame, [255, 290], [0, 1], clamp);

  return (
    <AbsoluteFill>
      {/* orbit view: debris cleaned out */}
      <div style={{ position: "absolute", inset: 0, opacity: spaceView }}>
        <svg width={W} height={H} style={{ position: "absolute" }}>
          <Rings cx={ECX} cy={ECY} radii={[ER + 90, ER + 170, ER + 250]} />
          <OrbitField
            cx={ECX}
            cy={ECY}
            rMin={ER + 80}
            rMax={ER + 260}
            count={40}
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
              rMax={ER + 280}
              count={320}
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

      {/* ground view: the same sky, clean again, people still looking up */}
      <div style={{ position: "absolute", inset: 0, opacity: ground }}>
        <svg width={W} height={H} style={{ position: "absolute" }}>
          <Rings cx={ECX} cy={H + 300} radii={[1000, 1180, 1360, 1540, 1720]} />
          <OrbitField
            cx={ECX}
            cy={H + 300}
            rMin={980}
            rMax={1740}
            count={90}
            color={C.cyan}
            seed="end-sat"
            speed={0.0016}
            rDot={6}
            glow
          />
        </svg>
        <Strip name="hill" aspect={1080 / 520} />
        <Sprite name="stargazer" x={330} y={1380} size={620} />
        <Sprite name="kid" x={690} y={1500} size={440} />
      </div>

      <Panel top={130} from={30} out={150} title="Bring dead satellites down" color={C.orange}>
        <Reentry start={34} />
      </Panel>
      <Panel top={700} from={80} out={150} title="Clean up debris" color={C.cyan}>
        <Collect start={86} />
      </Panel>

      {/* ESA Zero Debris 2030 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 330,
          textAlign: "center",
          fontFamily: FONT,
          color: C.white,
          opacity: badge * badgeOut,
          scale: interpolate(badge, [0, 1], [0.85, 1]),
        }}
      >
        <Sprite name="mission-badge" x={540} y={140} size={300} />
        <div style={{ fontSize: 46, fontWeight: 600, color: C.lilac, marginTop: 300 }}>
          ESA · Zero Debris
        </div>
        <div
          style={{
            fontSize: 250,
            fontWeight: 800,
            color: C.cyan,
            lineHeight: 1,
            textShadow: `0 0 70px ${C.cyan}66`,
          }}
        >
          2030
        </div>
        <div style={{ fontSize: 50, fontWeight: 600 }}>minimize new debris</div>
      </div>

      {/* closing line */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 230,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          color: C.white,
        }}
      >
        <div style={{ fontSize: 112, lineHeight: 1.05, opacity: line1, translate: `0 ${(1 - line1) * 40}px` }}>
          The sky isn't infinite.
        </div>
        <div
          style={{
            fontSize: 70,
            lineHeight: 1.1,
            color: C.gold,
            marginTop: 30,
            opacity: line2,
            translate: `0 ${(1 - line2) * 40}px`,
          }}
        >
          Don't turn it into a junkyard.
        </div>
      </div>
    </AbsoluteFill>
  );
};
