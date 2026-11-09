import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  AnimatedBarChart,
  CameraRig,
  FlatIconCard,
} from "./InfographicsElements";

/**
 * Demo Cách 2: Phong cách The Infographics Show / Kurzgesagt
 * - Kho hơn 200,000+ icon SVG màu phẳng từ @iconify/react (twemoji, flat-color-icons, lucide)
 * - Biểu đồ dữ liệu SVG động tính bằng D3.js
 * - CameraRig tự động Zoom & Pan mượt mà qua từng cụm thông tin trên Canvas
 */
export const InfographicsDemo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        backgroundImage:
          "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <CameraRig
        keyframes={[
          // 0s - 1.3s: Toàn cảnh mở đầu
          { frame: 0, focusX: 960, focusY: 540, zoom: 1 },
          // 1.3s - 2.6s: Camera Zoom & Pan sang 2 thẻ Icon bên trái
          { frame: 38, focusX: 460, focusY: 540, zoom: 1.32 },
          // 2.6s - 4.0s: Camera Pan mượt sang Biểu đồ D3 bên phải
          { frame: 78, focusX: 1320, focusY: 560, zoom: 1.28 },
          // 4.0s - 5.0s: Zoom out toàn cảnh kết thúc
          { frame: 120, focusX: 960, focusY: 540, zoom: 1 },
        ]}
      >
        {/* Tiêu đề chính */}
        <div
          style={{
            position: "absolute",
            top: 48,
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#38bdf8",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Style 2 • Flat Vector + D3 Chart + Camera Zoom/Pan
          </div>
          <div
            style={{
              color: "#f8fafc",
              fontSize: 54,
              fontWeight: 900,
              marginTop: 6,
            }}
          >
            Sự Bùng Nổ Của AI & Tự Động Hóa Video
          </div>
        </div>

        {/* Cụm bên trái: Các thẻ Flat SVG Icon nảy lên */}
        <FlatIconCard
          x={460}
          y={380}
          icon="flat-color-icons:idea"
          title="1. AI Lên Kịch Bản"
          subtitle="Tự động chia cảnh & chọn Icon"
          accentColor="#facc15"
          startFrame={5}
        />

        <FlatIconCard
          x={460}
          y={730}
          icon="flat-color-icons:film-reel"
          title="2. Remotion Xuất MP4"
          subtitle="Render 60FPS chuẩn từng Frame"
          accentColor="#38bdf8"
          startFrame={20}
        />

        {/* Cụm bên phải: Biểu đồ SVG tính bằng D3 */}
        <AnimatedBarChart
          x={1320}
          y={555}
          width={820}
          height={520}
          startFrame={45}
          unit="x"
          data={[
            { label: "Dựng Thủ Công", value: 10, color: "#64748b" },
            { label: "Template Cũ", value: 35, color: "#a855f7" },
            { label: "AI + SVG Code", value: 95, color: "#22c55e" },
          ]}
        />
      </CameraRig>

      {/* Thanh trạng thái Camera HUD cố định bên dưới */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          border: "2px solid #334155",
          borderRadius: 999,
          padding: "12px 32px",
          color: "#e2e8f0",
          fontSize: 26,
          fontWeight: 600,
        }}
      >
        {frame < 38 && "🎥 Camera: Toàn cảnh (1.0x)"}
        {frame >= 38 && frame < 78 && "🎥 Camera: Zoom In Cụm Icon Trái (1.32x)"}
        {frame >= 78 &&
          frame < 120 &&
          "🎥 Camera: Pan Sang Biểu Đồ Dữ Liệu D3 (1.28x)"}
        {frame >= 120 && "🎥 Camera: Zoom Out Tổng Kết (1.0x)"}
      </div>
    </AbsoluteFill>
  );
};
