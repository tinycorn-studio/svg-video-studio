import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { interpolate as flubberInterpolate } from "flubber";

/**
 * Component biến hình SVG hữu cơ bằng Flubber (chuẩn phong cách Kurzgesagt)
 * Nội suy mượt mà giữa 2 đường path SVG (kể cả khác số đỉnh/điểm).
 */
export const MorphingPath: React.FC<{
  pathA: string;
  pathB: string;
  startFrame?: number;
  durationInFrames?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}> = ({
  pathA,
  pathB,
  startFrame = 0,
  durationInFrames = 30,
  fill = "#f72585",
  stroke = "none",
  strokeWidth = 0,
}) => {
  const frame = useCurrentFrame();

  const interpolator = useMemo(() => {
    return flubberInterpolate(pathA, pathB, { maxSegmentLength: 2 });
  }, [pathA, pathB]);

  const progress = interpolate(
    frame - startFrame,
    [0, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const currentPath = interpolator(progress);

  return (
    <path
      d={currentPath}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};

/**
 * Hành tinh / Tế bào vi mô đồ họa Vector phong cách Kurzgesagt
 * Kết hợp nhiều vòng khí quyển (Atmosphere layers) phát sáng mềm mại.
 */
export const KurzgesagtPlanet: React.FC<{
  cx: number;
  cy: number;
  radius: number;
  planetColor?: string;
  atmosphereColor?: string;
  startFrame?: number;
}> = ({
  cx,
  cy,
  radius,
  planetColor = "#4361ee",
  atmosphereColor = "#4cc9f0",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  return (
    <g transform={`translate(${cx}, ${cy}) scale(${pop}) translate(${-cx}, ${-cy})`}>
      {/* Vòng hào quang khí quyển 2 lớp */}
      <circle
        cx={cx}
        cy={cy}
        r={radius * 1.3}
        fill={atmosphereColor}
        opacity={0.12}
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius * 1.15}
        fill={atmosphereColor}
        opacity={0.25}
      />
      {/* Thân hành tinh */}
      <circle cx={cx} cy={cy} r={radius} fill={planetColor} />
      {/* Mặt bóng tối (Crescent Shadow) */}
      <path
        d={`M ${cx} ${cy - radius} A ${radius} ${radius} 0 0 1 ${cx} ${cy + radius} A ${radius * 0.75} ${radius} 0 0 0 ${cx} ${cy - radius}`}
        fill="#0b092b"
        opacity={0.4}
      />
    </g>
  );
};
