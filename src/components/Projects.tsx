import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "linktree-clone",
    title: "LinkTree Clone",
    description: "A customizable bio link platform that allows creators to showcase all their important links in one beautiful page. Perfect for social media profiles.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    tags: ["Social Media", "Creator Tools", "Landing Page"]
  },
  {
    id: "youtube-patreon-clone",
    title: "YouTube / Patreon Clone",
    description: "A complete video streaming and creator monetization platform with subscriptions, memberships, and exclusive content features.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop",
    tags: ["Video Streaming", "Monetization", "Subscriptions"]
  },
  {
    id: "onlyfans-clone",
    title: "OnlyFans Clone",
    description: "A premium content subscription platform enabling creators to monetize exclusive content with tiered memberships and pay-per-view features.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop",
    tags: ["Content Platform", "Subscriptions", "Creator Economy"]
  },
  {
    id: "celebrity-website",
    title: "Celebrity Website",
    description: "A stunning portfolio website for celebrities featuring image galleries, social links, booking system, event calendar, and fan engagement tools.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop",
    tags: ["Portfolio", "Booking", "Events"]
  },
  {
    id: "amazon-whatnot-clone",
    title: "Amazon / Whatnot Clone",
    description: "A full-featured e-commerce and live shopping platform with product listings, live auctions, seller dashboards, and integrated payment processing.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    tags: ["E-commerce", "Live Shopping", "Marketplace"]
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "An AI-powered personal assistant app that helps manage daily tasks with ease and efficiency.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    tags: ["AI", "Productivity", "Automation"]
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link key={index} to={`/project/${project.id}`}>
              <Card 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-border/50 cursor-pointer h-full"
              >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Clone
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
