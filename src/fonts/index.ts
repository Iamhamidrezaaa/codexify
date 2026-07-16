import localFont from "next/font/local";

/**
 * Peyda — primary typeface for Codexify (Persian-first).
 * All weights registered via next/font/local. No Google Fonts.
 */
export const peyda = localFont({
  src: [
    { path: "./peyda/Peyda-Thin.ttf", weight: "100", style: "normal" },
    { path: "./peyda/Peyda-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./peyda/Peyda-Light.ttf", weight: "300", style: "normal" },
    { path: "./peyda/Peyda-Regular.ttf", weight: "400", style: "normal" },
    { path: "./peyda/Peyda-Medium.ttf", weight: "500", style: "normal" },
    { path: "./peyda/Peyda-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./peyda/Peyda-Bold.ttf", weight: "700", style: "normal" },
    { path: "./peyda/Peyda-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./peyda/Peyda-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-peyda",
  display: "swap",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});
