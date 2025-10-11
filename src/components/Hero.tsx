import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
import AnimatedObject3D from "@/components/AnimatedObject3D";

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white animate-fade-in">
              Showcasing Innovation
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Explore our diverse range of projects. Creativity meets technology in every endeavor.
            </p>
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Discover More
            </Button>
          </div>
          <div className="h-[400px] lg:h-[500px] w-full">
            <AnimatedObject3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
