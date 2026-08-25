import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AutoRefresh } from "@/components/AutoRefresh";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoRefresh />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
