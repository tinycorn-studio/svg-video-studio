import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  RoughArrow,
  RoughBox,
  RoughCircle,
  RoughCurve,
  RoughLine,
  RoughStickman,
} from "./RoughElements";

/**
 * Cảnh 1 (0s - 5s | 150 frames):
 * "Điều gì xảy ra nếu Mặt Trăng đột ngột biến mất ngay đêm nay?"
 */
const Scene1MoonVanish: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Mặt trăng mờ dần sau khi bị gạch chéo ở frame 75 (2.5s)
  const moonOpacity = interpolate(frame, [75, 105], [1, 0.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Tiêu đề chính */}
      <div
        style={{
          position: "absolute",
          top: 42,
          width: "100%",
          textAlign: "center",
          color: "#ffe66d",
          fontSize: 56,
          fontWeight: "bold",
          transform: `scale(${titleScale})`,
        }}
      >
        Điều gì xảy ra nếu Mặt Trăng biến mất?
      </div>

      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {/* 0.2s - 1.2s: Người que quan sát bầu trời */}
        <RoughStickman
          x={330}
          y={610}
          scale={1.45}
          pose={frame < 70 ? "point-right" : "think"}
          startFrame={5}
          durationInFrames={30}
          stroke="#ffffff"
          label="Bạn (Trái Đất)"
        />

        {/* Dấu hỏi chấm lớn khi Mặt Trăng biến mất */}
        {frame >= 75 && (
          <text
            x={330}
            y={390}
            textAnchor="middle"
            fill="#ff6b6b"
            fontSize={72}
            fontWeight="bold"
            opacity={interpolate(frame, [75, 90], [0, 1], {
              extrapolateRight: "clamp",
            })}
          >
            ?!
          </text>
        )}

        {/* 0.5s - 1.6s: Vẽ Trái Đất */}
        <RoughCircle
          cx={880}
          cy={540}
          diameter={310}
          startFrame={15}
          durationInFrames={32}
          stroke="#4ea8de"
          fill="rgba(78, 168, 222, 0.35)"
          seed={21}
        />
        {frame >= 35 && (
          <text
            x={880}
            y={555}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={44}
            fontWeight="bold"
          >
            Trái Đất
          </text>
        )}

        {/* 1.2s - 2.0s: Mũi tên lực hấp dẫn Trái Đất -> Mặt Trăng */}
        <RoughArrow
          x1={1060}
          y1={490}
          x2={1320}
          y2={420}
          startFrame={36}
          durationInFrames={22}
          stroke="#ffd166"
        />

        {/* 1.5s - 2.5s: Vẽ Mặt Trăng */}
        <g style={{ opacity: moonOpacity }}>
          <RoughCircle
            cx={1470}
            cy={380}
            diameter={170}
            startFrame={45}
            durationInFrames={25}
            stroke="#e9ecef"
            fill="rgba(233, 236, 239, 0.35)"
            seed={99}
          />
          {frame >= 58 && (
            <text
              x={1470}
              y={392}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={32}
              fontWeight="bold"
            >
              Mặt Trăng
            </text>
          )}
        </g>

        {/* 2.5s - 3.5s (Frame 75+): Gạch chéo ĐỎ xóa sổ Mặt Trăng! */}
        <RoughLine
          x1={1360}
          y1={270}
          x2={1580}
          y2={490}
          startFrame={72}
          durationInFrames={15}
          stroke="#ff4d6d"
          strokeWidth={7}
          seed={301}
        />
        <RoughLine
          x1={1580}
          y1={270}
          x2={1360}
          y2={490}
          startFrame={84}
          durationInFrames={15}
          stroke="#ff4d6d"
          strokeWidth={7}
          seed={302}
        />

        {frame >= 95 && (
          <text
            x={1470}
            y={555}
            textAnchor="middle"
            fill="#ff4d6d"
            fontSize={42}
            fontWeight="bold"
          >
            BIẾN MẤT! (M = 0)
          </text>
        )}
      </svg>

      {/* Phụ đề khớp từng giây */}
      <div
        style={{
          position: "absolute",
          bottom: 58,
          width: "100%",
          textAlign: "center",
          color: "#f8f9fa",
          fontSize: 40,
          backgroundColor: "rgba(0,0,0,0.55)",
          padding: "14px 0",
        }}
      >
        {frame < 72
          ? "🎙️ [0s - 2.5s]: Mặt Trăng giữ cân bằng cho Trái Đất suốt 4.5 tỷ năm..."
          : "🎙️ [2.5s - 5.0s]: Nhưng nếu đêm nay nó đột ngột BIẾN MẤT thì sao?"}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Cảnh 2 (5s - 10s | 150 frames):
 * "Thủy triều giảm 75% và 1 ngày trên Trái Đất chỉ còn 6 - 8 tiếng!"
 */
const Scene2TidesAndDayLength: React.FC = () => {
  const frame = useCurrentFrame();

  // Kim đồng hồ quay cực nhanh để minh họa Trái Đất tự quay nhanh gấp 3-4 lần
  const clockAngle = frame * 14;
  const handRad = (clockAngle * Math.PI) / 180;
  const handX = 1430 + Math.cos(handRad) * 95;
  const handY = 470 + Math.sin(handRad) * 95;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 42,
          width: "100%",
          textAlign: "center",
          color: "#4ea8de",
          fontSize: 52,
          fontWeight: "bold",
        }}
      >
        Hậu quả #1 & #2: Thủy Triều Tê Liệt & Ngày Ngắn Kỷ Lục
      </div>

      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {/* Khung bên trái (5s - 7.5s): Thủy triều đại dương giảm 75% */}
        <RoughBox
          x={160}
          y={250}
          width={680}
          height={450}
          startFrame={5}
          durationInFrames={28}
          stroke="#4ea8de"
          fill="rgba(78, 168, 222, 0.12)"
          seed={11}
        />

        {/* Sóng biển cao ban đầu (nét đứt mờ) */}
        <RoughCurve
          points={[
            [200, 390],
            [320, 310],
            [480, 440],
            [640, 310],
            [800, 390],
          ]}
          startFrame={18}
          durationInFrames={25}
          stroke="rgba(255,255,255,0.4)"
          seed={40}
        />

        {/* Mũi tên tụt xuống -75% */}
        <RoughArrow
          x1={500}
          y1={360}
          x2={500}
          y2={540}
          startFrame={35}
          durationInFrames={20}
          stroke="#ff6b6b"
        />

        {/* Sóng biển phẳng lặng sau khi mất Mặt Trăng */}
        <RoughCurve
          points={[
            [200, 590],
            [350, 575],
            [500, 600],
            [650, 575],
            [800, 590],
          ]}
          startFrame={45}
          durationInFrames={25}
          stroke="#4ea8de"
          strokeWidth={6}
          seed={41}
        />

        {frame >= 40 && (
          <text
            x={500}
            y={215}
            textAnchor="middle"
            fill="#ff6b6b"
            fontSize={44}
            fontWeight="bold"
          >
            🌊 Thủy triều giảm -75%!
          </text>
        )}

        {/* Khung bên phải (7.5s - 10s): Đồng hồ 1 ngày = 6 - 8 tiếng */}
        <RoughCircle
          cx={1430}
          cy={470}
          diameter={280}
          startFrame={65}
          durationInFrames={28}
          stroke="#ffd166"
          fill="rgba(255, 209, 102, 0.15)"
          seed={82}
        />

        {/* Kim đồng hồ xoay tít */}
        {frame >= 80 && (
          <line
            x1={1430}
            y1={470}
            x2={handX}
            y2={handY}
            stroke="#ff6b6b"
            strokeWidth={7}
            strokeLinecap="round"
          />
        )}

        <RoughStickman
          x={1080}
          y={580}
          scale={1.25}
          pose="wave"
          startFrame={70}
          durationInFrames={25}
          stroke="#ffffff"
          label="Chóng mặt!"
        />

        {frame >= 85 && (
          <text
            x={1430}
            y={215}
            textAnchor="middle"
            fill="#ffd166"
            fontSize={44}
            fontWeight="bold"
          >
            ⏱️ 1 Ngày = Chỉ còn 6 - 8 Giờ!
          </text>
        )}
        {frame >= 95 && (
          <text
            x={1430}
            y={685}
            textAnchor="middle"
            fill="#f8f9fa"
            fontSize={34}
          >
            (Không còn lực hãm thủy triều từ Mặt Trăng)
          </text>
        )}
      </svg>

      {/* Phụ đề khớp từng giây */}
      <div
        style={{
          position: "absolute",
          bottom: 58,
          width: "100%",
          textAlign: "center",
          color: "#f8f9fa",
          fontSize: 40,
          backgroundColor: "rgba(0,0,0,0.55)",
          padding: "14px 0",
        }}
      >
        {frame < 70
          ? "🎙️ [5.0s - 7.3s]: Đầu tiên, thủy triều đại dương lập tức sụt giảm 75%!"
          : "🎙️ [7.3s - 10.0s]: Và không còn Mặt Trăng hãm phanh, 1 ngày chỉ còn 6 đến 8 tiếng!"}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Cảnh 3 (10s - 15s | 150 frames):
 * "Trục Trái Đất chao đảo hỗn loạn -> Khí hậu đảo lộn hoàn toàn!"
 */
const Scene3AxisWobble: React.FC = () => {
  const frame = useCurrentFrame();

  // Góc nghiêng trục Trái Đất chao đảo mạnh sau frame 25
  const wobbleDeg =
    frame < 25 ? 23.5 : 23.5 + Math.sin((frame - 25) * 0.28) * 24;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 42,
          width: "100%",
          textAlign: "center",
          color: "#ff6b6b",
          fontSize: 52,
          fontWeight: "bold",
        }}
      >
        Hậu quả #3: Trục Trái Đất Chao Đảo & Khí Hậu Hỗn Loạn!
      </div>

      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {/* Trái Đất ở trung tâm với trục nghiêng chao đảo */}
        <g transform={`translate(960, 520) rotate(${wobbleDeg}) translate(-960, -520)`}>
          {/* Đường trục Bắc - Nam */}
          <RoughLine
            x1={960}
            y1={230}
            x2={960}
            y2={810}
            startFrame={5}
            durationInFrames={20}
            stroke="#ffd166"
            strokeWidth={6}
            seed={501}
          />
          <RoughCircle
            cx={960}
            cy={520}
            diameter={320}
            startFrame={8}
            durationInFrames={28}
            stroke="#4ea8de"
            fill="rgba(78, 168, 222, 0.35)"
            seed={502}
          />
          {/* Đường xích đạo */}
          <RoughLine
            x1={800}
            y1={520}
            x2={1120}
            y2={520}
            startFrame={20}
            durationInFrames={18}
            stroke="#ffffff"
            strokeWidth={4}
            seed={503}
          />
        </g>

        {/* Hiển thị số độ nghiêng nhảy loạn xạ */}
        {frame >= 25 && (
          <text
            x={960}
            y={200}
            textAnchor="middle"
            fill="#ffd166"
            fontSize={42}
            fontWeight="bold"
          >
            Góc nghiêng trục: {Math.abs(wobbleDeg).toFixed(1)}° (Mất ổn định!)
          </text>
        )}

        {/* Bên trái: Kỷ Băng Hà đột ngột */}
        <RoughBox
          x={140}
          y={360}
          width={430}
          height={290}
          startFrame={38}
          durationInFrames={25}
          stroke="#72efdd"
          fill="rgba(114, 239, 221, 0.2)"
          seed={601}
        />
        {frame >= 50 && (
          <>
            <text
              x={355}
              y={485}
              textAnchor="middle"
              fill="#72efdd"
              fontSize={46}
              fontWeight="bold"
            >
              ❄️ -50°C Băng Giá
            </text>
            <text
              x={355}
              y={555}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={30}
            >
              Mùa đông vĩnh cửu
            </text>
          </>
        )}
        <RoughArrow
          x1={590}
          y1={510}
          x2={750}
          y2={510}
          startFrame={55}
          durationInFrames={18}
          stroke="#72efdd"
        />

        {/* Bên phải: Nắng nóng & Siêu bão */}
        <RoughBox
          x={1350}
          y={360}
          width={430}
          height={290}
          startFrame={68}
          durationInFrames={25}
          stroke="#ff6b6b"
          fill="rgba(255, 107, 107, 0.2)"
          seed={602}
        />
        {frame >= 80 && (
          <>
            <text
              x={1565}
              y={485}
              textAnchor="middle"
              fill="#ff6b6b"
              fontSize={46}
              fontWeight="bold"
            >
              🔥 +60°C Siêu Bão
            </text>
            <text
              x={1565}
              y={555}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={30}
            >
              Gió giật 300 km/h
            </text>
          </>
        )}
        <RoughArrow
          x1={1330}
          y1={510}
          x2={1170}
          y2={510}
          startFrame={82}
          durationInFrames={18}
          stroke="#ff6b6b"
        />
      </svg>

      {/* Phụ đề khớp từng giây */}
      <div
        style={{
          position: "absolute",
          bottom: 58,
          width: "100%",
          textAlign: "center",
          color: "#ffe66d",
          fontSize: 40,
          backgroundColor: "rgba(0,0,0,0.55)",
          padding: "14px 0",
        }}
      >
        {frame < 75
          ? "🎙️ [10.0s - 12.5s]: Tệ nhất là trục Trái Đất sẽ chao đảo hỗn loạn..."
          : "🎙️ [12.5s - 15.0s]: ...khiến các mùa biến mất, thay bằng băng giá và siêu bão!"}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Video hoàn chỉnh 15s (450 frames @ 30fps) - Cách 1 (MinutePhysics Style)
 */
export const MoonDisappear15s: React.FC = () => {
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
      {/* Cảnh 1: 0s -> 5s */}
      <Sequence from={0} durationInFrames={150} name="Scene1-MoonVanish">
        <Scene1MoonVanish />
      </Sequence>

      {/* Cảnh 2: 5s -> 10s */}
      <Sequence
        from={150}
        durationInFrames={150}
        name="Scene2-TidesAndDayLength"
      >
        <Scene2TidesAndDayLength />
      </Sequence>

      {/* Cảnh 3: 10s -> 15s */}
      <Sequence from={300} durationInFrames={150} name="Scene3-AxisWobble">
        <Scene3AxisWobble />
      </Sequence>
    </AbsoluteFill>
  );
};
