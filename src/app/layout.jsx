import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, ThemeProvider } from "@/providers";
import { Footer, Header } from "@/components/layouts";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BackgroundBeams } from "@/components/ui/background-beams";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nexus",
  description: "Crypto, weather, news and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "development" && (
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClient>
            <TooltipProvider>
              <section className="grid grid-rows-[1fr_auto] min-h-dvh relative z-10">
                <Header />
                <main className="pt-[85px] h-full">
                  <section className="max-w-7xl mx-auto p-4 border-x border-dashed h-full">
                    {children}
                  </section>
                </main>
                <Footer />
              </section>
              <BackgroundBeams />
            </TooltipProvider>
          </QueryClient>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
