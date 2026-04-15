import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Driving — Master the Road",
  description:
    "Experience precision driving education like never before. Tech Driving blends cutting-edge simulation with expert instruction for a next-generation driving school experience.",
  keywords: ["driving school", "learn to drive", "RTO test", "tech driving", "driving lessons"],
  openGraph: {
    title: "Tech Driving — Master the Road",
    description: "Next-generation driving education. Scroll to experience.",
    type: "website",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise antialiased">{children}</body>
    </html>
  );
}