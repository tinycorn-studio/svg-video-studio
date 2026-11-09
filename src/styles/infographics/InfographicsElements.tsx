import React from "react";
import { Icon } from "@iconify/react";
import * as d3 from "d3";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface CameraKeyframe {
  frame: number;
  /** Tọa độ tâm X cần focus trên màn hình 1920x1080 */
  focusX: number;
  /** Tọa độ tâm Y cần focus trên màn hình 1920x1080 */
  focusY: number;
  /** Độ phóng đại (1 = toàn cảnh, >1 = zoom in) */
  zoom: number;
}

/**
 * CameraRig chuẩn phong cách The Infographics Show / Vox:
 * Cho phép đặt danh sách các điểm dừng Camera (Zoom / Pan) theo frame,
 * tự động nội suy mượt mà bằng spring physics của Remotion.
 */
export const CameraRig: React.FC<{
  keyframes: CameraKeyframe[];
  children: React.ReactNode;
}> = ({ keyframes, children }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;

  let currentX = keyframes[0]?.focusX ?? centerX;
  let currentY = keyframes[0]?.focusY ?? centerY;
  let currentZoom = keyframes[0]?.zoom ?? 1;

  for (let i = 1; i < keyframes.length; i++) {
    const prev = keyframes[i - 1];
    const next = keyframes[i];
    if (frame >= next.frame) {
      const t = spring({
        frame: frame - next.frame,
        fps,
        config: { damping: 18, stiffness: 90, mass: 0.9 },
      });
      currentX = interpolate(t, [0, 1], [prev.focusX, next.focusX]);
      currentY = interpolate(t, [0, 1], [prev.focusY, next.focusY]);
      currentZoom = interpolate(t, [0, 1], [prev.zoom, next.zoom]);
    }
  }

  const translateX = (centerX - currentX) * currentZoom;
  const translateY = (centerY - currentY) * currentZoom;

  return (
    <AbsoluteFill
      style={{
        transformOrigin: "center center",
        transform: `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/**
 * Thẻ Icon phẳng (Flat Vector Card) nảy lên theo phong cách Infographics
 * Hỗ trợ hơn 200,000+ icon từ @iconify/react (ví dụ: flat-color-icons:*, twemoji:*, lucide:*)
 */
export const FlatIconCard: React.FC<{
  x: number;
  y: number;
  icon: string;
  title: string;
  subtitle: string;
  accentColor?: string;
  startFrame?: number;
}> = ({
  x,
  y,
  icon,
  title,
  subtitle,
  accentColor = "#38bdf8",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Hiệu ứng lơ lửng nhẹ sau khi xuất hiện
  const floatY = Math.sin((frame - startFrame) * 0.08) * 6;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 380,
        padding: "28px 24px",
        borderRadius: 28,
        backgroundColor: "#1e293b",
        border: `4px solid ${accentColor}`,
        boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `translate(-50%, -50%) translateY(${floatY}px) scale(${pop})`,
      }}
    >
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <Icon icon={icon} width={72} height={72} />
      </div>
      <div
        style={{
          color: "#f8fafc",
          fontSize: 30,
          fontWeight: 800,
          textAlign: "center",
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: accentColor,
          fontSize: 22,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

export interface BarDatum {
  label: string;
  value: number;
  color: string;
}

/**
 * Biểu đồ cột SVG động (Animated SVG Bar Chart) tính toán bằng D3.js
 */
export const AnimatedBarChart: React.FC<{
  x: number;
  y: number;
  width?: number;
  height?: number;
  data: BarDatum[];
  startFrame?: number;
  unit?: string;
}> = ({
  x,
  y,
  width = 760,
  height = 460,
  data,
  startFrame = 0,
  unit = "%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const margin = { top: 45, right: 30, bottom: 65, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .range([0, innerWidth])
    .padding(0.32);

  const maxVal = d3.max(data, (d) => d.value) ?? 100;
  const yScale = d3.scaleLinear().domain([0, maxVal]).range([innerHeight, 0]);

  const cardPop = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: 32,
        backgroundColor: "#1e293b",
        border: "4px solid #475569",
        boxShadow: "0 20px 45px rgba(0,0,0,0.4)",
        transform: `translate(-50%, -50%) scale(${cardPop})`,
        padding: 12,
      }}
    >
      <svg width={width - 24} height={height - 24}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Đường trục ngang đáy */}
          <line
            x1={0}
            y1={innerHeight}
            x2={innerWidth}
            y2={innerHeight}
            stroke="#64748b"
            strokeWidth={3}
          />

          {data.map((d, i) => {
            const barProgress = spring({
              frame: frame - (startFrame + 10 + i * 7),
              fps,
              config: { damping: 14, stiffness: 110 },
            });

            const barX = xScale(d.label) ?? 0;
            const barWidth = xScale.bandwidth();
            const targetHeight = innerHeight - yScale(d.value);
            const currentHeight = targetHeight * barProgress;
            const currentY = innerHeight - currentHeight;
            const displayVal = Math.round(d.value * barProgress);

            return (
              <g key={d.label}>
                <rect
                  x={barX}
                  y={currentY}
                  width={barWidth}
                  height={Math.max(0, currentHeight)}
                  rx={12}
                  fill={d.color}
                />
                <text
                  x={barX + barWidth / 2}
                  y={currentY - 12}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize={24}
                  fontWeight="bold"
                >
                  {displayVal}
                  {unit}
                </text>
                <text
                  x={barX + barWidth / 2}
                  y={innerHeight + 38}
                  textAnchor="middle"
                  fill="#cbd5e1"
                  fontSize={22}
                  fontWeight={600}
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
