import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { personal } from "@/lib/data/personal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pk9125886-stack.github.io/portfolio-1";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} | ${personal.title}`,
    template: `%s | ${personal.name}`,
  },
  description: personal.tagline,
  keywords: [
    "Pankaj Kumar",
    "Website Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Web Developer",
    "UI/UX",
    "JavaScript",
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${personal.name} Portfolio`,
    title: `${personal.name} | ${personal.title}`,
    description: personal.tagline,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${personal.name} - Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | ${personal.title}`,
    description: personal.tagline,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: personal.title,
  description: personal.bio,
  url: siteUrl,
  sameAs: [personal.social.github, personal.social.linkedin],
  knowsAbout: ["Frontend Development", "React", "JavaScript", "UI/UX Design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
