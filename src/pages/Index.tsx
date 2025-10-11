import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CosmicVortex from "@/components/CosmicVortex";
import MorphingShape from "@/components/MorphingShape";
import Projects from "@/components/Projects";
import InnovativeApproach from "@/components/InnovativeApproach";
import Expertise from "@/components/Expertise";
import TechStack from "@/components/TechStack";
import OurApproach from "@/components/OurApproach";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Animation Section */}
      <section className="relative w-full h-[400px] bg-black overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="h-full">
            <CosmicVortex />
          </div>
          <div className="h-full">
            <MorphingShape />
          </div>
        </div>
      </section>
      
      <Projects />
      <InnovativeApproach />
      <Expertise />
      <TechStack />
      <OurApproach />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
