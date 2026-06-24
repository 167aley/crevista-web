import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CREVISTA — Find, Analyze & Close Commercial Real Estate Deals",
    template: "%s · CREVISTA",
  },
  description:
    "CREVISTA is the commercial real estate intelligence platform to discover, analyze, and close on office, retail, industrial, multifamily, and 1031 exchange deals.",
  metadataBase: new URL("https://crevista.example"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-white text-ink">{children}</body>
    </html>
  );
}
