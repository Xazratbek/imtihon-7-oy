import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fontFamily, safeArea } from "../theme";

export const SceneContainer: React.FC<{
  children: React.ReactNode;
  background?: string;
}> = ({ children, background = colors.bg }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: background,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: safeArea.paddingX,
        paddingRight: safeArea.paddingX,
        paddingTop: safeArea.paddingY,
        paddingBottom: safeArea.paddingY,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          width: "100%",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
