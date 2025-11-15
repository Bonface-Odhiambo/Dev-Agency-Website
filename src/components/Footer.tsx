import { Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-darker-bg text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Kalocode Logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Kalocode
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
          
          <div className="flex gap-8">
            <a 
              href="https://www.instagram.com/kalocode"
              target="_blank"
              rel="noopener noreferrer" 
              className="hover:text-neon-pink transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://x.com/odhiambookello5"
              target="_blank"
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
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
