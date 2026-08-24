import type { Metadata } from "next";
import { Instrument_Serif, Work_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Divinus — A mensagem descomplicada de Deus para você",
  description:
    "Água, roupas de performance e essenciais que carregam uma mensagem: um versículo, uma reflexão, um QR Code que leva à mensagem certa para o seu momento.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${instrumentSerif.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
