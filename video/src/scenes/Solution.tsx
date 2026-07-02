import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneContainer } from "../components/SceneContainer";
import { colors } from "../theme";

export const Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleTranslate = interpolate(frame, [0, 0.6 * fps], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subOpacity = interpolate(frame, [0.8 * fps, 1.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneContainer>
      <div
        style={{
          opacity: titleOpacity,
          translate: `0px ${titleTranslate}px`,
          fontSize: 88,
          fontWeight: 700,
          color: colors.textPrimary,
          textAlign: "center",
          maxWidth: 1500,
          lineHeight: 1.15,
        }}
      >
        Bilim ulashing.
        <br />
        Tezroq o'rganing.
      </div>
      <div
        style={{
          opacity: subOpacity,
          fontSize: 40,
          color: colors.textSecondary,
          textAlign: "center",
          maxWidth: 1300,
        }}
      >
        Barcha o'quv materiallari — bitta markazlashgan platformada
      </div>
    </SceneContainer>
  );
};
