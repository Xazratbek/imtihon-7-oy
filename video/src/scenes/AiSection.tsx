import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneContainer } from "../components/SceneContainer";
import { colors } from "../theme";

const capabilities = [
  { title: "AI Xulosa", desc: "Hujjatni yuklang, AI qisqa va tushunarli xulosa chiqarib beradi" },
  { title: "AI Referat", desc: "Mavzuni yozing — AI boshlang'ich referat yoki konspekt tayyorlaydi" },
  { title: "AI bilan suhbat", desc: "Fayl haqida savol bering, AI aynan shu material asosida javob beradi" },
];

const ITEM_DURATION = 52;
const FADE = 8;

export const getAiSectionCapabilitiesDuration = () => capabilities.length * ITEM_DURATION;

const CapabilitySlot: React.FC<{ title: string; desc: string; windowStart: number }> = ({
  title,
  desc,
  windowStart,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - windowStart;

  const opacity = interpolate(
    localFrame,
    [0, FADE, ITEM_DURATION - FADE, ITEM_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const translate = interpolate(localFrame, [0, FADE], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        opacity,
        translate: `0px ${translate}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div style={{ fontSize: 56, fontWeight: 700, color: colors.textPrimary }}>{title}</div>
      <div style={{ fontSize: 38, color: colors.textSecondary, textAlign: "center", maxWidth: 1200 }}>
        {desc}
      </div>
    </div>
  );
};

export const AiSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], { extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [0.3 * fps, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneContainer>
      <div style={{ opacity: titleOpacity, fontSize: 72, fontWeight: 700, color: colors.textPrimary, textAlign: "center" }}>
        AI yordamida o'rganish
      </div>
      <div style={{ opacity: subOpacity, fontSize: 32, color: colors.textSecondary, marginBottom: 20 }}>
        AI — asosiy mahsulot emas, foydali qo'shimcha
      </div>
      <div style={{ position: "relative", height: 220, display: "flex", justifyContent: "center", width: "100%" }}>
        {capabilities.map((c, i) => (
          <CapabilitySlot key={c.title} title={c.title} desc={c.desc} windowStart={i * ITEM_DURATION} />
        ))}
      </div>
    </SceneContainer>
  );
};
