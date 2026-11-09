import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Backdrop, clamp } from "./parts";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Scale } from "./Scene2Scale";
import { Scene3Cascade } from "./Scene3Cascade";
import { Scene4Aftermath } from "./Scene4Aftermath";
import { Scene5Data } from "./Scene5Data";
import { Scene6Future } from "./Scene6Future";
import { C, CUES, FONT, FPS, SCENES, TOTAL_FRAMES, TRANSITION } from "./theme";

const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = CUES.find((c) => frame >= c.from * FPS && frame < c.to * FPS);
  if (!cue) return null;
  const a = interpolate(
    frame,
    [cue.from * FPS, cue.from * FPS + 6, cue.to * FPS - 5, cue.to * FPS],
    [0, 1, 1, 0],
    clamp,
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 64,
        display: "flex",
        justifyContent: "center",
        opacity: a,
      }}
    >
      <div
        style={{
          maxWidth: 1560,
          padding: "14px 36px",
          borderRadius: 30,
          background: "rgba(11,9,43,0.78)",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 46,
          lineHeight: 1.3,
          color: C.white,
          textAlign: "center",
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};

const Credit: React.FC = () => (
  <div
    style={{
      position: "absolute",
      right: 40,
      bottom: 18,
      fontFamily: FONT,
      fontWeight: 600,
      fontSize: 22,
      color: C.lilac,
      opacity: 0.6,
    }}
  >
    Nguồn: ESA Space Environment Report 2026 · ESA DISCOS
  </div>
);

const FadeOut: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [TOTAL_FRAMES - 12, TOTAL_FRAMES - 1], [0, 1], clamp);
  return <AbsoluteFill style={{ background: C.bg, opacity: o }} />;
};

const T = linearTiming({ durationInFrames: TRANSITION });

/** Kessler Syndrome explainer — 60s, 1920×1080 @30fps, Kurzgesagt-style (Style 3). */
export const KesslerSyndrome60s: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <TransitionSeries>
      <TransitionSeries.Sequence name="1 Hook" durationInFrames={SCENES.hook}>
        <Scene1Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={T} />
      <TransitionSeries.Sequence name="2 Scale" durationInFrames={SCENES.scale}>
        <Scene2Scale />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={T} />
      <TransitionSeries.Sequence name="3 Cascade" durationInFrames={SCENES.cascade}>
        <Scene3Cascade />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={T} />
      <TransitionSeries.Sequence name="4 Aftermath" durationInFrames={SCENES.aftermath}>
        <Scene4Aftermath />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={T} />
      <TransitionSeries.Sequence name="5 Data" durationInFrames={SCENES.data}>
        <Scene5Data />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={T} />
      <TransitionSeries.Sequence name="6 Future" durationInFrames={SCENES.future}>
        <Scene6Future />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Credit />
    <Subtitles />
    <FadeOut />
  </AbsoluteFill>
);
