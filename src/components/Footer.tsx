import { Twitter, Facebook, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-darker-bg text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Function Call Logo" className="h-8 w-8 rounded-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Function Call
            </span>
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="/contact" target="_blank" rel="noopener noreferrer" className="hover:text-neon-pink transition-colors">
              Contact Us
            </a>
            <a href="/about" target="_blank" rel="noopener noreferrer" className="hover:text-neon-pink transition-colors">
              About Us
            </a>
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-neon-pink transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-neon-pink transition-colors">
              Terms of Service
            </a>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="#" 
              className="hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
