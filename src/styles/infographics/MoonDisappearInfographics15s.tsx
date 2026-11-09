import React from "react";
import { Icon } from "@iconify/react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  AnimatedBarChart,
  CameraRig,
  FlatIconCard,
} from "./InfographicsElements";

/**
 * Kịch bản 15s (450 frames @ 30fps): "Điều gì xảy ra nếu Mặt Trăng biến mất?"
 * Dựng theo CÁCH 2: Phong cách The Infographics Show / Vox
 * - Đại cảnh Infographic chia làm 3 Khu vực (Zones) trên một Canvas lớn
 * - CameraRig tự động Zoom In & Pan mượt mà qua từng Zone theo đúng nhịp giọng đọc
 * - Kết hợp kho Icon SVG phẳng (@iconify/react) + Biểu đồ số liệu D3.js + Hiệu ứng Spring
 */
export const MoonDisappearInfographics15s: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- ZONE 1 ANIMATIONS (0s - 5s | Frame 0 - 150) ---
  const zone1Pop = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const moonOrbitAngle = frame * 1.8;
  const moonVanishScale = interpolate(frame, [72, 92], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const alertPop = spring({
    frame: frame - 75,
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  // --- ZONE 3 ANIMATIONS (10s - 15s | Frame 300 - 450) ---
  const wobbleAngle =
    frame < 310 ? 23.5 : 23.5 + Math.sin((frame - 310) * 0.28) * 23.5;

  const zone3Pop = spring({
    frame: frame - 295,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // --- SUBTITLE THEO GIÂY ---
  let subtitleText = "";
  if (frame < 72) {
    subtitleText =
      "🎙️ [0.0s - 2.5s]: Mặt Trăng giữ cân bằng cho Trái Đất suốt 4.5 tỷ năm...";
  } else if (frame < 150) {
    subtitleText =
      "🎙️ [2.5s - 5.0s]: Nhưng nếu đêm nay nó đột ngột BIẾN MẤT thì sao?";
  } else if (frame < 225) {
    subtitleText =
      "🎙️ [5.0s - 7.5s]: Đầu tiên, thủy triều đại dương lập tức sụt giảm 75%!";
  } else if (frame < 300) {
    subtitleText =
      "🎙️ [7.5s - 10.0s]: Và không còn Mặt Trăng hãm phanh, 1 ngày chỉ còn 6 đến 8 tiếng!";
  } else if (frame < 375) {
    subtitleText =
      "🎙️ [10.0s - 12.5s]: Tệ nhất là trục Trái Đất sẽ chao đảo hỗn loạn...";
  } else {
    subtitleText =
      "🎙️ [12.5s - 15.0s]: ...khiến các mùa biến mất, thay bằng băng giá và siêu bão!";
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b1120",
        backgroundImage:
          "radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.12), transparent 70%), linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 64px 64px, 64px 64px",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* CAMERA RIG ĐIỀU KHIỂN ZOOM & PAN QUA 3 KHU VỰC */}
      <CameraRig
        keyframes={[
          // 0.0s - 0.8s: Mở đầu toàn cảnh tiêu đề
          { frame: 0, focusX: 960, focusY: 480, zoom: 1.0 },
          // 0.8s - 5.0s: Zoom In vào Zone 1 (Trái trên - Mặt Trăng biến mất)
          { frame: 22, focusX: 520, focusY: 360, zoom: 1.42 },
          // 5.0s - 10.0s: Pan ngang sang Zone 2 (Phải trên - Biểu đồ D3 Thủy triều & Giờ)
          { frame: 148, focusX: 1400, focusY: 360, zoom: 1.38 },
          // 10.0s - 13.8s: Pan xuống Zone 3 (Dưới giữa - Trục Trái Đất & Khí hậu)
          { frame: 298, focusX: 960, focusY: 790, zoom: 1.35 },
          // 13.8s - 15.0s: Zoom Out toàn cảnh Poster Infographic tổng kết
          { frame: 412, focusX: 960, focusY: 540, zoom: 0.92 },
        ]}
      >
        {/* HEADER TIÊU ĐỀ CHÍNH */}
        <div
          style={{
            position: "absolute",
            top: 22,
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(239, 68, 68, 0.18)",
              border: "2px solid #ef4444",
              color: "#fca5a5",
              padding: "6px 24px",
              borderRadius: 999,
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            The Infographics Style • Kịch Bản Giả Định Khoa Học
          </div>
          <div
            style={{
              color: "#f8fafc",
              fontSize: 48,
              fontWeight: 900,
              marginTop: 8,
              textShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            ĐIỀU GÌ XẢY RA NẾU MẶT TRĂNG BIẾN MẤT?
          </div>
        </div>

        {/* ============================================================
            ZONE 1 (GÓC TRÁI TRÊN): MẶT TRĂNG BIẾN MẤT (0s - 5s)
           ============================================================ */}
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 155,
            width: 800,
            height: 430,
            borderRadius: 32,
            backgroundColor: "rgba(30, 41, 59, 0.85)",
            border:
              frame >= 75 ? "4px solid #ef4444" : "4px solid #38bdf8",
            boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
            transform: `scale(${zone1Pop})`,
            padding: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#94a3b8",
                fontSize: 22,
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              01. Hệ Hấpẫn Trái Đất - Mặt Trăng
            </span>
            <span
              style={{
                backgroundColor: frame >= 75 ? "#ef4444" : "#22c55e",
                color: "#ffffff",
                padding: "6px 18px",
                borderRadius: 999,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              {frame >= 75 ? "⚠️ ĐÃ BIẾN MẤT!" : "✓ ỔN ĐỊNH 4.5 TỶ NĂM"}
            </span>
          </div>

          {/* Quỹ đạo SVG + Icon Trái Đất & Mặt Trăng */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={740}
              height={300}
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <ellipse
                cx={370}
                cy={155}
                rx={240}
                ry={105}
                fill="none"
                stroke={frame >= 75 ? "#ef4444" : "#38bdf8"}
                strokeWidth={3}
                strokeDasharray="12 10"
                opacity={0.6}
              />
            </svg>

            {/* Icon Trái Đất trung tâm */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <Icon icon="twemoji:globe-showing-americas" width={135} height={135} />
              <span
                style={{
                  color: "#f8fafc",
                  fontWeight: 800,
                  fontSize: 24,
                  marginTop: 8,
                }}
              >
                Trái Đất
              </span>
            </div>

            {/* Icon Mặt Trăng bay trên quỹ đạo rồi biến mất ở 2.5s */}
            <div
              style={{
                position: "absolute",
                left: 370 + Math.cos((moonOrbitAngle * Math.PI) / 180) * 230 - 48,
                top: 155 + Math.sin((moonOrbitAngle * Math.PI) / 180) * 95 - 48,
                transform: `scale(${moonVanishScale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Icon icon="twemoji:full-moon" width={96} height={96} />
              <span
                style={{
                  color: "#fde047",
                  fontWeight: 800,
                  fontSize: 20,
                }}
              >
                Mặt Trăng
              </span>
            </div>

            {/* Biểu tượng Cảnh báo Đỏ bật lên khi Mặt Trăng biến mất */}
            {frame >= 75 && (
              <div
                style={{
                  position: "absolute",
                  right: 55,
                  top: 75,
                  transform: `scale(${alertPop})`,
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                  border: "3px solid #ef4444",
                  borderRadius: 24,
                  padding: "14px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <Icon icon="twemoji:cross-mark" width={54} height={54} />
                <div>
                  <div
                    style={{
                      color: "#fca5a5",
                      fontSize: 22,
                      fontWeight: 900,
                    }}
                  >
                    MẤT LỰC HẤP DẪN
                  </div>
                  <div style={{ color: "#f8fafc", fontSize: 18 }}>
                    Khối lượng = 0 kg
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================
            ZONE 2 (GÓC PHẢI TRÊN): BIỂU ĐỒ D3 THỦY TRIỀU & GIỜ (5s - 10s)
           ============================================================ */}
        <AnimatedBarChart
          x={1400}
          y={370}
          width={800}
          height={430}
          startFrame={150}
          unit="%"
          data={[
            { label: "Thủy Triều Cũ", value: 100, color: "#38bdf8" },
            { label: "Khi Mất Trăng", value: 25, color: "#ef4444" },
            { label: "Tốc Độ Quay", value: 350, color: "#facc15" },
          ]}
        />

        {/* Huy hiệu thông tin nhanh đính kèm Zone 2 */}
        {frame >= 195 && (
          <div
            style={{
              position: "absolute",
              left: 1030,
              top: 170,
              backgroundColor: "#0f172a",
              border: "3px solid #facc15",
              borderRadius: 20,
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              transform: `scale(${spring({
                frame: frame - 195,
                fps,
                config: { damping: 12, stiffness: 150 },
              })})`,
            }}
          >
            <Icon icon="flat-color-icons:alarm-clock" width={46} height={46} />
            <div>
              <div style={{ color: "#facc15", fontSize: 22, fontWeight: 900 }}>
                1 NGÀY = 6 - 8 GIỜ!
              </div>
              <div style={{ color: "#cbd5e1", fontSize: 16 }}>
                Trái Đất quay nhanh gấp 3.5 lần
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            ZONE 3 (KHU VỰC DƯỚI): TRỤC TRÁI ĐẤT & KHÍ HẬU (10s - 15s)
           ============================================================ */}
        {/* Thẻ Băng Giá bên trái */}
        <FlatIconCard
          x={420}
          y={800}
          icon="twemoji:snowflake"
          title="Kỷ Băng Hà (-50°C)"
          subtitle="Đóng băng lục địa bất ngờ"
          accentColor="#38bdf8"
          startFrame={315}
        />

        {/* Trung tâm Zone 3: Quả cầu Trái Đất nghiêng trục hỗn loạn */}
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 800,
            width: 520,
            height: 310,
            borderRadius: 32,
            backgroundColor: "#1e293b",
            border: "4px solid #f97316",
            boxShadow: "0 20px 45px rgba(0,0,0,0.45)",
            transform: `translate(-50%, -50%) scale(${zone3Pop})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              color: "#fdba74",
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            ⚠️ Độ Nghiêng Trục: {Math.abs(wobbleAngle).toFixed(1)}°
          </div>

          <div
            style={{
              position: "relative",
              width: 170,
              height: 170,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${wobbleAngle}deg)`,
            }}
          >
            {/* Thanh trục Bắc - Nam */}
            <div
              style={{
                position: "absolute",
                width: 6,
                height: 210,
                backgroundColor: "#facc15",
                borderRadius: 4,
              }}
            />
            <Icon icon="twemoji:globe-showing-asia-australia" width={130} height={130} />
          </div>

          <div
            style={{
              color: "#f8fafc",
              fontSize: 22,
              fontWeight: 700,
              marginTop: 14,
            }}
          >
            Chao đảo từ 23.5° lên 47°!
          </div>
        </div>

        {/* Thẻ Siêu Bão bên phải */}
        <FlatIconCard
          x={1500}
          y={800}
          icon="twemoji:tornado"
          title="Siêu Bão (+60°C)"
          subtitle="Gió hủy diệt 300 km/h"
          accentColor="#ef4444"
          startFrame={340}
        />
      </CameraRig>

      {/* THANH PHỤ ĐỀ HIỆN ĐẠI Ở ĐÁY MÀN HÌNH */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          border: "2px solid #38bdf8",
          borderRadius: 999,
          padding: "14px 42px",
          color: "#f8fafc",
          fontSize: 32,
          fontWeight: 700,
          boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
          whiteSpace: "nowrap",
        }}
      >
        {subtitleText}
      </div>
    </AbsoluteFill>
  );
};
