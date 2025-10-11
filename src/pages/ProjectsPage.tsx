import Navbar from "@/components/Navbar";
import MorphingShape from "@/components/MorphingShape";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <MorphingShape />
        <Projects />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
