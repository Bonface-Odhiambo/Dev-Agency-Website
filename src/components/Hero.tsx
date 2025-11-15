import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-block px-4 py-1 bg-gradient-to-r from-neon-purple/30 to-neon-pink/30 border border-neon-purple/50 rounded-full mb-6 backdrop-blur-sm">
          <span className="text-sm font-medium text-white">
            Kalocode - Software Development Agency
          </span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white animate-fade-in">
          Building the Future,
          <br />
          <span className="bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
            One Function at a Time
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          We craft innovative software solutions that transform businesses. From concept to deployment, we turn your vision into powerful digital experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-gradient-to-r from-neon-purple to-neon-pink hover:shadow-lg hover:shadow-neon-pink/50 text-white font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
          >
            Start Your Project
          </Button>
          <Link to="/about">
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
