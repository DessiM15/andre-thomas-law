import { Bodoni_Moda, Inter } from "next/font/google";

/** Loaded once and shared by both root layouts so the two trees can't drift. */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const fontVars = `${bodoni.variable} ${inter.variable}`;
