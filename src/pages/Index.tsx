import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
