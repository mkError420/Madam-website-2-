import Hero from "../components/Hero";
import MusicSection from "../components/MusicSection";
import VideosSection from "../components/VideosSection";
import TourDates from "../components/TourDates";
import Gallery from "../components/Gallery";
import About from "../components/About";
import LatestRelease from "../components/LatestRelease";
import PressQuotes from "../components/PressQuotes";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="space-y-0">
        <LatestRelease />
        <TourDates />
        <MusicSection />
        <VideosSection />
        <PressQuotes />
        <About />
        <Gallery />
        <Newsletter />
      </div>
    </>
  );
}
