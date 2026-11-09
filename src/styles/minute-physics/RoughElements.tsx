import React, { useMemo } from "react";
import rough from "roughjs";
import type { Options as RoughOptions, Drawable } from "roughjs/bin/core";
import { evolvePath } from "@remotion/paths";
import { interpolate, useCurrentFrame } from "remotion";

const generator = rough.generator();

export interface RoughPathItem {
  d: string;
  stroke: string;
  strokeWidth: number;
  fill?: string;
}

/**
 * Helper chuyển đổi một Drawable của Rough.js sang danh sách các thẻ <path> SVG
 * kèm theo hiệu ứng tự vẽ nét (evolvePath) theo tiến độ progress (0 -> 1).
 */
export const RoughDrawableView: React.FC<{
  drawable: Drawable;
  progress: number;
}> = ({ drawable, progress }) => {
  const paths = useMemo(() => generator.toPaths(drawable), [drawable]);

  if (progress <= 0) return null;

  return (
    <g>
      {paths.map((p, index) => {
        // Chia nhỏ tiến độ vẽ cho từng nét để trông giống vẽ tay thật hơn
        const total = paths.length;
        const start = (index / total) * 0.4;
        const end = start + 0.6;
        const localProgress = interpolate(progress, [start, end], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const evolved = evolvePath(localProgress, p.d);

        return (
          <path
            key={index}
            d={p.d}
            stroke={p.stroke}
            strokeWidth={p.strokeWidth}
            fill={p.fill || "none"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={evolved.strokeDasharray}
            strokeDashoffset={evolved.strokeDashoffset}
          />
        );
      })}
    </g>
  );
};

export const RoughBox: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  startFrame?: number;
  durationInFrames?: number;
  stroke?: string;
  fill?: string;
  seed?: number;
  roughness?: number;
}> = ({
  x,
  y,
  width,
  height,
  startFrame = 0,
  durationInFrames = 30,
  stroke = "#ffffff",
  fill,
  seed = 42,
  roughness = 1.8,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame - startFrame,
    [0, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const drawable = useMemo(() => {
    const opts: RoughOptions = {
      stroke,
      strokeWidth: 4,
      roughness,
      seed,
      fill,
      fillStyle: "hachure",
      hachureGap: 10,
      fillWeight: 2,
    };
    return generator.rectangle(x, y, width, height, opts);
  }, [x, y, width, height, stroke, fill, seed, roughness]);

  return <RoughDrawableView drawable={drawable} progress={progress} />;
};

export const RoughCircle: React.FC<{
  cx: number;
  cy: number;
  diameter: number;
  startFrame?: number;
  durationInFrames?: number;
  stroke?: string;
  fill?: string;
  seed?: number;
}> = ({
  cx,
  cy,
  diameter,
  startFrame = 0,
  durationInFrames = 25,
  stroke = "#ffffff",
  fill,
  seed = 101,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame - startFrame,
    [0, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const drawable = useMemo(() => {
    return generator.circle(cx, cy, diameter, {
      stroke,
      strokeWidth: 4,
      roughness: 1.6,
      seed,
      fill,
      fillStyle: "cross-hatch",
    });
  }, [cx, cy, diameter, stroke, fill, seed]);

  return <RoughDrawableView drawable={drawable} progress={progress} />;
};

export const RoughArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  startFrame?: number;
  durationInFrames?: number;
  stroke?: string;
  seed?: number;
}> = ({
  x1,
  y1,
  x2,
  y2,
  startFrame = 0,
  durationInFrames = 20,
  stroke = "#ffd166",
  seed = 77,
}) => {
  const frame = useCurrentFrame();
  const lineProgress = interpolate(
    frame - startFrame,
    [0, durationInFrames * 0.7],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const headProgress = interpolate(
    frame - startFrame,
    [durationInFrames * 0.6, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const { lineDrawable, headDrawable } = useMemo(() => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headLen = 26;
    const ax1 = x2 - headLen * Math.cos(angle - Math.PI / 6);
    const ay1 = y2 - headLen * Math.sin(angle - Math.PI / 6);
    const ax2 = x2 - headLen * Math.cos(angle + Math.PI / 6);
    const ay2 = y2 - headLen * Math.sin(angle + Math.PI / 6);

    const opts: RoughOptions = {
      stroke,
      strokeWidth: 4,
      roughness: 1.5,
      seed,
    };

    return {
      lineDrawable: generator.line(x1, y1, x2, y2, opts),
      headDrawable: generator.linearPath(
        [
          [ax1, ay1],
          [x2, y2],
          [ax2, ay2],
        ],
        opts,
      ),
    };
  }, [x1, y1, x2, y2, stroke, seed]);

  return (
    <g>
      <RoughDrawableView drawable={lineDrawable} progress={lineProgress} />
      <RoughDrawableView drawable={headDrawable} progress={headProgress} />
    </g>
  );
};

export const RoughLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  startFrame?: number;
  durationInFrames?: number;
  stroke?: string;
  strokeWidth?: number;
  seed?: number;
}> = ({
  x1,
  y1,
  x2,
  y2,
  startFrame = 0,
  durationInFrames = 18,
  stroke = "#ffffff",
  strokeWidth = 4,
  seed = 55,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame - startFrame,
    [0, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const drawable = useMemo(() => {
    return generator.line(x1, y1, x2, y2, {
      stroke,
      strokeWidth,
      roughness: 1.6,
      seed,
    });
  }, [x1, y1, x2, y2, stroke, strokeWidth, seed]);

  return <RoughDrawableView drawable={drawable} progress={progress} />;
};

export const RoughCurve: React.FC<{
  points: [number, number][];
  startFrame?: number;
  durationInFrames?: number;
  stroke?: string;
  strokeWidth?: number;
  seed?: number;
}> = ({
  points,
  startFrame = 0,
  durationInFrames = 25,
  stroke = "#4ea8de",
  strokeWidth = 4.5,
  seed = 88,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame - startFrame,
    [0, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const drawable = useMemo(() => {
    return generator.curve(points, {
      stroke,
      strokeWidth,
      roughness: 1.5,
      seed,
    });
  }, [points, stroke, strokeWidth, seed]);

  return <RoughDrawableView drawable={drawable} progress={progress} />;
};

export type StickmanPose = "stand" | "point-right" | "wave" | "think";

/**
 * Nhân vật Người Que (Stickman) chuẩn phong cách MinutePhysics
 * Tự động vẽ từng nét (đầu -> thân -> tay -> chân) theo frame.
 */
export const RoughStickman: React.FC<{
  x: number;
  y: number;
  scale?: number;
  pose?: StickmanPose;
  stroke?: string;
  startFrame?: number;
  durationInFrames?: number;
  seed?: number;
  label?: string;
}> = ({
  x,
  y,
  scale = 1,
  pose = "point-right",
  stroke = "#ffffff",
  startFrame = 0,
  durationInFrames = 35,
  seed = 12,
  label,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame - startFrame,
    [0, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Hiệu ứng rung nhẹ nét vẽ tay (Line Boil) mỗi 6 frame giống hoạt hình vẽ tay thật
  const boilSeed = seed + ( progress >= 1 ? Math.floor(frame / 6) % 3 : 0 );

  const parts = useMemo(() => {
    const opts: RoughOptions = {
      stroke,
      strokeWidth: 4.5,
      roughness: 1.5,
      seed: boilSeed,
    };

    // Đầu ở (0, -90), cổ ở (0, -55), hông ở (0, 35)
    const head = generator.circle(0, -90, 68, opts);
    const body = generator.line(0, -56, 0, 35, opts);

    // Tay trái & phải tùy theo pose
    let leftArm: Drawable;
    let rightArm: Drawable;

    if (pose === "point-right") {
      leftArm = generator.linearPath(
        [
          [0, -35],
          [-35, 0],
          [-25, 30],
        ],
        opts,
      );
      rightArm = generator.linearPath(
        [
          [0, -35],
          [45, -45],
          [85, -55],
        ],
        opts,
      );
    } else if (pose === "wave") {
      const waveOffset = Math.sin(frame * 0.25) * 18;
      leftArm = generator.line(0, -35, -40, 15, opts);
      rightArm = generator.linearPath(
        [
          [0, -35],
          [40, -60],
          [55 + waveOffset, -105],
        ],
        opts,
      );
    } else if (pose === "think") {
      leftArm = generator.line(0, -35, -35, 15, opts);
      rightArm = generator.linearPath(
        [
          [0, -35],
          [38, -25],
          [15, -62],
        ],
        opts,
      );
    } else {
      leftArm = generator.line(0, -35, -40, 20, opts);
      rightArm = generator.line(0, -35, 40, 20, opts);
    }

    const leftLeg = generator.line(0, 35, -35, 115, opts);
    const rightLeg = generator.line(0, 35, 35, 115, opts);

    return [head, body, leftArm, rightArm, leftLeg, rightLeg];
  }, [stroke, boilSeed, pose, frame]);

  if (progress <= 0) return null;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {parts.map((drawable, i) => {
        const partStart = (i / parts.length) * 0.55;
        const partEnd = partStart + 0.45;
        const partProgress = interpolate(progress, [partStart, partEnd], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <RoughDrawableView
            key={i}
            drawable={drawable}
            progress={partProgress}
          />
        );
      })}
      {label && progress > 0.7 && (
        <text
          x={0}
          y={160}
          textAnchor="middle"
          fill={stroke}
          fontSize={28}
          fontFamily="'Comic Sans MS', 'Chalkboard SE', cursive"
          opacity={interpolate(progress, [0.7, 1], [0, 1])}
        >
          {label}
        </text>
      )}
    </g>
  );
};
