import { Cpu, Palette, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const approaches = [
  {
    icon: Cpu,
    title: "Cutting-edge Technology",
    description: "We leverage the latest technologies to deliver state-of-the-art solutions that meet modern business needs."
  },
  {
    icon: Palette,
    title: "Creative Design",
    description: "Our design team creates visually stunning and user-friendly interfaces for an optimal user experience."
  },
  {
    icon: Users,
    title: "Customer-Centric Approach",
    description: "We prioritize understanding our clients' needs to deliver tailored solutions that exceed expectations."
  }
];

const InnovativeApproach = () => {
  return (
    <section className="py-20 bg-darker-bg text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12">Our Innovative Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approaches.map((approach, index) => {
            const Icon = approach.icon;
            return (
              <Card 
                key={index}
                className="bg-card/50 border-border/30 backdrop-blur-sm hover:bg-card/70 transition-all duration-300"
              >
                <CardHeader>
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl text-white">{approach.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {approach.description}
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

export default InnovativeApproach;
