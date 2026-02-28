import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "JakSpot - Jelajahi Pesona Jakarta",
  description: "Portal informasi lengkap tentang Jakarta. Temukan destinasi wisata, kuliner khas Betawi, dan budaya Jakarta dalam satu platform digital yang memukau.",
  keywords: ["Jakarta", "wisata Jakarta", "kuliner Betawi", "budaya Jakarta", "Monas", "Kota Tua", "travel Indonesia"],
  authors: [{ name: "JakSpot Team" }],
  openGraph: {
    title: "JakSpot - Jelajahi Pesona Jakarta",
    description: "Portal informasi lengkap tentang Jakarta dengan pengalaman visual yang memukau",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "JakSpot - Jelajahi Pesona Jakarta",
    description: "Portal informasi lengkap tentang Jakarta dengan pengalaman visual yang memukau",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
