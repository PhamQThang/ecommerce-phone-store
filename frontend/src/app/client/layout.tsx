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
      <main>{children}</main>
      <Footer />
    </div>
  );
}
