import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { Collision } from "./Scene3Cascade";
import { Earth, Sprite, Tag, clamp, useReveal } from "./parts";
import { C, FONT, H, W } from "./theme";

const ECX = W / 2;
const ECY = 1500;
const ER = 900;
const SHELL = 1050; // orbital shell radius around Earth center
const TOP_Y = ECY - SHELL; // 450

const CRASH = 52;
const LAUNCH = 245;
const ROCKET_HIT = 305;

const shellPos = (ang: number, r = SHELL) => ({
  x: ECX + Math.cos(ang) * r,
  y: ECY + Math.sin(ang) * r,
});

const DEBRIS = Array.from({ length: 360 }, (_, i) => ({
  w: (random(`ad-w${i}`) - 0.5) * 0.024,
  r: SHELL - 40 + random(`ad-r${i}`) * 90,
  s: 2.4 + random(`ad-s${i}`) * 3.6,
  gold: random(`ad-g${i}`) > 0.5,
}));

/** Local frame 0 = absolute 789 (26.3s). 2009 crash → shell fills → rocket blocked. */
export const Scene4Aftermath: React.FC = () => {
  const frame = useCurrentFrame();

  const approach = interpolate(frame, [0, CRASH], [0, 1], clamp);
  const crashed = frame >= CRASH;
  const labels = interpolate(frame, [4, 18, CRASH - 4, CRASH + 8], [0, 1, 1, 0], clamp);

  // debris spread around the shell after the crash
  const t = Math.max(0, frame - CRASH);
  const redGlow = interpolate(frame, [120, 200], [0, 0.55], clamp);

  const rocketP = interpolate(frame, [LAUNCH, ROCKET_HIT], [0, 1], {
    ...clamp,
    easing: (x) => x * x,
  });
  const rocketY = interpolate(rocketP, [0, 1], [ECY - ER + 40, TOP_Y + 40]);
  const rocketAlive = frame >= LAUNCH && frame < ROCKET_HIT;
  const warn = interpolate(frame, [ROCKET_HIT - 10, ROCKET_HIT + 4], [0, 1], clamp);
  const final = useReveal(ROCKET_HIT + 20, 22);

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
        <circle
          cx={ECX}
          cy={ECY}
          r={SHELL + 140}
          fill="url(#shell-red)"
          opacity={redGlow}
        />
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
              const { x, y } = shellPos(ang, d.r);
              const burstR = interpolate(t, [0, 24], [0, 1], clamp);
              // start clustered at crash point, then ride the shell
              const px = interpolate(burstR, [0, 1], [ECX, x]);
              const py = interpolate(burstR, [0, 1], [TOP_Y, y]);
              return (
                <circle
                  key={i}
                  cx={px}
                  cy={py}
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
            size={150}
            rotate={12}
          />
          <Sprite
            name="starlink"
            x={interpolate(approach, [0, 1], [W + 100, ECX + 40])}
            y={TOP_Y + 6}
            size={150}
            rotate={-12}
          />
        </>
      ) : null}
      <Collision x={ECX} y={TOP_Y} at={CRASH} size={420} seed="2009" />

      {/* labels for the 2009 crash */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          fontFamily: FONT,
          color: C.white,
          textAlign: "center",
          opacity: labels,
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 600, color: C.lilac }}>10 / 02 / 2009</div>
        <div style={{ fontSize: 76, fontWeight: 800 }}>
          <span style={{ color: C.cyan }}>Iridium 33</span>
          <span style={{ color: C.lilac }}> × </span>
          <span style={{ color: C.gold }}>Cosmos 2251</span>
        </div>
      </div>
      <Tag text="Quỹ đạo thấp" x={96} y={90} color={C.magenta} from={130} />

      {/* rocket attempt */}
      {rocketAlive ? (
        <Sprite name="rocket" x={ECX} y={rocketY} size={330} rotate={0} />
      ) : null}
      <Collision x={ECX} y={TOP_Y + 10} at={ROCKET_HIT} size={380} seed="rk" />
      <div
        style={{
          position: "absolute",
          left: ECX - 230,
          top: 160,
          width: 460,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 64,
          color: C.gold,
          opacity: warn,
          scale: interpolate(warn, [0, 1], [0.8, 1]),
        }}
      >
        ⚠ NGUY HIỂM
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 190,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 58,
          color: C.white,
          opacity: final,
          translate: `0 ${(1 - final) * 30}px`,
          textShadow: `0 0 40px ${C.bg}`,
        }}
      >
        Lối ra vũ trụ bị phong tỏa?
      </div>
    </AbsoluteFill>
  );
};
