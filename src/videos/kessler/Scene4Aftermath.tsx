import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { Collision } from "./Scene3Cascade";
import { Earth, Sprite, Tag, clamp, useReveal } from "./parts";
import { C, FONT, H, W } from "./theme";

const ECX = W / 2;
const ECY = 2350;
const ER = 1000;
const SHELL = 1130; // orbital shell radius around Earth center
const TOP_Y = ECY - SHELL; // 1220

const CRASH = 52;
const ASTRO_IN = 118;
const ASTRO_OUT = 236;
const LAUNCH = 245;
const ROCKET_HIT = 305;

const DEBRIS = Array.from({ length: 700 }, (_, i) => ({
  w: (random(`ad-w${i}`) - 0.5) * 0.0075,
  r: SHELL - 50 + random(`ad-r${i}`) * 110,
  s: 2.6 + random(`ad-s${i}`) * 3.8,
  gold: random(`ad-g${i}`) > 0.5,
}));

/** Local frame 0 = absolute 789 (26.3s). 2009 crash → shell fills → astronaut, rocket, phone at risk. */
export const Scene4Aftermath: React.FC = () => {
  const frame = useCurrentFrame();

  const approach = interpolate(frame, [0, CRASH], [0, 1], clamp);
  const crashed = frame >= CRASH;
  const labels = interpolate(frame, [4, 18, CRASH - 4, CRASH + 8], [0, 1, 1, 0], clamp);
  const t = Math.max(0, frame - CRASH);
  const redGlow = interpolate(frame, [110, 190], [0, 0.55], clamp);

  const astroIn = interpolate(frame, [ASTRO_IN, ASTRO_IN + 22], [0, 1], clamp);
  const astroOut = interpolate(frame, [ASTRO_OUT - 10, ASTRO_OUT], [1, 0], clamp);
  const astroA = astroIn * astroOut;

  const rocketP = interpolate(frame, [LAUNCH, ROCKET_HIT], [0, 1], {
    ...clamp,
    easing: (x) => x * x,
  });
  const rocketY = interpolate(rocketP, [0, 1], [ECY - ER + 150, TOP_Y - 20]);
  const rocketAlive = frame >= LAUNCH && frame < ROCKET_HIT;
  const warn = interpolate(frame, [ROCKET_HIT - 10, ROCKET_HIT + 4], [0, 1], clamp);
  const phoneIn = useReveal(ROCKET_HIT + 6, 20);
  const final = useReveal(ROCKET_HIT + 22, 22);

  return (
    <AbsoluteFill>
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="shell-red" cx="50%" cy="50%" r="50%">
            <stop offset="86%" stopColor={C.magenta} stopOpacity={0} />
            <stop offset="97%" stopColor={C.magenta} stopOpacity={0.55} />
            <stop offset="100%" stopColor={C.magenta} stopOpacity={0} />
          </radialGradient>
        </defs>
        <circle cx={ECX} cy={ECY} r={SHELL + 150} fill="url(#shell-red)" opacity={redGlow} />
        <circle
          cx={ECX}
          cy={ECY}
          r={SHELL}
          fill="none"
          stroke={C.cyan}
          strokeWidth={3}
          opacity={0.16}
        />
        {crashed
          ? DEBRIS.map((d, i) => {
              const ang = -Math.PI / 2 + d.w * t;
              const x = ECX + Math.cos(ang) * d.r;
              const y = ECY + Math.sin(ang) * d.r;
              const burstR = interpolate(t, [0, 24], [0, 1], clamp);
              return (
                <circle
                  key={i}
                  cx={interpolate(burstR, [0, 1], [ECX, x])}
                  cy={interpolate(burstR, [0, 1], [TOP_Y, y])}
                  r={d.s}
                  fill={d.gold ? C.gold : C.magenta}
                  opacity={0.95}
                />
              );
            })
          : null}
      </svg>
      <Earth cx={ECX} cy={ECY} r={ER} />

      {!crashed ? (
        <>
          <Sprite
            name="satellite"
            x={interpolate(approach, [0, 1], [-100, ECX - 40])}
            y={TOP_Y + 6}
            size={190}
            rotate={12}
          />
          <Sprite
            name="starlink"
            x={interpolate(approach, [0, 1], [W + 100, ECX + 40])}
            y={TOP_Y + 6}
            size={190}
            rotate={-12}
          />
        </>
      ) : null}
      <Collision x={ECX} y={TOP_Y} at={CRASH} size={460} seed="2009" />

      {/* labels for the 2009 crash */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          fontFamily: FONT,
          color: C.white,
          textAlign: "center",
          opacity: labels,
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 600, color: C.lilac }}>February 10, 2009</div>
        <div style={{ fontSize: 88, fontWeight: 800, color: C.cyan, lineHeight: 1.1 }}>Iridium 33</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: C.lilac }}>×</div>
        <div style={{ fontSize: 88, fontWeight: 800, color: C.gold, lineHeight: 1.1 }}>Cosmos 2251</div>
      </div>
      <Tag text="Low Earth orbit" x={72} y={110} color={C.magenta} from={110} size={44} />

      {/* astronaut drifting through the debris field */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: astroA,
          translate: `0 ${(1 - astroIn) * 80 + Math.sin(frame * 0.06) * 14}px`,
        }}
      >
        <Sprite name="astronaut" x={540} y={720} size={560} rotate={-12 + Math.sin(frame * 0.04) * 8} />
      </div>

      {/* rocket attempt */}
      {rocketAlive ? <Sprite name="rocket" x={ECX} y={rocketY} size={420} /> : null}
      <Collision x={ECX} y={TOP_Y + 10} at={ROCKET_HIT} size={420} seed="rk" />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 150,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 76,
          color: C.gold,
          opacity: warn,
          scale: interpolate(warn, [0, 1], [0.8, 1]),
        }}
      >
        ⚠ DANGER
      </div>

      {/* human cost: no signal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: phoneIn,
          translate: `0 ${(1 - phoneIn) * 80}px`,
        }}
      >
        <Sprite name="phone-person" x={540} y={720} size={600} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1010,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 64,
          color: C.white,
          opacity: final,
          translate: `0 ${(1 - final) * 30}px`,
          textShadow: `0 0 40px ${C.bg}`,
        }}
      >
        Locked out of space?
      </div>
    </AbsoluteFill>
  );
};
