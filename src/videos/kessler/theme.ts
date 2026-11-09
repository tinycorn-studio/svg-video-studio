import { Easing, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";

export const { fontFamily: FONT } = loadFont("normal", {
  weights: ["600", "800"],
  subsets: ["latin"],
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
/** Vertical Full HD (9:16). */
export const W = 1080;
export const H = 1920;

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

/** Subtitle cues in seconds on the absolute timeline (English voice-over script). */
export const CUES: { from: number; to: number; text: string }[] = [
  { from: 0.2, to: 3.9, text: "Right now, over 15,800 working satellites are flying above your head." },
  { from: 3.9, to: 5.2, text: "But they're not alone." },
  { from: 5.3, to: 8.0, text: "More than 68,000 objects larger than ten centimeters." },
  { from: 8.0, to: 11.0, text: "Plus 1.5 million fragments between one and ten centimeters." },
  { from: 11.0, to: 14.3, text: "27,000 km/h. Ten times faster than a bullet." },
  { from: 14.4, to: 17.8, text: "In 1978, NASA scientist Donald Kessler warned:" },
  { from: 17.8, to: 22.0, text: "One collision makes debris, and debris causes more collisions." },
  { from: 22.0, to: 26.2, text: "An unstoppable domino effect." },
  { from: 26.4, to: 30.4, text: "In 2009, two satellites collided and shattered into thousands of pieces." },
  { from: 30.4, to: 34.4, text: "Past a tipping point, low orbit could become a no-go zone." },
  { from: 34.4, to: 37.8, text: "Rockets, internet, weather forecasts: all at risk." },
  { from: 38.0, to: 42.0, text: "ESA's 2026 report: about ten new satellites launch every day." },
  { from: 42.0, to: 46.4, text: "Its orbital health index jumped from 4 to 50 in a single year." },
  { from: 46.4, to: 49.3, text: "Fifty times beyond sustainable." },
  { from: 49.6, to: 53.4, text: "The fix: bring dead satellites down, and actively clean up debris." },
  { from: 53.4, to: 57.0, text: "ESA aims to minimize new debris by 2030." },
  { from: 57.0, to: 60.0, text: "The sky isn't infinite. Don't turn it into a junkyard." },
];
