import React from "react";
import { colors } from "../theme";

export const GraduationCapIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = colors.textPrimary,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M2 9 L12 4 L22 9 L12 14 Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M6 11.2 V16 C6 18 9 19.4 12 19.4 C15 19.4 18 18 18 16 V11.2"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M22 9 V15" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
};

export const Wordmark: React.FC<{ size?: number; color?: string; iconSize?: number }> = ({
  size = 64,
  color = colors.textPrimary,
  iconSize,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.28 }}>
      <GraduationCapIcon size={iconSize ?? size} color={color} />
      <span
        style={{
          fontSize: size,
          fontWeight: 700,
          color,
          letterSpacing: -1,
        }}
      >
        EduShare
      </span>
    </div>
  );
};
