import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import CTA from "@/components/CTA";
import { Footer } from "@piskacek/ui";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <CTA />
      <Footer tagline="Dělám to rád, víc než 20 let." className="py-12 sm:py-16" />
    </main>
  );
}
