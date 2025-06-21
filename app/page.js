
// app/page.tsx
import Navbar from "./home/navbar/page";
import Hero from "./home/hero/page";
import Contact from './contact/page';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Contact />
    </main>
  );
}
