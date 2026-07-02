import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneContainer } from "../components/SceneContainer";
import { colors } from "../theme";

const stack = ["Django REST Framework", "React", "PostgreSQL", "Celery + Redis", "Groq AI", "JWT"];

const Badge: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [delay, delay + 15], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        opacity,
        scale,
        border: `2px solid ${colors.border}`,
        borderRadius: 16,
        padding: "20px 36px",
        fontSize: 34,
        fontWeight: 600,
        color: colors.textPrimary,
      }}
    >
      {label}
    </div>
  );
};

export const TechStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], { extrapolateRight: "clamp" });

  return (
    <SceneContainer>
      <div style={{ opacity: titleOpacity, fontSize: 72, fontWeight: 700, color: colors.textPrimary, textAlign: "center", marginBottom: 20 }}>
        Zamonaviy texnologiyalar
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 24,
          maxWidth: 1400,
        }}
      >
        {stack.map((label, i) => (
          <Badge key={label} label={label} delay={0.5 * fps + i * 8} />
        ))}
      </div>
    </SceneContainer>
  );
};
