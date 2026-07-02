import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneContainer } from "../components/SceneContainer";
import { Wordmark } from "../components/Logo";
import { colors } from "../theme";

export const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleTranslate = interpolate(frame, [0, 0.6 * fps], [24, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const logoOpacity = interpolate(frame, [0.9 * fps, 1.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneContainer>
      <div
        style={{
          opacity: titleOpacity,
          translate: `0px ${titleTranslate}px`,
          fontSize: 76,
          fontWeight: 700,
          color: colors.textPrimary,
          textAlign: "center",
          maxWidth: 1400,
          lineHeight: 1.2,
        }}
      >
        Bugundan bilim ulashishni boshlang
      </div>
      <div style={{ opacity: logoOpacity, marginTop: 20 }}>
        <Wordmark size={64} color={colors.textSecondary} />
      </div>
    </SceneContainer>
  );
};
