import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Reveal>
        <About />
      </Reveal>
      <Reveal delay={0.1}>
        <Services />
      </Reveal>
      <Reveal delay={0.1}>
        <Projects />
      </Reveal>
      <Reveal delay={0.1}>
        <Contact />
      </Reveal>
      <Footer />
    </main>
  );
}
