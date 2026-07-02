import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneContainer } from "../components/SceneContainer";
import { colors } from "../theme";

const features = [
  { title: "Fayl almashish", desc: "PDF, DOCX va PPTX materiallarni yuklang va toping" },
  { title: "Aqlli qidiruv", desc: "Fan, teg va kalit so'zlar orqali kerakli manbani toping" },
  { title: "Baholash", desc: "Layk va dislayk orqali sifatli kontent ajralib turadi" },
  { title: "Statistika", desc: "Yuklab olishlar va mashhurlikni kuzatib boring" },
];

const ITEM_DURATION = 48;
const FADE = 8;

export const getFeaturesDuration = () => features.length * ITEM_DURATION;

const FeatureSlot: React.FC<{
  title: string;
  desc: string;
  windowStart: number;
}> = ({ title, desc, windowStart }) => {
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
      <div style={{ fontSize: 38, color: colors.textSecondary, textAlign: "center", maxWidth: 1100 }}>
        {desc}
      </div>
    </div>
  );
};

export const Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <SceneContainer>
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 72,
          fontWeight: 700,
          color: colors.textPrimary,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Bir joyda — hammasi bor
      </div>
      <div style={{ position: "relative", height: 220, display: "flex", justifyContent: "center", width: "100%" }}>
        {features.map((f, i) => (
          <FeatureSlot key={f.title} title={f.title} desc={f.desc} windowStart={i * ITEM_DURATION} />
        ))}
      </div>
    </SceneContainer>
  );
};
