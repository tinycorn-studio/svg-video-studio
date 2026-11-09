import { Easing, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";

export const { fontFamily: FONT } = loadFont("normal", {
  weights: ["600", "800"],
  subsets: ["latin", "vietnamese"],
});

export const C = {
  bg: "#0b092b",
  bg2: "#1a1446",
  magenta: "#f72585",
  pink: "#ff5d8f",
  cyan: "#4cc9f0",
  blue: "#4361ee",
  gold: "#ffb703",
  lightGold: "#ffd166",
  orange: "#ff7b00",
  white: "#ffffff",
  lilac: "#b8b5e0",
} as const;

export const FPS = 30;
export const W = 1920;
export const H = 1080;

/** Scene lengths (frames) BEFORE overlapping transitions. */
export const TRANSITION = 12;
export const SCENES = {
  hook: 165,
  scale: 285,
  cascade: 375,
  aftermath: 345,
  data: 345,
  future: 345,
} as const;

/** Absolute start frame of each scene on the final timeline. */
export const START = (() => {
  const order = Object.values(SCENES);
  const out: number[] = [];
  let t = 0;
  for (const d of order) {
    out.push(t);
    t += d - TRANSITION;
  }
  return out;
})();

export const TOTAL_FRAMES =
  Object.values(SCENES).reduce((a, b) => a + b, 0) -
  TRANSITION * (Object.keys(SCENES).length - 1);

export const svg = (name: string) => staticFile(`svg/kessler/${name}.svg`);

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

/** Subtitle cues in seconds on the absolute timeline (Vietnamese VO script). */
export const CUES: { from: number; to: number; text: string }[] = [
  { from: 0.2, to: 3.9, text: "Ngay lúc này, hơn 15.000 vệ tinh đang bay trên đầu bạn." },
  { from: 3.9, to: 5.2, text: "Nhưng chúng không cô đơn." },
  { from: 5.3, to: 8.0, text: "Hơn 68.000 vật thể lớn hơn 10 cm." },
  { from: 8.0, to: 11.0, text: "1,5 triệu mảnh nhỏ hơn, từ 1 đến 10 cm." },
  { from: 11.0, to: 14.3, text: "Tốc độ 27.000 km/h. Nhanh gấp 10 lần viên đạn." },
  { from: 14.4, to: 17.8, text: "Năm 1978, nhà khoa học NASA Donald Kessler cảnh báo:" },
  { from: 17.8, to: 22.0, text: "một vụ va chạm tạo ra mảnh vỡ, mảnh vỡ gây ra va chạm mới." },
  { from: 22.0, to: 26.2, text: "Một hiệu ứng domino không thể dừng lại." },
  { from: 26.4, to: 30.4, text: "Năm 2009, hai vệ tinh đâm nhau và tạo ra hàng nghìn mảnh vỡ." },
  { from: 30.4, to: 35.0, text: "Nếu chuỗi phản ứng vượt ngưỡng, quỹ đạo thấp có thể thành vùng cấm." },
  { from: 35.0, to: 37.8, text: "Phóng tên lửa sẽ cực kỳ nguy hiểm." },
  { from: 38.0, to: 42.0, text: "Báo cáo ESA 2026: mỗi ngày có khoảng 10 vệ tinh mới được phóng lên." },
  { from: 42.0, to: 46.4, text: "Chỉ số sức khỏe quỹ đạo của ESA nhảy từ 4 lên 50 chỉ trong một năm." },
  { from: 46.4, to: 49.3, text: "Gấp 50 lần mức bền vững." },
  { from: 49.6, to: 53.4, text: "Giải pháp: đưa vệ tinh hết hạn về khí quyển, chủ động thu gom rác." },
  { from: 53.4, to: 57.0, text: "ESA đặt mục tiêu hạn chế tối đa rác mới vào năm 2030." },
  { from: 57.0, to: 60.0, text: "Bầu trời không vô tận. Đừng biến nó thành bãi rác." },
];
