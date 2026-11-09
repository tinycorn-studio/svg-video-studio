import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * SVG Filter tạo hiệu ứng Neon Glow phát sáng cho các đường nét HUD
 */
export const HudGlowFilter: React.FC<{ id?: string; color?: string }> = ({
  id = "hud-glow",
  color = "#00f0ff",
}) => {
  return (
    <defs>
      <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={color} floodOpacity="0.8" />
        <feDropShadow dx="0" dy="0" stdDeviation="9" floodColor={color} floodOpacity="0.4" />
      </filter>
    </defs>
  );
};

/**
 * Radar quét góc 360 độ phong cách Sci-Fi / Cyberpunk
 */
export const RadarSweep: React.FC<{
  cx: number;
  cy: number;
  radius: number;
  stroke?: string;
  speedMultiplier?: number;
}> = ({
  cx,
  cy,
  radius,
  stroke = "#00f0ff",
  speedMultiplier = 1,
}) => {
  const frame = useCurrentFrame();
  const angle = (frame * 3.5 * speedMultiplier) % 360;
  const rad = (angle * Math.PI) / 180;
  const sweepX = cx + Math.cos(rad) * radius;
  const sweepY = cy + Math.sin(rad) * radius;

  return (
    <g>
      {/* Vòng tròn đồng tâm */}
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke={stroke} strokeWidth={2} opacity={0.4} />
      <circle cx={cx} cy={cy} r={radius * 0.66} fill="none" stroke={stroke} strokeWidth={1.5} opacity={0.3} strokeDasharray="6 6" />
      <circle cx={cx} cy={cy} r={radius * 0.33} fill="none" stroke={stroke} strokeWidth={1} opacity={0.25} />
      {/* Trục chữ thập */}
      <line x1={cx - radius} y1={cy} x2={cx + radius} y2={cy} stroke={stroke} strokeWidth={1} opacity={0.3} />
      <line x1={cx} y1={cy - radius} x2={cx} y2={cy + radius} stroke={stroke} strokeWidth={1} opacity={0.3} />
      {/* Tia quét Radar */}
      <line x1={cx} y1={cy} x2={sweepX} y2={sweepY} stroke={stroke} strokeWidth={3} filter="url(#hud-glow)" />
      {/* Tâm điểm phát sáng */}
      <circle cx={cx} cy={cy} r={4} fill={stroke} filter="url(#hud-glow)" />
    </g>
  );
};

/**
 * Khung hiển thị Telemetry góc vát công nghệ cao (Tech Corner Box)
 */
export const TechBox: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  accentColor?: string;
  startFrame?: number;
  children?: React.ReactNode;
}> = ({
  x,
  y,
  width,
  height,
  title,
  accentColor = "#00f0ff",
  startFrame = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const corner = 20;
  const d = `
    M ${x + corner} ${y}
    L ${x + width} ${y}
    L ${x + width} ${y + height - corner}
    L ${x + width - corner} ${y + height}
    L ${x} ${y + height}
    L ${x} ${y + corner}
    Z
  `;

  return (
    <g transform={`translate(${x + width / 2}, ${y + height / 2}) scale(${pop}) translate(${-(x + width / 2)}, ${-(y + height / 2)})`}>
      <path
        d={d}
        fill="rgba(5, 15, 30, 0.75)"
        stroke={accentColor}
        strokeWidth={2}
        filter="url(#hud-glow)"
      />
      {/* Tab tiêu đề */}
      <text
        x={x + 18}
        y={y + 28}
        fill={accentColor}
        fontSize={16}
        fontWeight="bold"
        fontFamily="monospace"
        letterSpacing={2}
      >
        // {title.toUpperCase()}
      </text>
      {/* Đèn báo nhấp nháy */}
      <circle
        cx={x + width - 20}
        cy={y + 22}
        r={5}
        fill={accentColor}
        opacity={Math.sin(frame * 0.2) > 0 ? 1 : 0.2}
      />
      {children}
    </g>
  );
};
