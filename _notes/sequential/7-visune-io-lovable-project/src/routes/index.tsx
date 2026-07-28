import { createFileRoute } from "@tanstack/react-router";
import { Nav, BackToTop } from "@/components/Nav";
import {
  Hero,
  LogosStrip,
  BringToLife,
  SubscribeAndSave,
  Featured,
  SyncSection,
  Testimonials,
  BlenderPromo,
  GoToResources,
  IndustrialEssentials,
  BeforeAfter,
  BuildYourImage,
  WhyChoose,
  FinalCTA,
  Footer,
} from "@/components/Sections";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogosStrip />
        <BringToLife />
        <SubscribeAndSave />
        <Featured />
        <SyncSection />
        <Testimonials />
        <BlenderPromo />
        <GoToResources />
        <IndustrialEssentials />
        <BeforeAfter />
        <BuildYourImage />
        <WhyChoose />
        <FinalCTA />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
