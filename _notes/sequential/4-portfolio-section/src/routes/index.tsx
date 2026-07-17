import { createFileRoute } from "@tanstack/react-router";
import { Nav, BackToTop } from "@/components/visune/Nav";
import {
  Hero,
  BringToLife,
  Featured,
  Footer,
} from "@/components/visune/Sections";


export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Nav />
      <main id="main">
        <Hero />
        <BringToLife />
        <Featured />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
