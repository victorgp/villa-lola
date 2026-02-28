import { use } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Spaces from "@/components/Spaces";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Activities from "@/components/Activities";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <>
      <JsonLd locale={locale} />
      <main>
        <Navbar />
        <Hero />
        <About />
        <Spaces />
        <Gallery />
        <Location />
        <Activities />
        <Booking />
        <Footer />
      </main>
    </>
  );
}
