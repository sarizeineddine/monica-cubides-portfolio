import { useLenis } from "@/hooks/useLenis";
import { useTheme } from "@/hooks/useTheme";
import AnimatedBackground from "@/components/AnimatedBackground";
import BackgroundIcons from "@/components/BackgroundIcons";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WealthEngine from "@/components/WealthEngine";
import Credentials from "@/components/Credentials";
import Services from "@/components/Services";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  useLenis();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-ink text-paper">
      <AnimatedBackground />
      <BackgroundIcons />
      <CursorGlow />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative z-10">
        <Hero />
        <About />
        <WealthEngine />
        <Credentials />
        <Services />
        <SelectedWork />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
