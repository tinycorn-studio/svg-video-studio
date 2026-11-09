import "./index.css";
import { Composition, Folder, Still } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { MinutePhysicsDemo } from "./styles/minute-physics/MinutePhysicsDemo";
import { MoonDisappear15s } from "./styles/minute-physics/MoonDisappear15s";
import { InfographicsDemo } from "./styles/infographics/InfographicsDemo";
import { MoonDisappearInfographics15s } from "./styles/infographics/MoonDisappearInfographics15s";
import {
  Style1Showcase,
  Style2Showcase,
  Style3Showcase,
  Style4Showcase,
  Style5Showcase,
  Style6Showcase,
  Style7Showcase,
} from "./styles/StyleShowcases";
import { KesslerSyndrome60s } from "./videos/kessler/KesslerSyndrome60s";
import { FPS, H, TOTAL_FRAMES, W } from "./videos/kessler/theme";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="7-SVG-Graphic-Styles">
        <Still
          id="Preview-Style1-MinutePhysics"
          component={Style1Showcase}
          width={1920}
          height={1080}
        />
        <Still
          id="Preview-Style2-Infographics"
          component={Style2Showcase}
          width={1920}
          height={1080}
        />
        <Still
          id="Preview-Style3-Kurzgesagt"
          component={Style3Showcase}
          width={1920}
          height={1080}
        />
        <Still
          id="Preview-Style4-STEMMath"
          component={Style4Showcase}
          width={1920}
          height={1080}
        />
        <Still
          id="Preview-Style5-SciFiHUD"
          component={Style5Showcase}
          width={1920}
          height={1080}
        />
        <Still
          id="Preview-Style6-Isometric3D"
          component={Style6Showcase}
          width={1920}
          height={1080}
        />
        <Still
          id="Preview-Style7-KineticVox"
          component={Style7Showcase}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="YouTube-Styles">
        <Composition
          id="MoonDisappear-15s"
          component={MoonDisappear15s}
          durationInFrames={450}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="MoonDisappear-Style2-15s"
          component={MoonDisappearInfographics15s}
          durationInFrames={450}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Kessler-Syndrome-60s"
          component={KesslerSyndrome60s}
          durationInFrames={TOTAL_FRAMES}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Style1-MinutePhysics"
          component={MinutePhysicsDemo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Style2-InfographicsShow"
          component={InfographicsDemo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />

    </>
  );
};
