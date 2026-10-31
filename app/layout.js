import { Cormorant_Garamond, Great_Vibes, Dancing_Script } from "next/font/google";
import "./globals.css";

const hand = Dancing_Script({ subsets: ["latin", "vietnamese"], variable: "--hand" });
const serif = Cormorant_Garamond({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--serif" });
const script = Great_Vibes({ subsets: ["latin", "vietnamese"], weight: "400", variable: "--script" });

export const metadata = {
  title: "Thiệp mời tốt nghiệp",
  description: "Trân trọng kính mời bạn đến dự lễ tốt nghiệp",
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#6a97cd" };

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${serif.variable} ${script.variable} ${hand.variable}`}>{children}</body>
    </html>
  );
}
