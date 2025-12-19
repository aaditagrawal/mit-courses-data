import { getAllCourses } from '@/lib/courses';
import { getAllDegreeSummaries } from '@/lib/degrees';
import { GlobalLayout } from '@/components/GlobalLayout';
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MIT Manipal Courses",
  description: "Course browser for MIT Manipal Academic Year 2025-2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const courses = getAllCourses();
  const degrees = getAllDegreeSummaries();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/commit-mono@1.143.0/commit-mono.min.css" rel="stylesheet" />
        <script defer src="https://stat.sys256.com/script.js"></script>
      </head>
      <body
        className={`${instrumentSans.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalLayout courses={courses} degrees={degrees}>
            {children}
          </GlobalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
