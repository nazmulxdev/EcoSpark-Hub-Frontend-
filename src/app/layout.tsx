import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://ecospark-hub.vercel.app";

export const metadata: Metadata = {
  title: "EcoSpark Hub - Sustainable Ideas Community",
  description:
    "Connecting visionary minds with sustainable solutions to build a regenerative future for all.",
  keywords: "sustainability, eco-friendly, green ideas, community, environment",
  authors: [{ name: "Md.Nazmul Hossen", url: "https://ecosparkhub.com" }],
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "EcoSpark Hub - Sustainable Ideas Community",
    description:
      "Connecting visionary minds with sustainable solutions to build a regenerative future for all.",
    url: "https://ecosparkhub.com",
    siteName: "EcoSpark Hub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoSpark Hub - Sustainable Ideas Community",
    description:
      "Connecting visionary minds with sustainable solutions to build a regenerative future for all.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
