/**
 * AKASHIC LENSES - Remotion Root
 *
 * Remotion is NOT installed by default (saves ~300MB in dev).
 * To activate video generation:
 *
 *   npm install remotion @remotion/bundler @remotion/renderer
 *
 * Then uncomment the imports below and run:
 *   npx remotion studio remotion/index.tsx
 *
 * Compositions listed here will become renderable video exports.
 */

// import { Composition } from "remotion";
// import { ReadingCard } from "./compositions/ReadingCard";
// import { SpiralIntro } from "./compositions/SpiralIntro";

export const RemotionRoot = () => {
  return (
    <>
      {/*
      <Composition
        id="ReadingCard"
        component={ReadingCard}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{}}
      />
      <Composition
        id="SpiralIntro"
        component={SpiralIntro}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      */}
    </>
  );
};
