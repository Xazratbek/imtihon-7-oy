import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneContainer } from "../components/SceneContainer";
import { Wordmark } from "../components/Logo";
import { colors } from "../theme";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOpacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const logoScale = interpolate(frame, [0, 0.6 * fps], [0.85, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const badgeOpacity = interpolate(frame, [0.7 * fps, 1.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgeTranslate = interpolate(frame, [0.7 * fps, 1.3 * fps], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneContainer>
      <div style={{ opacity: logoOpacity, scale: logoScale }}>
        <Wordmark size={96} />
      </div>
      <div
        style={{
          opacity: badgeOpacity,
          translate: `0px ${badgeTranslate}px`,
          fontSize: 40,
          color: colors.textSecondary,
          textAlign: "center",
          maxWidth: 1200,
        }}
      >
        Talabalar uchun bilim va fayl almashish platformasi
      </div>
    </SceneContainer>
  );
};
