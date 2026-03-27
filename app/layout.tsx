import type { Metadata } from "next";
import { Playfair_Display, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import PageLoader from "./components/PageLoader";

const playfair = Playfair_Display({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Studio Think — Creative Design Studio",
  description:
    "Studio Think is a creative design studio where strategy meets craft. We specialize in brand identity, digital design, and print & packaging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} ${caveat.variable}`}
    >
      <body style={{ cursor: 'none' }}>
        <PageLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
