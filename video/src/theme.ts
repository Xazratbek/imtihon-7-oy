import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const colors = {
  bg: "#FFFFFF",
  bgSoft: "#F9FAFB",
  border: "#E5E7EB",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  accent: "#111827",
  accentSoft: "#F3F4F6",
};

export const safeArea = {
  paddingX: 140,
  paddingY: 120,
};
