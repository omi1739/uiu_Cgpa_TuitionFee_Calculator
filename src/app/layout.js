import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UIU CGPA Calculator | United International University - GPA & Tuition Fee Planner",
  description: "Free UIU CGPA calculator for United International University students. Calculate semester GPA, cumulative CGPA, and tuition fees with scholarship waivers. Official UIU grading scale, semester planner, and fee estimator.",
  keywords: "UIU CGPA calculator, United International University CGPA, UIU GPA calculator, UIU tuition fee calculator, Bangladesh university CGPA, UIU grading scale, UIU scholarship calculator, academic planner, semester GPA calculator",
  openGraph: {
    title: "UIU CGPA Calculator | United International University",
    description: "Calculate your semester GPA and cumulative CGPA using United International University's official grading policy. Includes tuition fee estimator with waiver and scholarship calculator.",
    type: "website",
    siteName: "UIU CGPA Calculator",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "UIU CGPA Calculator | United International University",
    description: "Free UIU CGPA and tuition fee calculator for United International University students. Grade planner, scholarship waiver estimator, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#f97316",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "UIU CGPA Calculator",
        "description": "A comprehensive academic planning tool for United International University students. Calculate semester GPA, cumulative CGPA, tuition fees, and scholarship waivers.",
        "applicationCategory": "Educational Application",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "author": {
          "@type": "Organization",
          "name": "United International University",
          "url": "https://www.uiu.ac.bd"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BDT"
        }
      },
      {
        "@type": "Organization",
        "name": "United International University",
        "alternateName": "UIU",
        "url": "https://www.uiu.ac.bd",
        "description": "United International University (UIU) is a leading private university in Bangladesh offering undergraduate and graduate programs.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BD"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
