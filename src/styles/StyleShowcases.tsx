import React from "react";
import { AbsoluteFill } from "remotion";
import {
  RoughArrow,
  RoughBox,
  RoughCircle,
  RoughCurve,
  RoughLine,
  RoughStickman,
} from "./minute-physics/RoughElements";
import {
  AnimatedBarChart,
  FlatIconCard,
} from "./infographics/InfographicsElements";
import { KurzgesagtPlanet, MorphingPath } from "./kurzgesagt/KurzgesagtElements";
import {
  HudGlowFilter,
  RadarSweep,
  TechBox,
} from "./scifi-hud/SciFiHudElements";

/**
 * STYLE 1: MinutePhysics (Whiteboard / Chalkboard Sketch)
 */
export const Style1Showcase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#141820",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 0)",
        backgroundSize: "32px 32px",
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 38,
          left: 60,
          color: "#ffd166",
          fontSize: 44,
          fontWeight: "bold",
        }}
      >
        Style 1: MinutePhysics (Rough.js Hand-Drawn SVG Sketch)
      </div>

      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {/* Người que giải thích */}
        <RoughStickman
          x={320}
          y={580}
          scale={1.55}
          pose="point-right"
          startFrame={-60}
          durationInFrames={10}
          stroke="#ffffff"
          label="Nhà Vật Lý"
        />

        <RoughArrow
          x1={500}
          y1={500}
          x2={750}
          y2={500}
          startFrame={-60}
          durationInFrames={10}
          stroke="#ffd166"
        />

        {/* Phễu trọng trường Lỗ Đen vẽ tay */}
        <RoughCircle
          cx={1050}
          cy={370}
          diameter={380}
          startFrame={-60}
          durationInFrames={10}
          stroke="#4ea8de"
          fill="rgba(78, 168, 222, 0.18)"
          seed={15}
        />
        <RoughCurve
          points={[
            [860, 370],
            [980, 520],
            [1020, 780],
          ]}
          startFrame={-60}
          durationInFrames={10}
          stroke="#ffffff"
          strokeWidth={4.5}
          seed={21}
        />
        <RoughCurve
          points={[
            [1240, 370],
            [1120, 520],
            [1080, 780],
          ]}
          startFrame={-60}
          durationInFrames={10}
          stroke="#ffffff"
          strokeWidth={4.5}
          seed={22}
        />
        <RoughCircle
          cx={1050}
          cy={790}
          diameter={90}
          startFrame={-60}
          durationInFrames={10}
          stroke="#ff6b6b"
          fill="rgba(255, 107, 107, 0.45)"
          seed={30}
        />

        <text
          x={1050}
          y={290}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={36}
          fontWeight="bold"
        >
          Chân trời sự kiện (Event Horizon)
        </text>
        <text
          x={1050}
          y={890}
          textAnchor="middle"
          fill="#ff6b6b"
          fontSize={38}
          fontWeight="bold"
        >
          Điểm Kỳ Dị (Singularity)
        </text>

        {/* Bảng công thức đóng khung bên phải */}
        <RoughBox
          x={1360}
          y={360}
          width={450}
          height={280}
          startFrame={-60}
          durationInFrames={10}
          stroke="#ffd166"
          fill="rgba(255, 209, 102, 0.12)"
          seed={99}
        />
        <text
          x={1585}
          y={465}
          textAnchor="middle"
          fill="#ffd166"
          fontSize={40}
          fontWeight="bold"
        >
          Bán kính Schwarzschild:
        </text>
        <text
          x={1585}
          y={565}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={58}
          fontWeight="bold"
        >
          Rs = 2GM / c²
        </text>
        <RoughLine
          x1={1430}
          y1={595}
          x2={1740}
          y2={595}
          startFrame={-60}
          durationInFrames={10}
          stroke="#ff6b6b"
          strokeWidth={5}
        />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * STYLE 2: The Infographics Show (Flat Vector + D3 Chart)
 */
export const Style2Showcase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        backgroundImage:
          "linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 38,
          left: 60,
          color: "#38bdf8",
          fontSize: 42,
          fontWeight: 900,
        }}
      >
        Style 2: The Infographics Show (Flat Vector Icons + D3 Chart)
      </div>

      <FlatIconCard
        x={340}
        y={370}
        icon="twemoji:sun"
        title="Mặt Trời (Sun)"
        subtitle="Đường kính: 1.39 Triệu km"
        accentColor="#facc15"
        startFrame={-60}
      />
      <FlatIconCard
        x={340}
        y={740}
        icon="twemoji:milky-way"
        title="Lỗ Đen Siêu Khối Lượng"
        subtitle="Lực hút gấp 4 Triệu lần Mặt Trời"
        accentColor="#a855f7"
        startFrame={-60}
      />

      <AnimatedBarChart
        x={1240}
        y={560}
        width={1080}
        height={640}
        startFrame={-60}
        unit=" km/s"
        data={[
          { label: "Trái Đất (Thoát)", value: 11, color: "#38bdf8" },
          { label: "Mặt Trời", value: 618, color: "#facc15" },
          { label: "Sao Neutron", value: 150000, color: "#a855f7" },
          { label: "Lỗ Đen (> Ánh sáng)", value: 300000, color: "#ef4444" },
        ]}
      />
    </AbsoluteFill>
  );
};

/**
 * STYLE 3: Kurzgesagt – In a Nutshell (Vibrant Organic Vector & Morphing)
 */
export const Style3Showcase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#090621",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <defs>
          <radialGradient id="kurz-accretion" cx="50%" cy="50%" r="50%">
            <stop offset="28%" stopColor="#000000" />
            <stop offset="36%" stopColor="#fff3b0" />
            <stop offset="52%" stopColor="#ffb703" />
            <stop offset="72%" stopColor="#f72585" />
            <stop offset="92%" stopColor="#7209b7" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#090621" stopOpacity={0} />
          </radialGradient>
          <linearGradient id="kurz-beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4cc9f0" stopOpacity={0} />
            <stop offset="50%" stopColor="#4cc9f0" stopOpacity={0.85} />
            <stop offset="100%" stopColor="#4cc9f0" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Các ngôi sao đặc trưng Kurzgesagt */}
        {[
          [180, 220, 6],
          [340, 820, 8],
          [1650, 190, 9],
          [1740, 740, 6],
          [1480, 880, 10],
          [620, 160, 7],
          [260, 480, 5],
        ].map(([sx, sy, sr], idx) => (
          <circle
            key={idx}
            cx={sx}
            cy={sy}
            r={sr}
            fill={idx % 2 === 0 ? "#4cc9f0" : "#f72585"}
            opacity={0.85}
          />
        ))}

        {/* Tia Relativistic Jet dọc */}
        <rect x={935} y={40} width={50} height={1000} fill="url(#kurz-beam)" />

        {/* Đĩa bồi tụ (Accretion Disk) rực rỡ */}
        <circle cx={960} cy={540} r={410} fill="url(#kurz-accretion)" />
        <ellipse
          cx={960}
          cy={540}
          rx={470}
          ry={125}
          fill="none"
          stroke="#ffb703"
          strokeWidth={28}
          opacity={0.85}
        />
        <ellipse
          cx={960}
          cy={540}
          rx={530}
          ry={155}
          fill="none"
          stroke="#f72585"
          strokeWidth={18}
          opacity={0.75}
        />

        {/* Lõi Lỗ Đen */}
        <circle
          cx={960}
          cy={540}
          r={145}
          fill="#050214"
          stroke="#ffffff"
          strokeWidth={8}
        />

        {/* Hành tinh Kurzgesagt bên trái & Vật chất biến hình bằng Flubber bên phải */}
        <KurzgesagtPlanet
          cx={340}
          cy={420}
          radius={95}
          planetColor="#4361ee"
          atmosphereColor="#4cc9f0"
          startFrame={-60}
        />

        <g transform="translate(1380, 310)">
          <MorphingPath
            pathA="M 120 40 C 190 40 240 90 240 160 C 240 230 190 280 120 280 C 50 280 0 230 0 160 C 0 90 50 40 120 40 Z"
            pathB="M 120 10 C 220 30 280 120 210 190 C 160 240 250 310 110 290 C 10 270 -30 180 30 110 C 70 60 40 -5 120 10 Z"
            startFrame={-14}
            durationInFrames={20}
            fill="#f72585"
          />
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          top: 38,
          left: 60,
          color: "#ffffff",
          fontSize: 42,
          fontWeight: 900,
          letterSpacing: 1,
        }}
      >
        Style 3: Kurzgesagt Style (Vibrant Vector Gradients + Flubber Morph)
      </div>
    </AbsoluteFill>
  );
};

/**
 * STYLE 4: STEM & Math Visualization (3Blue1Brown Style)
 */
export const Style4Showcase: React.FC = () => {
  // Tạo đường cong hàm sóng truyền qua lưới tọa độ
  const wavePoints: string[] = [];
  const envelopeTop: string[] = [];
  const envelopeBottom: string[] = [];
  for (let x = 160; x <= 1760; x += 8) {
    const norm = (x - 960) / 320;
    const env = 260 * Math.exp(-norm * norm * 0.65);
    const y = 580 - env * Math.cos(norm * 6.5);
    wavePoints.push(`${x === 160 ? "M" : "L"} ${x} ${y.toFixed(1)}`);
    envelopeTop.push(`${x === 160 ? "M" : "L"} ${x} ${(580 - env).toFixed(1)}`);
    envelopeBottom.push(
      `${x === 160 ? "M" : "L"} ${x} ${(580 + env).toFixed(1)}`,
    );
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050508",
        fontFamily: "'Cambria Math', 'Times New Roman', serif",
      }}
    >
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {/* Lưới tọa độ 3Blue1Brown */}
        {Array.from({ length: 25 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 80}
            y1={0}
            x2={i * 80}
            y2={1080}
            stroke={i === 12 ? "#4ea8de" : "rgba(78, 168, 222, 0.16)"}
            strokeWidth={i === 12 ? 3 : 1.5}
          />
        ))}
        {Array.from({ length: 15 }).map((_, j) => (
          <line
            key={`h-${j}`}
            x1={0}
            y1={j * 80 + 20}
            x2={1920}
            y2={j * 80 + 20}
            stroke={j === 7 ? "#4ea8de" : "rgba(78, 168, 222, 0.16)"}
            strokeWidth={j === 7 ? 3 : 1.5}
          />
        ))}

        {/* Đường bao Gaussian (Envelope) */}
        <path
          d={envelopeTop.join(" ")}
          fill="none"
          stroke="#f72585"
          strokeWidth={3}
          strokeDasharray="10 10"
          opacity={0.85}
        />
        <path
          d={envelopeBottom.join(" ")}
          fill="none"
          stroke="#f72585"
          strokeWidth={3}
          strokeDasharray="10 10"
          opacity={0.85}
        />

        {/* Hàm sóng lượng tử Wave Packet */}
        <path
          d={wavePoints.join(" ")}
          fill="none"
          stroke="#ffe66d"
          strokeWidth={6}
        />

        {/* Các vector đạo hàm tiếp tuyến */}
        {[-1.2, -0.5, 0, 0.5, 1.2].map((n, idx) => {
          const px = 960 + n * 320;
          const py = 580 - 260 * Math.exp(-n * n * 0.65) * Math.cos(n * 6.5);
          return (
            <g key={idx}>
              <circle cx={px} cy={py} r={9} fill="#80ffdb" />
              <line
                x1={px}
                y1={580}
                x2={px}
                y2={py}
                stroke="#80ffdb"
                strokeWidth={3}
              />
            </g>
          );
        })}

        {/* Hộp công thức toán học */}
        <rect
          x={1160}
          y={110}
          width={680}
          height={170}
          rx={16}
          fill="rgba(5, 5, 8, 0.88)"
          stroke="#4ea8de"
          strokeWidth={2.5}
        />
        <text
          x={1500}
          y={180}
          textAnchor="middle"
          fill="#ffe66d"
          fontSize={46}
          fontStyle="italic"
        >
          ψ(x, t) = A · e^(-x² / 2σ²) · cos(kx - ωt)
        </text>
        <text
          x={1500}
          y={245}
          textAnchor="middle"
          fill="#80ffdb"
          fontSize={30}
        >
          Biến đổi Fourier & Bó sóng Lượng tử (Wave Packet)
        </text>
      </svg>

      <div
        style={{
          position: "absolute",
          top: 38,
          left: 60,
          color: "#ffffff",
          fontSize: 42,
          fontWeight: "bold",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Style 4: STEM & Math Visualization (3Blue1Brown Coordinate Grid)
      </div>
    </AbsoluteFill>
  );
};

/**
 * STYLE 5: Cyberpunk / Sci-fi HUD Telemetry
 */
export const Style5Showcase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020b14",
        backgroundImage:
          "linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        fontFamily: "monospace",
      }}
    >
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <HudGlowFilter id="hud-glow" color="#00f0ff" />

        {/* Radar trung tâm */}
        <RadarSweep
          cx={960}
          cy={560}
          radius={310}
          stroke="#00f0ff"
          speedMultiplier={1.5}
        />

        {/* Vòng tròn khóa mục tiêu */}
        <circle
          cx={1060}
          cy={450}
          r={38}
          fill="none"
          stroke="#ff2a6d"
          strokeWidth={3}
          strokeDasharray="8 6"
        />
        <text
          x={1115}
          y={455}
          fill="#ff2a6d"
          fontSize={22}
          fontWeight="bold"
        >
          TARGET LOCKED [SGR A*]
        </text>

        {/* Bảng Telemetry bên trái */}
        <TechBox
          x={90}
          y={190}
          width={460}
          height={340}
          title="Orbital Telemetry"
          accentColor="#00f0ff"
          startFrame={-60}
        >
          <text x={120} y={270} fill="#e0fbfc" fontSize={24}>
            VELOCITY : 299,792 km/s
          </text>
          <text x={120} y={320} fill="#39ff14" fontSize={24}>
            GRAVITY  : 9.84 x 10¹² G
          </text>
          <text x={120} y={370} fill="#fee715" fontSize={24}>
            RADIATION: CRITICAL [98.4%]
          </text>
          {/* Thanh bar năng lượng */}
          <rect
            x={120}
            y={415}
            width={400}
            height={28}
            fill="rgba(0,240,255,0.15)"
            stroke="#00f0ff"
          />
          <rect x={124} y={419} width={360} height={20} fill="#00f0ff" />
        </TechBox>

        {/* Bảng Waveform bên phải */}
        <TechBox
          x={1370}
          y={190}
          width={460}
          height={340}
          title="Gravitational Wave"
          accentColor="#39ff14"
          startFrame={-60}
        >
          <polyline
            points="1400,370 1440,360 1480,380 1520,290 1560,450 1600,240 1640,490 1680,320 1720,390 1790,370"
            fill="none"
            stroke="#39ff14"
            strokeWidth={4}
            filter="url(#hud-glow)"
          />
          <text x={1400} y={485} fill="#39ff14" fontSize={22}>
            STATUS: SIGNAL DETECTED
          </text>
        </TechBox>

        {/* Khung cảnh báo bên dưới */}
        <TechBox
          x={90}
          y={600}
          width={460}
          height={290}
          title="Core Diagnostics"
          accentColor="#ff2a6d"
          startFrame={-60}
        >
          <text x={120} y={690} fill="#ff2a6d" fontSize={28} fontWeight="bold">
            [!] EVENT HORIZON BREACH
          </text>
          <text x={120} y={745} fill="#e0fbfc" fontSize={22}>
            TIME DILATION: 1h = 7 YEARS
          </text>
          <text x={120} y={800} fill="#00f0ff" fontSize={22}>
            QUANTUM SHIELD: ONLINE
          </text>
        </TechBox>
      </svg>

      <div
        style={{
          position: "absolute",
          top: 38,
          left: 60,
          color: "#00f0ff",
          fontSize: 40,
          fontWeight: "bold",
          textShadow: "0 0 16px rgba(0,240,255,0.7)",
        }}
      >
        Style 5: Cyberpunk / Sci-Fi HUD Telemetry (SVG Glow + Radar)
      </div>
    </AbsoluteFill>
  );
};

/**
 * Helper vẽ khối hộp 3D Isometric bằng tọa độ trục đo 30 độ
 */
const IsoCube: React.FC<{
  cx: number;
  cy: number;
  size: number;
  height: number;
  topColor: string;
  leftColor: string;
  rightColor: string;
  label?: string;
  sublabel?: string;
}> = ({
  cx,
  cy,
  size,
  height,
  topColor,
  leftColor,
  rightColor,
  label,
  sublabel,
}) => {
  const dx = size * Math.cos(Math.PI / 6);
  const dy = size * Math.sin(Math.PI / 6);

  const topPoints = `${cx},${cy - dy * 2} ${cx + dx},${cy - dy} ${cx},${cy} ${cx - dx},${cy - dy}`;
  const leftPoints = `${cx - dx},${cy - dy} ${cx},${cy} ${cx},${cy + height} ${cx - dx},${cy - dy + height}`;
  const rightPoints = `${cx},${cy} ${cx + dx},${cy - dy} ${cx + dx},${cy - dy + height} ${cx},${cy + height}`;

  return (
    <g>
      {/* Bóng đổ dưới chân */}
      <polygon
        points={`${cx},${cy + height + 18} ${cx + dx * 1.1},${cy - dy + height + 18} ${cx},${cy - dy * 2 + height + 18} ${cx - dx * 1.1},${cy - dy + height + 18}`}
        fill="rgba(0,0,0,0.35)"
      />
      <polygon
        points={leftPoints}
        fill={leftColor}
        stroke="#0f172a"
        strokeWidth={2}
      />
      <polygon
        points={rightPoints}
        fill={rightColor}
        stroke="#0f172a"
        strokeWidth={2}
      />
      <polygon
        points={topPoints}
        fill={topColor}
        stroke="#e2e8f0"
        strokeWidth={2}
      />
      {label && (
        <text
          x={cx}
          y={cy - dy * 2 - 28}
          textAnchor="middle"
          fill="#f8fafc"
          fontSize={28}
          fontWeight={800}
        >
          {label}
        </text>
      )}
      {sublabel && (
        <text
          x={cx}
          y={cy + height + 54}
          textAnchor="middle"
          fill="#38bdf8"
          fontSize={22}
          fontWeight={700}
        >
          {sublabel}
        </text>
      )}
    </g>
  );
};

/**
 * STYLE 6: Isometric 3D Vector (System Architecture & Cloud Nodes)
 */
export const Style6Showcase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b132b",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {/* Mặt phẳng đế Isometric */}
        <polygon
          points="960,190 1720,570 960,950 200,570"
          fill="#1c2541"
          stroke="#3a506b"
          strokeWidth={4}
        />

        {/* Đường ống dẫn dữ liệu Isometric */}
        <polyline
          points="560,520 960,340 1360,520"
          fill="none"
          stroke="#4cc9f0"
          strokeWidth={8}
          strokeDasharray="16 10"
        />
        <polyline
          points="560,520 960,720 1360,520"
          fill="none"
          stroke="#f72585"
          strokeWidth={8}
          strokeDasharray="16 10"
        />

        {/* Node 1: AI Ingestion Cluster (Trái) */}
        <IsoCube
          cx={540}
          cy={500}
          size={130}
          height={140}
          topColor="#60a5fa"
          leftColor="#2563eb"
          rightColor="#1d4ed8"
          label="1. Data Ingestion"
          sublabel="10 GB/s Stream"
        />

        {/* Node 2: Central Neural Engine (Giữa - Cao nhất, 2 tầng) */}
        <IsoCube
          cx={960}
          cy={380}
          size={165}
          height={210}
          topColor="#c084fc"
          leftColor="#9333ea"
          rightColor="#6b21a8"
        />
        <IsoCube
          cx={960}
          cy={270}
          size={125}
          height={90}
          topColor="#f472b6"
          leftColor="#db2777"
          rightColor="#9d174d"
          label="2. AI Core Engine (GPU Cluster)"
        />

        {/* Node 3: Vector Database (Dưới) */}
        <IsoCube
          cx={960}
          cy={710}
          size={130}
          height={115}
          topColor="#34d399"
          leftColor="#059669"
          rightColor="#047857"
          sublabel="3. Vector DB Storage"
        />

        {/* Node 4: Video Render Output (Phải) */}
        <IsoCube
          cx={1380}
          cy={500}
          size={130}
          height={140}
          topColor="#fbbf24"
          leftColor="#d97706"
          rightColor="#b45309"
          label="4. Remotion Farm"
          sublabel="60 FPS MP4 Output"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 38,
          left: 60,
          color: "#ffffff",
          fontSize: 42,
          fontWeight: 900,
        }}
      >
        Style 6: Isometric 3D Vector (30° Projection System Architecture)
      </div>
    </AbsoluteFill>
  );
};

/**
 * STYLE 7: Kinetic Typography & Paper Collage (Vox / Johnny Harris Style)
 */
export const Style7Showcase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f4f1ea",
        backgroundImage:
          "radial-gradient(#cbd5e1 1.5px, transparent 1.5px), linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
        backgroundSize: "24px 24px, 96px 96px, 96px 96px",
        fontFamily: "'Arial Black', 'Inter', sans-serif",
      }}
    >
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {/* Khối băng keo dán giấy & vệt bút dạ quang vàng */}
        <g transform="translate(130, 210) rotate(-2)">
          <rect
            x={14}
            y={14}
            width={920}
            height={170}
            fill="#0f172a"
          />
          <rect
            x={0}
            y={0}
            width={920}
            height={170}
            fill="#fef08a"
            stroke="#0f172a"
            strokeWidth={6}
          />
          <text
            x={460}
            y={112}
            textAnchor="middle"
            fill="#0f172a"
            fontSize={82}
            fontWeight={900}
          >
            SỰ THẬT VỀ LỖ ĐEN
          </text>
        </g>

        {/* Chữ Kinetic khổng lồ xếp tầng */}
        <text
          x={140}
          y={540}
          fill="#0f172a"
          fontSize={118}
          fontWeight={900}
          letterSpacing={-3}
        >
          KHÔNG GIAN
        </text>

        {/* Vệt highlight đỏ cam gạch dưới chữ */}
        <path
          d="M 135 585 Q 520 565 920 590 L 910 725 Q 520 705 145 720 Z"
          fill="#ef4444"
        />
        <text
          x={155}
          y={692}
          fill="#ffffff"
          fontSize={106}
          fontWeight={900}
        >
          BỊ BẺ CONG!
        </text>

        {/* Thẻ cắt giấy (Paper Cutout Collage Card) bên phải */}
        <g transform="translate(1160, 230) rotate(3)">
          {/* Bóng cứng kiểu cắt giấy */}
          <polygon
            points="25,25 625,15 640,635 15,645"
            fill="#0f172a"
          />
          {/* Viền giấy trắng cắt răng cưa nhẹ */}
          <polygon
            points="0,0 600,-10 615,610 -10,620"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth={6}
          />
          {/* Nội dung đồ họa bên trong mảnh giấy cắt */}
          <rect
            x={35}
            y={35}
            width={530}
            height={360}
            fill="#0f172a"
          />
          <circle
            cx={300}
            cy={215}
            r={110}
            fill="#f97316"
          />
          <circle
            cx={300}
            cy={215}
            r={62}
            fill="#0f172a"
            stroke="#fef08a"
            strokeWidth={8}
          />
          <text
            x={300}
            y={465}
            textAnchor="middle"
            fill="#0f172a"
            fontSize={38}
            fontWeight={900}
          >
            HÌNH CHỤP M87* (2019)
          </text>
          <text
            x={300}
            y={525}
            textAnchor="middle"
            fill="#475569"
            fontSize={26}
            fontWeight={700}
          >
            Cách Trái Đất 55 triệu năm ánh sáng
          </text>
          {/* Miếng băng dính vàng trên đỉnh ảnh */}
          <rect
            x={210}
            y={-28}
            width={180}
            height={52}
            fill="rgba(254, 240, 138, 0.85)"
            stroke="#0f172a"
            strokeWidth={3}
            transform="rotate(-4 300 0)"
          />
        </g>

        {/* Nhãn chú thích kiểu báo chí Vox ở góc dưới */}
        <rect
          x={140}
          y={815}
          width={830}
          height={110}
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth={5}
        />
        <text
          x={175}
          y={882}
          fill="#0f172a"
          fontSize={36}
          fontWeight={800}
        >
          📌 NGUỒN: THUYẾT TƯƠNG ĐỐI RỘNG (1915)
        </text>
      </svg>

      <div
        style={{
          position: "absolute",
          top: 32,
          left: 60,
          backgroundColor: "#0f172a",
          color: "#fef08a",
          padding: "8px 24px",
          fontSize: 34,
          fontWeight: 900,
        }}
      >
        Style 7: Kinetic Typography & Paper Collage (Vox / Johnny Harris Style)
      </div>
    </AbsoluteFill>
  );
};
