import Navbar from "@/components/Navbar";
import Expertise from "@/components/Expertise";
import InnovativeApproach from "@/components/InnovativeApproach";
import TechStack from "@/components/TechStack";
import OurApproach from "@/components/OurApproach";
import Footer from "@/components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Expertise />
        <InnovativeApproach />
        <TechStack />
        <OurApproach />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
