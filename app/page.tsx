import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import LearnSinging from "@/app/components/LearnSinging";
import Gallery from "@/app/components/Gallery";
import JoinUs from "@/app/components/JoinUs";
import Footer from "@/app/components/Footer";

export default function Page() {
  return (
    <main className="bg-[#f8f9fc] text-gray-900">
      <Navbar />
      <Hero />
      <About />
      <LearnSinging />
      <Gallery />
      <JoinUs />
      <Footer />
    </main>
  );
}
