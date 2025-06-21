// app/page.tsx
import Navbar from "./home/navbar/page";
import Hero from "./home/hero/page";
import Contact from './contact/page';
import About from './about/page';

export default function Home() {
  return (
    <main className="pt-16">
      <Navbar />
      <Hero />
      <About />
      <Contact />
    </main>
  );
}
