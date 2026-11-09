import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { Sprite, Tag, clamp, useReveal } from "./parts";
import { C, EASE_OUT, FONT, H, W } from "./theme";

const CX = W / 2;
const CY = H / 2;

type Target = {
  x: number;
  y: number;
  sprite: string;
  rot: number;
  hit: number; // local frame of impact
  from: { x: number; y: number }; // fragment origin
  depart: number; // frame the fragment leaves origin
  size: number;
  level: 1 | 2;
};

const T0 = 100; // first collision
const DT1 = 46;
const DT2 = 52;
const SPRITES = ["satellite", "starlink", "rocket-stage"];

const buildTargets = (): Target[] => {
  const out: Target[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3;
    const x = CX + Math.cos(a) * 340;
    const y = CY + Math.sin(a) * 210;
    const hit = T0 + DT1 + i * 2;
    out.push({
      x,
      y,
      sprite: SPRITES[i % 3],
      rot: -40 + random(`t1r${i}`) * 80,
      hit,
      from: { x: CX, y: CY },
      depart: T0,
      size: 130,
      level: 1,
    });
    for (let j = 0; j < 2; j++) {
      const b = a + (j === 0 ? -0.32 : 0.32);
      const x2 = CX + Math.cos(b) * 760;
      const y2 = CY + Math.sin(b) * 420;
      out.push({
        x: x2,
        y: y2,
        sprite: SPRITES[(i + j + 1) % 3],
        rot: -60 + random(`t2r${i}${j}`) * 120,
        hit: hit + DT2 + j * 4,
        from: { x, y },
        depart: hit,
        size: 105,
        level: 2,
      });
    }
  }
  return out;
};
const TARGETS = buildTargets();

export const Collision: React.FC<{
  x: number;
  y: number;
  at: number;
  size: number;
  seed: string;
}> = ({ x, y, at, size, seed }) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < 0) return null;
  const pop = interpolate(t, [0, 10, 40], [0.2, 1, 1.25], { ...clamp, easing: EASE_OUT });
  const fade = interpolate(t, [10, 40], [1, 0], clamp);
  const wave = interpolate(t, [0, 36], [0.2, 2.4], { ...clamp, easing: EASE_OUT });
  const waveFade = interpolate(t, [0, 36], [0.85, 0], clamp);
  return (
    <>
      <Sprite name="shockwave" x={x} y={y} size={size * 1.6} scale={wave} opacity={waveFade} />
      <Sprite name="burst" x={x} y={y} size={size} scale={pop} opacity={fade} rotate={t * 2} />
      {Array.from({ length: 6 }, (_, k) => {
        const ang = random(`${seed}a${k}`) * Math.PI * 2;
        const sp = 2.2 + random(`${seed}s${k}`) * 4.5;
        return (
          <Sprite
            key={k}
            name={`debris-${(k % 4) + 1}`}
            x={x + Math.cos(ang) * sp * t}
            y={y + Math.sin(ang) * sp * t}
            size={size * 0.3}
            rotate={random(`${seed}r${k}`) * 360 + t * (k % 2 ? 6 : -6)}
            opacity={interpolate(t, [0, 6], [0, 1], clamp)}
          />
        );
      })}
    </>
  );
};

/** Local frame 0 = absolute 426 (14.2s). Chain reaction 1 → 7 → 19 collisions. */
export const Scene3Cascade: React.FC = () => {
  const frame = useCurrentFrame();

  const zoom = interpolate(frame, [215, 375], [1, 0.74], { ...clamp, easing: EASE_OUT });
  const approach = interpolate(frame, [0, T0], [0, 1], clamp);
  const hitL0 = frame >= T0;

  const collisions =
    (hitL0 ? 1 : 0) + TARGETS.filter((t) => frame >= t.hit).length;
  const counter = useReveal(T0, 12);
  const title = useReveal(4, 20);
  const sub = useReveal(20, 20);
  const titleOut = interpolate(frame, [88, 100], [1, 0.0], clamp);

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
        {/* L0: two objects approach head-on */}
        {!hitL0 ? (
          <>
            <Sprite
              name="satellite"
              x={interpolate(approach, [0, 1], [-160, CX - 30])}
              y={CY}
              size={170}
              rotate={90 - 90}
            />
            <Sprite
              name="debris-1"
              x={interpolate(approach, [0, 1], [W + 160, CX + 30])}
              y={CY}
              size={110}
              rotate={frame * 7}
            />
          </>
        ) : null}
        <Collision x={CX} y={CY} at={T0} size={360} seed="c0" />

        {/* fragments in flight + targets */}
        <svg width={W} height={H} style={{ position: "absolute" }}>
          {TARGETS.map((t, i) => {
            const p = interpolate(frame, [t.depart, t.hit], [0, 1], clamp);
            if (frame < t.depart || frame >= t.hit) return null;
            const x = t.from.x + (t.x - t.from.x) * p;
            const y = t.from.y + (t.y - t.from.y) * p;
            const tx = t.from.x + (t.x - t.from.x) * Math.max(0, p - 0.18);
            const ty = t.from.y + (t.y - t.from.y) * Math.max(0, p - 0.18);
            return (
              <g key={i}>
                <line
                  x1={tx}
                  y1={ty}
                  x2={x}
                  y2={y}
                  stroke={C.lightGold}
                  strokeWidth={6}
                  strokeLinecap="round"
                  opacity={0.7}
                />
                <circle cx={x} cy={y} r={9} fill={C.white} />
                <circle cx={x} cy={y} r={20} fill={C.gold} opacity={0.35} />
              </g>
            );
          })}
        </svg>

        {TARGETS.map((t, i) => {
          const appear = interpolate(frame, [20 + i * 2, 40 + i * 2], [0, 1], {
            ...clamp,
            easing: EASE_OUT,
          });
          const drift = Math.sin(frame * 0.03 + i) * 8;
          return (
            <React.Fragment key={i}>
              {frame < t.hit ? (
                <Sprite
                  name={t.sprite}
                  x={t.x}
                  y={t.y + drift}
                  size={t.size}
                  rotate={t.rot + frame * 0.25}
                  scale={appear}
                />
              ) : null}
              <Collision x={t.x} y={t.y} at={t.hit} size={t.level === 1 ? 260 : 200} seed={`c${i}`} />
            </React.Fragment>
          );
        })}
      </div>

      {/* Title block */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 76,
          fontFamily: FONT,
          color: C.white,
          opacity: Math.min(title, titleOut),
          translate: `0 ${(1 - title) * -28}px`,
        }}
      >
        <div style={{ fontSize: 92, fontWeight: 800, color: C.magenta, lineHeight: 1 }}>
          HỘI CHỨNG KESSLER
        </div>
        <div style={{ fontSize: 38, fontWeight: 600, color: C.lilac, marginTop: 10, opacity: sub }}>
          Donald J. Kessler · NASA · 1978
        </div>
      </div>

      {/* Collision counter */}
      <div
        style={{
          position: "absolute",
          right: 96,
          top: 70,
          textAlign: "right",
          fontFamily: FONT,
          opacity: counter,
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, color: C.lilac }}>Số vụ va chạm</div>
        <div
          style={{
            fontSize: 130,
            fontWeight: 800,
            color: collisions > 1 ? C.gold : C.white,
            lineHeight: 1,
          }}
        >
          {collisions}
        </div>
      </div>
      <Tag
        text="Phản ứng dây chuyền"
        x={96}
        y={980}
        color={C.gold}
        from={T0 + 60}
        size={36}
      />
    </AbsoluteFill>
  );
};
