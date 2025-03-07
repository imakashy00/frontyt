import Protected from "@/components/Protected";
import StructuredData from "@/components/StructuredData";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Ytnotes - Generate AI notes from youtube url",
    template: "%s | Ytnotes",
  },
  description:
    "Generate comprehensive AI notes on Youtube video url with smart AI and AI chatbot",
  keywords: [
    "Note Taking",
    "Youtube",
    "Video Notes",
    "AI Notes",
    "Productivity",
    "Youtube AI Notes",
    "Video AI Notes",
    "Save time in making notes",
    "Manage AI generated notes",
    "Learn fast from youtube",
    "Best way to learn from youtbe videos",
    "Ai notes",
    "Youtube chatgpt",
  ],
  authors: [{ name: "Akash Yadav" }],
  creator: "Akash Yadav",
  publisher: "Ytnotes",
  metadataBase: new URL("https://ytnotes.co"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ytnotes - Generate AI notes from youtube url",
    description:
      "Generate comprehensive AI notes on Youtube video url with smart AI and AI chatbot",
    url: "https://ytnotes.co",
    siteName: "Ytontes",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ytnotes.co/",
        width: 1200,
        height: 630,
        alt: "Ytnotes Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ytnotes - Generates AI from youtube url",
    description:
      "Generate comprehensive AI notes on Youtube video url with smart AI and AI chatbot",
    images: ["https://ytnotes.co/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <StructuredData />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J7VMQPFN1K"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'G-J7VMQPFN1K');
          `}
        </Script>
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-[#ffffff]`}
      >
        <AuthProvider>
          <Protected>{children}</Protected>
        </AuthProvider>
      </body>
    </html>
  );
}
