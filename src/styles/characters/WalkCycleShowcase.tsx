import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
} from "remotion";

export interface WalkKinematics {
  // Hip & Body
  hipX: number;
  hipY: number;
  torsoAngle: number;
  headX: number;
  headY: number;

  // Left Leg (Front)
  kneeLX: number;
  kneeLY: number;
  ankleLX: number;
  ankleLY: number;
  toeLX: number;
  toeLY: number;
  heelLX: number;
  heelLY: number;

  // Right Leg (Back)
  kneeRX: number;
  kneeRY: number;
  ankleRX: number;
  ankleRY: number;
  toeRX: number;
  toeRY: number;
  heelRX: number;
  heelRY: number;

  // Left Arm (Front)
  shoulderLX: number;
  shoulderLY: number;
  elbowLX: number;
  elbowLY: number;
  handLX: number;
  handLY: number;

  // Right Arm (Back)
  shoulderRX: number;
  shoulderRY: number;
  elbowRX: number;
  elbowRY: number;
  handRX: number;
  handRY: number;

  // Shadow
  shadowScaleX: number;
  shadowOpacity: number;
}

/**
 * Tính toán toàn bộ khớp xương (Inverse & Forward Kinematics) của dáng đi 2D
 */
export function calculateWalkPose(
  originX: number,
  groundY: number,
  progress: number, // 0 -> 1 for one full cycle (2 steps)
  scale: number = 1.0
): WalkKinematics {
  const phi = progress * 2 * Math.PI;

  // Chiều dài các chi
  const THIGH_LEN = 84 * scale;
  const SHIN_LEN = 82 * scale;
  const FOOT_HEEL = 16 * scale;
  const FOOT_TOE = 34 * scale;
  const TORSO_LEN = 110 * scale;
  const HEAD_RAD = 38 * scale;
  const UPPER_ARM = 68 * scale;
  const FOREARM = 64 * scale;

  // Độ nhún người (Vertical Bounce - nhún 2 lần mỗi chu kỳ)
  const bounce = -Math.cos(2 * phi) * 11 * scale;
  const hipX = originX;
  const hipY = groundY - (THIGH_LEN + SHIN_LEN - 8 * scale) + bounce;

  // Góc nghiêng thân người (Leaning forward)
  const torsoAngle = 0.07 + Math.sin(phi) * 0.025; // radians

  // Vị trí cổ / vai
  const neckX = hipX + Math.sin(torsoAngle) * TORSO_LEN;
  const neckY = hipY - Math.cos(torsoAngle) * TORSO_LEN;

  // Đầu
  const headBob = Math.sin(2 * phi - 0.4) * 3 * scale;
  const headX = neckX + Math.sin(torsoAngle) * (HEAD_RAD + 8 * scale);
  const headY = neckY - Math.cos(torsoAngle) * (HEAD_RAD + 8 * scale) + headBob;

  // Helper tính toán 1 chân
  const solveLeg = (t: number) => {
    // Góc đùi
    const thighAngle = Math.sin(t) * 0.52; // ~30 độ max
    const kneeX = hipX + Math.sin(thighAngle) * THIGH_LEN;
    const kneeY = hipY + Math.cos(thighAngle) * THIGH_LEN;

    // Góc cẳng chân (co gối khi chân lăng về phía trước)
    const swingPhase = Math.max(0, -Math.sin(t - 0.25));
    const kneeBend = 0.08 + Math.pow(swingPhase, 1.4) * 0.98;
    const shinAngle = thighAngle - kneeBend;

    const ankleX = kneeX + Math.sin(shinAngle) * SHIN_LEN;
    const ankleY = kneeY + Math.cos(shinAngle) * SHIN_LEN;

    // Góc bàn chân
    const footAngle = Math.sin(t) * 0.28 - swingPhase * 0.22;
    const heelX = ankleX - Math.cos(footAngle) * FOOT_HEEL;
    const heelY = ankleY + Math.sin(footAngle) * FOOT_HEEL;
    const toeX = ankleX + Math.cos(footAngle) * FOOT_TOE;
    const toeY = ankleY - Math.sin(footAngle) * FOOT_TOE;

    return { kneeX, kneeY, ankleX, ankleY, heelX, heelY, toeX, toeY };
  };

  // Chân Trái (Front) & Chân Phải (Back - lệch pha 180 độ / PI)
  const legL = solveLeg(phi);
  const legR = solveLeg(phi + Math.PI);

  // Helper tính toán 1 tay (vung ngược pha với chân cùng bên)
  const solveArm = (t: number, shoulderOffset: number) => {
    const shoulderX = neckX + shoulderOffset;
    const shoulderY = neckY + 12 * scale;

    const upperArmAngle = -Math.sin(t) * 0.44; // Vung tay đối xứng
    const elbowX = shoulderX + Math.sin(upperArmAngle) * UPPER_ARM;
    const elbowY = shoulderY + Math.cos(upperArmAngle) * UPPER_ARM;

    // Cẳng tay hơi gập ở khuỷu
    const elbowBend = 0.35 + Math.max(0, -Math.sin(t)) * 0.45;
    const forearmAngle = upperArmAngle + elbowBend;

    const handX = elbowX + Math.sin(forearmAngle) * FOREARM;
    const handY = elbowY + Math.cos(forearmAngle) * FOREARM;

    return { shoulderX, shoulderY, elbowX, elbowY, handX, handY };
  };

  const armL = solveArm(phi, 6 * scale); // Tay trái (Front)
  const armR = solveArm(phi + Math.PI, -6 * scale); // Tay phải (Back)

  // Bóng đổ dưới sàn
  const shadowScaleX = 1.0 + Math.cos(2 * phi) * 0.15;
  const shadowOpacity = 0.4 + Math.cos(2 * phi) * 0.12;

  return {
    hipX,
    hipY,
    torsoAngle,
    headX,
    headY,
    kneeLX: legL.kneeX,
    kneeLY: legL.kneeY,
    ankleLX: legL.ankleX,
    ankleLY: legL.ankleY,
    heelLX: legL.heelX,
    heelLY: legL.heelY,
    toeLX: legL.toeX,
    toeLY: legL.toeY,

    kneeRX: legR.kneeX,
    kneeRY: legR.kneeY,
    ankleRX: legR.ankleX,
    ankleRY: legR.ankleY,
    heelRX: legR.heelX,
    heelRY: legR.heelY,
    toeRX: legR.toeX,
    toeRY: legR.toeY,

    shoulderLX: armL.shoulderX,
    shoulderLY: armL.shoulderY,
    elbowLX: armL.elbowX,
    elbowLY: armL.elbowY,
    handLX: armL.handX,
    handLY: armL.handY,

    shoulderRX: armR.shoulderX,
    shoulderRY: armR.shoulderY,
    elbowRX: armR.elbowX,
    elbowRY: armR.elbowY,
    handRX: armR.handX,
    handRY: armR.handY,

    shadowScaleX,
    shadowOpacity,
  };
}

/**
 * 1. NHÂN VẬT VECTOR PHẲNG HIỆN ĐẠI (Flat Vector Character - Kurzgesagt / Vox style)
 */
export const FlatVectorWalker: React.FC<{
  pose: WalkKinematics;
  groundY: number;
  hoodieColor?: string;
  pantsColor?: string;
  shoeColor?: string;
}> = ({
  pose,
  groundY,
  hoodieColor = "#ff7b00",
  pantsColor = "#2b3a4a",
  shoeColor = "#ffffff",
}) => {
  return (
    <g>
      {/* 0. Bóng đổ trên mặt đất */}
      <ellipse
        cx={pose.hipX}
        cy={groundY + 8}
        rx={75 * pose.shadowScaleX}
        ry={14}
        fill="rgba(0, 0, 0, 0.45)"
        opacity={pose.shadowOpacity}
      />

      {/* 1. LAYER SAU CÙNG: TAY PHẢI (Back Arm) */}
      <g stroke="#d96b00" strokeWidth={24} strokeLinecap="round" strokeLinejoin="round">
        <line
          x1={pose.shoulderRX}
          y1={pose.shoulderRY}
          x2={pose.elbowRX}
          y2={pose.elbowRY}
        />
        <line
          x1={pose.elbowRX}
          y1={pose.elbowRY}
          x2={pose.handRX}
          y2={pose.handRY}
        />
      </g>
      {/* Bàn tay phải */}
      <circle cx={pose.handRX} cy={pose.handRY} r={14} fill="#f6d5b8" />

      {/* 2. CHÂN PHẢI (Back Leg - tối hơn tạo chiều sâu 3D) */}
      <g stroke="#1e293b" strokeWidth={26} strokeLinecap="round" strokeLinejoin="round">
        <line x1={pose.hipX} y1={pose.hipY} x2={pose.kneeRX} y2={pose.kneeRY} />
        <line x1={pose.kneeRX} y1={pose.kneeRY} x2={pose.ankleRX} y2={pose.ankleRY} />
      </g>
      {/* Giày phải */}
      <polygon
        points={`
          ${pose.heelRX - 6},${pose.heelRY + 4}
          ${pose.ankleRX},${pose.ankleRY - 12}
          ${pose.toeRX + 8},${pose.toeRY + 6}
          ${pose.toeRX + 4},${pose.toeRY + 16}
          ${pose.heelRX - 8},${pose.heelRY + 14}
        `}
        fill="#e2e8f0"
        stroke="#94a3b8"
        strokeWidth={3}
      />

      {/* 3. THÂN NGƯỜI (Torso / Áo Hoodie) */}
      <g>
        {/* Phần hông / Đai quần */}
        <ellipse
          cx={pose.hipX}
          cy={pose.hipY}
          rx={34}
          ry={16}
          fill={pantsColor}
        />
        {/* Áo Hoodie */}
        <polygon
          points={`
            ${pose.shoulderLX - 24},${pose.shoulderLY}
            ${pose.shoulderLX + 28},${pose.shoulderLY}
            ${pose.hipX + 32},${pose.hipY + 6}
            ${pose.hipX - 32},${pose.hipY + 6}
          `}
          fill={hoodieColor}
          stroke="#e06900"
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {/* Túi trước bụng Hoodie */}
        <path
          d={`M ${pose.hipX - 18} ${pose.hipY - 14} L ${pose.hipX + 18} ${pose.hipY - 14} L ${pose.hipX + 14} ${pose.hipY + 2} L ${pose.hipX - 14} ${pose.hipY + 2} Z`}
          fill="#e06900"
          opacity={0.7}
        />
        {/* Dây rút mũ hoodie */}
        <line
          x1={pose.shoulderLX - 6}
          y1={pose.shoulderLY + 8}
          x2={pose.shoulderLX - 8}
          y2={pose.shoulderLY + 38}
          stroke="#ffffff"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <line
          x1={pose.shoulderLX + 4}
          y1={pose.shoulderLY + 8}
          x2={pose.shoulderLX + 6}
          y2={pose.shoulderLY + 42}
          stroke="#ffffff"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </g>

      {/* 4. ĐẦU & MẶT (Head / Face / Mũ Lưỡi Trai) */}
      <g>
        {/* Cổ */}
        <line
          x1={pose.hipX}
          y1={pose.shoulderLY + 10}
          x2={pose.headX}
          y2={pose.headY + 20}
          stroke="#f6d5b8"
          strokeWidth={20}
          strokeLinecap="round"
        />
        {/* Khuôn mặt */}
        <circle cx={pose.headX} cy={pose.headY} r={34} fill="#f6d5b8" />
        {/* Mũ Beanie / Cap đội ngược phong cách trẻ trung */}
        <path
          d={`M ${pose.headX - 36} ${pose.headY - 6} A 36 36 0 0 1 ${pose.headX + 36} ${pose.headY - 6} Z`}
          fill="#0f172a"
        />
        {/* Lưỡi trai quay về sau */}
        <path
          d={`M ${pose.headX - 34} ${pose.headY - 4} Q ${pose.headX - 58} ${pose.headY + 4} ${pose.headX - 52} ${pose.headY - 12} Z`}
          fill="#0f172a"
        />
        {/* Mắt tròn tối giản */}
        <circle cx={pose.headX + 18} cy={pose.headY - 2} r={4.5} fill="#0f172a" />
        {/* Tai */}
        <circle cx={pose.headX - 14} cy={pose.headY + 4} r={7} fill="#f6d5b8" stroke="#e2b793" strokeWidth={2} />
      </g>

      {/* 5. CHÂN TRÁI (Front Leg - sáng màu hơn) */}
      <g stroke={pantsColor} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round">
        <line x1={pose.hipX} y1={pose.hipY} x2={pose.kneeLX} y2={pose.kneeLY} />
        <line x1={pose.kneeLX} y1={pose.kneeLY} x2={pose.ankleLX} y2={pose.ankleLY} />
      </g>
      {/* Giày Sneaker trái (Màu trắng với sọc cam) */}
      <polygon
        points={`
          ${pose.heelLX - 6},${pose.heelLY + 4}
          ${pose.ankleLX},${pose.ankleLY - 12}
          ${pose.toeLX + 8},${pose.toeLY + 6}
          ${pose.toeLX + 4},${pose.toeLY + 16}
          ${pose.heelLX - 8},${pose.heelLY + 14}
        `}
        fill={shoeColor}
        stroke="#0f172a"
        strokeWidth={3}
      />
      {/* Đế giày Sneaker */}
      <line
        x1={pose.heelLX - 8}
        y1={pose.heelLY + 13}
        x2={pose.toeLX + 5}
        y2={pose.toeLY + 15}
        stroke="#ff7b00"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* 6. TAY TRÁI (Front Arm) */}
      <g stroke={hoodieColor} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round">
        <line
          x1={pose.shoulderLX}
          y1={pose.shoulderLY}
          x2={pose.elbowLX}
          y2={pose.elbowLY}
        />
        <line
          x1={pose.elbowLX}
          y1={pose.elbowLY}
          x2={pose.handLX}
          y2={pose.handLY}
        />
      </g>
      {/* Bàn tay trái */}
      <circle cx={pose.handLX} cy={pose.handLY} r={14} fill="#f6d5b8" />
    </g>
  );
};

/**
 * 2. NHÂN VẬT VẼ TAY PHÁC THẢO (MinutePhysics Chalkboard Stickman Walk)
 */
export const ChalkboardStickmanWalker: React.FC<{
  pose: WalkKinematics;
  groundY: number;
  stroke?: string;
}> = ({ pose, groundY, stroke = "#ffffff" }) => {
  return (
    <g>
      {/* Bóng nét phấn mờ dưới đất */}
      <ellipse
        cx={pose.hipX}
        cy={groundY + 8}
        rx={65 * pose.shadowScaleX}
        ry={10}
        fill="rgba(255, 255, 255, 0.12)"
      />

      {/* Tay sau (Phải) */}
      <g stroke="rgba(255, 255, 255, 0.45)" strokeWidth={6} strokeLinecap="round">
        <line
          x1={pose.shoulderRX}
          y1={pose.shoulderRY}
          x2={pose.elbowRX}
          y2={pose.elbowRY}
        />
        <line
          x1={pose.elbowRX}
          y1={pose.elbowRY}
          x2={pose.handRX}
          y2={pose.handRY}
        />
        <circle cx={pose.handRX} cy={pose.handRY} r={7} fill="rgba(255, 255, 255, 0.45)" />
      </g>

      {/* Chân sau (Phải) */}
      <g stroke="rgba(255, 255, 255, 0.45)" strokeWidth={7} strokeLinecap="round">
        <line x1={pose.hipX} y1={pose.hipY} x2={pose.kneeRX} y2={pose.kneeRY} />
        <line x1={pose.kneeRX} y1={pose.kneeRY} x2={pose.ankleRX} y2={pose.ankleRY} />
        <line x1={pose.heelRX} y1={pose.heelRY} x2={pose.toeRX} y2={pose.toeRY} />
      </g>

      {/* Thân người que */}
      <line
        x1={pose.hipX}
        y1={pose.hipY}
        x2={pose.shoulderLX}
        y2={pose.shoulderLY}
        stroke={stroke}
        strokeWidth={8}
        strokeLinecap="round"
      />

      {/* Đầu người que vẽ phấn */}
      <circle
        cx={pose.headX}
        cy={pose.headY}
        r={32}
        fill="none"
        stroke={stroke}
        strokeWidth={7}
      />
      {/* Nụ cười vui vẻ */}
      <path
        d={`M ${pose.headX + 2} ${pose.headY + 6} Q ${pose.headX + 16} ${pose.headY + 18} ${pose.headX + 22} ${pose.headY + 4}`}
        fill="none"
        stroke="#ffd166"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* Chân trước (Trái) */}
      <g stroke={stroke} strokeWidth={8} strokeLinecap="round">
        <line x1={pose.hipX} y1={pose.hipY} x2={pose.kneeLX} y2={pose.kneeLY} />
        <line x1={pose.kneeLX} y1={pose.kneeLY} x2={pose.ankleLX} y2={pose.ankleLY} />
        <line x1={pose.heelLX} y1={pose.heelLY} x2={pose.toeLX} y2={pose.toeLY} />
      </g>

      {/* Tay trước (Trái) */}
      <g stroke={stroke} strokeWidth={7} strokeLinecap="round">
        <line
          x1={pose.shoulderLX}
          y1={pose.shoulderLY}
          x2={pose.elbowLX}
          y2={pose.elbowLY}
        />
        <line
          x1={pose.elbowLX}
          y1={pose.elbowLY}
          x2={pose.handLX}
          y2={pose.handLY}
        />
        <circle cx={pose.handLX} cy={pose.handLY} r={8} fill={stroke} />
      </g>
    </g>
  );
};

/**
 * 3. SHOWCASE TOÀN CẢNH (Remotion Composition: 10s, 300 frames @ 30fps)
 * - Nền chuyển động Parallax (City Skyline + Đèn đường + Vạch kẻ đường)
 * - Hiển thị cả 2 phong cách nhân vật đi bộ sóng đôi (Flat Vector & MinutePhysics Stickman)
 * - HUD hiển thị thông số góc quay động học (Kinematics Telemetry)
 */
export const WalkCycleShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  // Tốc độ bước chân: 1 chu kỳ 2 bước = 30 frame (1 giây)
  const WALK_CYCLE_FRAMES = 30;
  const progress = (frame % WALK_CYCLE_FRAMES) / WALK_CYCLE_FRAMES;

  const GROUND_Y = 820;

  // Tính dáng đi cho Nhân vật 1 (Vector Hiện Đại) ở x = 620
  const vectorPose = calculateWalkPose(620, GROUND_Y, progress, 1.15);

  // Tính dáng đi cho Nhân vật 2 (Stickman Phấn Trắng) ở x = 1320
  const stickmanPose = calculateWalkPose(1320, GROUND_Y, progress, 1.15);

  // Vận tốc cuộn nền Parallax (Pixel per frame)
  const bgCityX = -(frame * 2.2) % 1920;
  const midgroundTreesX = -(frame * 5.5) % 1920;
  const roadDashesX = -(frame * 12.0) % 240;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b1329",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header Tiêu đề */}
      <div
        style={{
          position: "absolute",
          top: 36,
          width: "100%",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            border: "2px solid #38bdf8",
            borderRadius: 999,
            padding: "6px 24px",
            color: "#38bdf8",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Procedural SVG Kinematics • 60 FPS Walk Cycle
        </div>
        <h1
          style={{
            color: "#f8fafc",
            fontSize: 48,
            fontWeight: 900,
            marginTop: 8,
          }}
        >
          Mô Phỏng Chuyển Động Đi Bộ Bằng Vector SVG
        </h1>
      </div>

      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="sky-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0b1329" />
            <stop offset="60%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="ground-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Nền trời */}
        <rect width={1920} height={1080} fill="url(#sky-glow)" />

        {/* Mặt Trăng tỏa sáng */}
        <circle cx={960} cy={260} r={95} fill="#fef08a" opacity={0.25} />
        <circle cx={960} cy={260} r={65} fill="#fef08a" />

        {/* PARALLAX LAYER 1: Thành phố xa (City Skyline) cuộn chậm */}
        <g transform={`translate(${bgCityX}, 0)`}>
          {[0, 1920].map((offsetX) => (
            <g key={offsetX} transform={`translate(${offsetX}, 0)`} fill="#182234" opacity={0.75}>
              <rect x={60} y={480} width={180} height={340} />
              <rect x={280} y={420} width={140} height={400} />
              <rect x={460} y={510} width={220} height={310} />
              <rect x={720} y={390} width={160} height={430} />
              <rect x={920} y={460} width={200} height={360} />
              <rect x={1160} y={430} width={150} height={390} />
              <rect x={1350} y={500} width={240} height={320} />
              <rect x={1630} y={380} width={190} height={440} />
            </g>
          ))}
        </g>

        {/* PARALLAX LAYER 2: Hàng cây & Cột đèn cuộn tốc độ vừa */}
        <g transform={`translate(${midgroundTreesX}, 0)`}>
          {[0, 1920].map((offsetX) => (
            <g key={offsetX} transform={`translate(${offsetX}, 0)`}>
              {[120, 480, 840, 1200, 1560].map((tx) => (
                <g key={tx}>
                  {/* Cột đèn đường */}
                  <line x1={tx} y1={GROUND_Y} x2={tx} y2={560} stroke="#475569" strokeWidth={5} />
                  <line x1={tx} y1={560} x2={tx + 35} y2={550} stroke="#475569" strokeWidth={5} />
                  <circle cx={tx + 35} cy={556} r={10} fill="#fef08a" />
                  {/* Quầng sáng đèn */}
                  <polygon
                    points={`${tx + 35},556 ${tx - 65},${GROUND_Y} ${tx + 135},${GROUND_Y}`}
                    fill="rgba(254, 240, 138, 0.05)"
                  />
                </g>
              ))}
            </g>
          ))}
        </g>

        {/* MẶT ĐƯỜNG (Ground & Sidewalk) */}
        <rect x={0} y={GROUND_Y} width={1920} height={1080 - GROUND_Y} fill="url(#ground-grad)" />
        {/* Đường biên vỉa hè */}
        <line x1={0} y1={GROUND_Y} x2={1920} y2={GROUND_Y} stroke="#38bdf8" strokeWidth={5} />
        {/* Vạch kẻ đường đứt đoạn cuộn nhanh */}
        <g transform={`translate(${roadDashesX}, 0)`}>
          {Array.from({ length: 15 }).map((_, i) => (
            <line
              key={i}
              x1={i * 160}
              y1={GROUND_Y + 70}
              x2={i * 160 + 90}
              y2={GROUND_Y + 70}
              stroke="#cbd5e1"
              strokeWidth={8}
              strokeDasharray="90 70"
            />
          ))}
        </g>

        {/* NHÂN VẬT 1: FLAT VECTOR CHARACTER (Góc trái) */}
        <FlatVectorWalker
          pose={vectorPose}
          groundY={GROUND_Y}
          hoodieColor="#ff7b00"
          pantsColor="#1e293b"
          shoeColor="#ffffff"
        />

        {/* NHÂN VẬT 2: MINUTEPHYSICS STICKMAN (Góc phải) */}
        <ChalkboardStickmanWalker
          pose={stickmanPose}
          groundY={GROUND_Y}
          stroke="#ffffff"
        />

        {/* Đường nối xương khớp (Kinematics Debug Tracker) */}
        <circle cx={vectorPose.hipX} cy={vectorPose.hipY} r={6} fill="#38bdf8" />
        <circle cx={vectorPose.kneeLX} cy={vectorPose.kneeLY} r={6} fill="#38bdf8" />
        <circle cx={vectorPose.ankleLX} cy={vectorPose.ankleLY} r={6} fill="#38bdf8" />
      </svg>

      {/* BẢNG THÔNG SỐ ĐỘNG HỌC (Kinematics Telemetry HUD) */}
      <div
        style={{
          position: "absolute",
          left: 50,
          bottom: 45,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "2px solid #ff7b00",
          borderRadius: 20,
          padding: "16px 28px",
          color: "#f8fafc",
          boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ color: "#ff7b00", fontWeight: 800, fontSize: 20, marginBottom: 6 }}>
          STYLE A: FLAT VECTOR WALKER
        </div>
        <div style={{ fontSize: 16, color: "#cbd5e1", lineHeight: 1.6 }}>
          • Chu kỳ bước: <b>{Math.round(progress * 100)}%</b><br />
          • Độ nhún trọng tâm: <b>{vectorPose.hipY.toFixed(1)} px</b><br />
          • Góc đùi: <b>{((vectorPose.kneeLX - vectorPose.hipX) / 84).toFixed(2)} rad</b><br />
          • Góc gối co: <b>{((vectorPose.ankleLX - vectorPose.kneeLX) / 82).toFixed(2)} rad</b>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 50,
          bottom: 45,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "2px solid #ffffff",
          borderRadius: 20,
          padding: "16px 28px",
          color: "#f8fafc",
          boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ color: "#ffd166", fontWeight: 800, fontSize: 20, marginBottom: 6 }}>
          STYLE B: CHALKBOARD STICKMAN
        </div>
        <div style={{ fontSize: 16, color: "#cbd5e1", lineHeight: 1.6 }}>
          • Bút vẽ phác thảo: <b>MinutePhysics Style</b><br />
          • Cánh tay đối xứng: <b>Phase Offset 180°</b><br />
          • Nhún thân người: <b>2 nhịp / 1 chu kỳ</b><br />
          • Khớp chuyển động: <b>Inverse Kinematics SVG</b>
        </div>
      </div>
    </AbsoluteFill>
  );
};
