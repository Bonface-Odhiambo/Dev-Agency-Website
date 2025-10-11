import { Search, Palette, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Research & Planning",
    description: "We start by understanding your business needs to create a tailored strategy."
  },
  {
    icon: Palette,
    title: "Design & Development",
    description: "Our team crafts bespoke solutions that align with your business goals."
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description: "We ensure a seamless launch and provide ongoing support to optimize performance."
  }
];

const OurApproach = () => {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="bg-white text-foreground hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <Icon className="h-12 w-12 text-secondary mb-4" />
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
