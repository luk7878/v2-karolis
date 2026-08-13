import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./inner.css";
import "./admin.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CONSUST — Kuriame ateities kryptį",
  description:
    "Jaunimo karjera, skaitmeniniai įgūdžiai, tvarumas ir įtraukus sportas Lietuvoje bei Europoje.",
  metadataBase: new URL("https://consust-tvari-ateitis.lzaksas.chatgpt.site"),
  openGraph: {
    title: "CONSUST — Ateitis yra kryptis, kurią kuriame",
    description:
      "Jaunimo karjera, skaitmeniniai įgūdžiai, tvarumas ir įtraukus sportas.",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 909,
        alt: "CONSUST — kuriame ateities kryptį.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt">
      <body className={`${geist.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
