import Hero from "../components/Hero";
import MusicSection from "../components/MusicSection";
import VideosSection from "../components/VideosSection";
import TourDates from "../components/TourDates";
import Gallery from "../components/Gallery";
import About from "../components/About";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="space-y-12">
        <MusicSection />
        <VideosSection />
        <TourDates />
        <About />
        <Gallery />
      </div>
    </>
  );
}
