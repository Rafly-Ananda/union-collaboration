import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-[#F4EDE3] px-20">
      <Navbar />
      <div className="mt-[15vh] w-full">{children}</div>
      <Footer />
    </main>
  );
}
