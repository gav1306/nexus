import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, ThemeProvider } from "@/providers";
import { Footer, Header } from "@/components/layouts";
import { Toaster } from "@/components/ui/sonner";

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
            <section className="grid grid-rows-[auto_1fr_auto] min-h-dvh">
              <Header />
              <main>
                <section className="max-w-7xl mx-auto p-4">{children}</section>
              </main>
              <Footer />
            </section>
          </QueryClient>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
