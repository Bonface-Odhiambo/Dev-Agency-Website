import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number (format: country code + number, no spaces or special characters)
    const phoneNumber = "1234567890"; // Example: "1234567890"
    const message = "Hello! I'm interested in your services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 p-0"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </Button>
  );
};

export default WhatsAppButton;
