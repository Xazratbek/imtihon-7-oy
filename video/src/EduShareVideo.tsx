import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Intro } from "./scenes/Intro";
import { Problem } from "./scenes/Problem";
import { Solution } from "./scenes/Solution";
import { Features, getFeaturesDuration } from "./scenes/Features";
import { AiSection, getAiSectionCapabilitiesDuration } from "./scenes/AiSection";
import { TechStack } from "./scenes/TechStack";
import { Stats } from "./scenes/Stats";
import { Cta } from "./scenes/Cta";

export const SCENE_DURATIONS = {
  intro: 90,
  problem: 150,
  solution: 90,
  features: getFeaturesDuration(),
  ai: getAiSectionCapabilitiesDuration(),
  techStack: 120,
  stats: 110,
  cta: 90,
};

export const TRANSITION_DURATION = 18;

export const getTotalDurationInFrames = () => {
  const sum = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);
  const transitionsCount = Object.keys(SCENE_DURATIONS).length - 1;
  return sum - transitionsCount * TRANSITION_DURATION;
};

const transition = () => (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
  />
);

export const EduShareVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
        <Intro />
      </TransitionSeries.Sequence>
      {transition()}

      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.problem}>
        <Problem />
      </TransitionSeries.Sequence>
      {transition()}

      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.solution}>
        <Solution />
      </TransitionSeries.Sequence>
      {transition()}

      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.features}>
        <Features />
      </TransitionSeries.Sequence>
      {transition()}

      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.ai}>
        <AiSection />
      </TransitionSeries.Sequence>
      {transition()}

      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.techStack}>
        <TechStack />
      </TransitionSeries.Sequence>
      {transition()}

      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.stats}>
        <Stats />
      </TransitionSeries.Sequence>
      {transition()}

      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cta}>
        <Cta />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
