import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ClientShell from "./client-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://uiu-cgpa-calculator.vercel.app"),
  title: "UIU CGPA & Tuition Fee Calculator | UIU Student Planner",
  description: "Easily calculate your UIU CGPA, simulate course retakes, and estimate your trimester tuition fees with our free United International University planning tool.",
  keywords: "UIU CGPA calculator, United International University CGPA, UIU GPA calculator, UIU tuition fee calculator, Bangladesh university CGPA, UIU grading scale, UIU scholarship calculator, academic planner, semester GPA calculator",
  openGraph: {
    title: "UIU CGPA Calculator | United International University",
    description: "Calculate your semester GPA and cumulative CGPA using United International University's official grading policy. Includes tuition fee estimator with waiver and scholarship calculator.",
    type: "website",
    siteName: "UIU CGPA Calculator",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UIU CGPA Calculator | United International University",
    description: "Free UIU CGPA and tuition fee calculator for United International University students. Grade planner, scholarship waiver estimator, and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
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
    "google-site-verification": "EGVWJRDtLnYx6KpCn_72hTaxMWLVQkRMK6-M1AkE68o",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "UIU CGPA Calculator",
        "url": "https://uiu-cgpa-calculator.vercel.app",
        "description": "A comprehensive academic planning tool for United International University students. Calculate semester GPA, cumulative CGPA, tuition fees, and scholarship waivers using the official UIU grading scale.",
        "applicationCategory": "EducationalApplication",
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
        },
        "featureList": "CGPA Calculator, Tuition Fee Calculator, Target CGPA Planner, Waiver Assistant, Grade Scale Reference",
        "screenshot": "https://uiu-cgpa-calculator.vercel.app/og-image.png"
      },
      {
        "@type": "WebPage",
        "name": "UIU CGPA Calculator - GPA & Tuition Fee Planner",
        "description": "Calculate your semester GPA and cumulative CGPA using United International University's official grading policy. Free tuition fee estimator with waiver and scholarship calculator for UIU students.",
        "url": "https://uiu-cgpa-calculator.vercel.app",
        "inLanguage": "en",
        "isAccessibleForFree": true,
        "about": {
          "@type": "Thing",
          "name": "UIU CGPA Calculation"
        }
      },
      {
        "@type": "Organization",
        "name": "United International University",
        "alternateName": "UIU",
        "url": "https://www.uiu.ac.bd",
        "description": "United International University (UIU) is a leading private university in Bangladesh offering undergraduate and graduate programs in engineering, business, and social sciences.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is GPA calculated at UIU?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GPA is calculated by dividing total grade points earned by total credits attempted. Each letter grade (A=4.00, A-=3.67, B+=3.33, etc.) has a corresponding grade point. Multiply each course's credit hours by its grade point, sum them up, and divide by total credits."
            }
          },
          {
            "@type": "Question",
            "name": "What is the passing mark at United International University?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The minimum passing mark at UIU is 55%, which corresponds to a D grade. Any mark below 55% results in an F grade and requires retaking the course."
            }
          },
          {
            "@type": "Question",
            "name": "How does UIU retake grading work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When you retake a course at UIU, the new grade replaces the old one in your CGPA calculation. First retakes receive a 50% discount on the per-credit tuition fee."
            }
          },
          {
            "@type": "Question",
            "name": "What are the UIU scholarship requirements for SSC and HSC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "UIU offers a 50% tuition waiver for SSC GPA 5.00 (with 4th subject) and HSC GPA 5.00 (without 4th subject), and a 25% waiver for SSC GPA 4.50 (with 4th subject) and HSC GPA 5.00 (with 4th subject). For English Medium, 50% waiver requires 5 A's in O-Level and 2 A's in A-Level. Waiver applies to the credit fee portion only."
            }
          },
          {
            "@type": "Question",
            "name": "How are UIU tuition fees divided into installments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "UIU tuition fees are split into three installments: 40%, 30%, and 30%. Optional fees like transportation and gym are added to the first installment."
            }
          }
        ]
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
        <ClientShell>{children}</ClientShell>
        <Analytics />
      </body>
    </html>
  );
}
