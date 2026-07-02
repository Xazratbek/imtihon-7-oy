import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneContainer } from "../components/SceneContainer";
import { colors } from "../theme";

const items = [
  "Telegram guruhlarida konspektlar yo'qolib ketadi",
  "Bir xil referatlar qayta-qayta yoziladi",
  "Sifatli materialni topish ko'p vaqt oladi",
];

const ItemRow: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = delay;
  const dur = 0.5 * fps;

  const opacity = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translate = interpolate(frame, [start, start + dur], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        opacity,
        translate: `0px ${translate}px`,
        display: "flex",
        alignItems: "center",
        gap: 28,
        fontSize: 42,
        color: colors.textPrimary,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: 999,
          backgroundColor: colors.textPrimary,
          flexShrink: 0,
        }}
      />
      {text}
    </div>
  );
};

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <SceneContainer>
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 76,
          fontWeight: 700,
          color: colors.textPrimary,
          textAlign: "center",
          maxWidth: 1400,
          marginBottom: 20,
        }}
      >
        O'quv materiallari hamma joyda sochilib yotibdi
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
        {items.map((text, i) => (
          <ItemRow key={text} text={text} delay={0.7 * fps + i * 0.5 * fps} />
        ))}
      </div>
    </SceneContainer>
  );
};
