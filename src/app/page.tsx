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
      <Footer tagline="20 let programuju. 1 cíl." className="py-12 sm:py-16" />
    </main>
  );
}
