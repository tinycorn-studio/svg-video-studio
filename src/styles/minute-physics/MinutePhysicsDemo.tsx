import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  RoughArrow,
  RoughBox,
  RoughCircle,
  RoughStickman,
} from "./RoughElements";

/**
 * Demo Cách 1: Phong cách MinutePhysics (Whiteboard / Chalkboard Sketch)
 * - Nền bảng đen / giấy vẽ
 * - Hình vẽ tay tự nhiên bằng Rough.js + tự vẽ nét theo từng giây (evolvePath)
 * - Nhân vật người que (Stickman) có hiệu ứng Line Boil sống động
 */
export const MinutePhysicsDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const subtitleOpacity = interpolate(frame, [105, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#141820",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 0)",
        backgroundSize: "32px 32px",
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
      }}
    >
      {/* Tiêu đề vẽ tay trên đầu */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          color: "#f8f9fa",
          fontSize: 54,
          fontWeight: "bold",
          transform: `scale(${titleScale})`,
        }}
      >
        Style 1: MinutePhysics Sketch (Rough.js + SVG Path)
      </div>

      {/* Canvas SVG chính */}
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {/* 0s - 1.2s: Vẽ nhân vật người que bên trái */}
        <RoughStickman
          x={360}
          y={580}
          scale={1.45}
          pose={frame < 60 ? "wave" : "point-right"}
          startFrame={5}
          durationInFrames={35}
          stroke="#ffffff"
          label="Observer (You)"
        />

        {/* 1.2s - 2.0s: Vẽ mũi tên chỉ sang khối Khối lượng (Mass) */}
        <RoughArrow
          x1={530}
          y1={510}
          x2={790}
          y2={510}
          startFrame={35}
          durationInFrames={22}
          stroke="#ffd166"
        />

        {/* 1.8s - 2.8s: Vẽ khối hộp Mass (m) với nét gạch chéo hachure */}
        <RoughBox
          x={820}
          y={390}
          width={280}
          height={240}
          startFrame={52}
          durationInFrames={30}
          stroke="#4ea8de"
          fill="rgba(78, 168, 222, 0.35)"
        />

        {frame >= 65 && (
          <text
            x={960}
            y={525}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={56}
            fontWeight="bold"
            opacity={interpolate(frame, [65, 80], [0, 1], {
              extrapolateRight: "clamp",
            })}
          >
            Mass (m)
          </text>
        )}

        {/* 2.6s - 3.3s: Mũi tên chuyển đổi sang Năng lượng */}
        <RoughArrow
          x1={1130}
          y1={510}
          x2={1370}
          y2={510}
          startFrame={78}
          durationInFrames={22}
          stroke="#ffd166"
        />

        {/* 3.1s - 4.2s: Quả cầu Năng lượng E = mc^2 */}
        <RoughCircle
          cx={1550}
          cy={510}
          diameter={270}
          startFrame={92}
          durationInFrames={32}
          stroke="#ff6b6b"
          fill="rgba(255, 107, 107, 0.35)"
        />

        {frame >= 105 && (
          <text
            x={1550}
            y={528}
            textAnchor="middle"
            fill="#ffe66d"
            fontSize={52}
            fontWeight="bold"
            opacity={subtitleOpacity}
          >
            E = mc²
          </text>
        )}
      </svg>

      {/* Phụ đề khớp theo giây giọng đọc ở dưới đáy */}
      <div
        style={{
          position: "absolute",
          bottom: 65,
          width: "100%",
          textAlign: "center",
          color: "#ffd166",
          fontSize: 38,
        }}
      >
        {frame < 40 && "🎙️ [0.0s - 1.3s]: Giả sử bạn đang quan sát một vật thể..."}
        {frame >= 40 &&
          frame < 85 &&
          "🎙️ [1.3s - 2.8s]: Bất kỳ vật thể nào có khối lượng (m)..."}
        {frame >= 85 &&
          "🎙️ [2.8s - 5.0s]: ...đều ẩn chứa nguồn năng lượng khổng lồ E = mc²!"}
      </div>
    </AbsoluteFill>
  );
};
