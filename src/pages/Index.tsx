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
      
      {/* Interactive Showcase Section */}
      <section className="relative w-full bg-gradient-to-b from-darker-bg via-black to-darker-bg py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border border-neon-purple/30 rounded-full mb-4">
              <span className="text-sm font-medium bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                Interactive Showcase
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Innovation in Motion
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the future of properly crafted solutions.Permit us to solve your problems.
            </p>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Decorative gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-transparent to-neon-pink/10 pointer-events-none rounded-2xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 h-[450px] gap-1 bg-gradient-to-r from-primary/20 via-neon-purple/20 to-neon-pink/20 rounded-2xl overflow-hidden shadow-2xl shadow-neon-purple/20">
            <div className="relative h-full bg-black overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-neon-purple/30">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              <CosmicVortex />
            </div>
            
            <div className="relative h-full bg-black overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-neon-pink/30">
              <div className="absolute inset-0 bg-gradient-to-bl from-neon-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              <MorphingShape />
            </div>
          </div>
        </div>
        
        {/* Bottom fade transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted to-transparent pointer-events-none"></div>
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
