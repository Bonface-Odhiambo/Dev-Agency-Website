import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Kalocode Logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Kalocode
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/"
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === "/" ? "text-primary" : ""
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about"
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === "/about" ? "text-primary" : ""
              }`}
            >
              About
            </Link>
            <Link 
              to="/services"
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === "/services" ? "text-primary" : ""
              }`}
            >
              Services
            </Link>
            <Link 
              to="/projects"
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === "/projects" ? "text-primary" : ""
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/contact"
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === "/contact" ? "text-primary" : ""
              }`}
            >
              Contact
            </Link>
            <div className="flex items-center gap-3 ml-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
