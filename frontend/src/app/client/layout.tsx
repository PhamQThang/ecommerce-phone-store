import ClientHeader from "@/components/client/ClientHeader";
import Footer from "@/components/client/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <ClientHeader />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </div>
  );
}
