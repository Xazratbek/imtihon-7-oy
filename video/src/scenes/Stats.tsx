import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneContainer } from "../components/SceneContainer";
import { colors } from "../theme";

const stats = [
  { value: 1000, label: "Ulashilgan materiallar" },
  { value: 500, label: "Talabalar" },
  { value: 20, label: "Fanlar" },
];

const CountUp: React.FC<{ value: number; delay: number }> = ({ value, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = 1.1 * fps;

  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const current = interpolate(frame, [delay, delay + dur], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div style={{ opacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ fontSize: 96, fontWeight: 800, color: colors.textPrimary }}>
        {Math.round(current)}+
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], { extrapolateRight: "clamp" });

  return (
    <SceneContainer>
      <div style={{ opacity: titleOpacity, fontSize: 72, fontWeight: 700, color: colors.textPrimary, textAlign: "center", marginBottom: 20 }}>
        Talabalar uchun yaratilgan
      </div>
      <div style={{ display: "flex", gap: 100, justifyContent: "center" }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <CountUp value={s.value} delay={0.5 * fps + i * 10} />
            <div style={{ fontSize: 34, color: colors.textSecondary }}>{s.label}</div>
          </div>
        ))}
      </div>
    </SceneContainer>
  );
};
