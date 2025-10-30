import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "linktree-clone",
    title: "LinkTree Clone",
    description: "A customizable bio link platform that allows creators to showcase all their important links in one beautiful page. Perfect for social media profiles.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    tags: ["Social Media", "Creator Tools", "Landing Page"],
    demoUrl: "/clones/linktree/index.html"
  },
  {
    id: "youtube-clone",
    title: "YouTube Clone",
    description: "A complete video streaming platform with video uploads, subscriptions, comments, and personalized recommendations.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop",
    tags: ["Video Streaming", "Social Media", "Content Platform"],
    demoUrl: "/clones/youtube/index.html"
  },
  {
    id: "patreon-clone",
    title: "Patreon Clone",
    description: "A creator monetization platform with tiered memberships, exclusive content, and community features for supporters.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
    tags: ["Monetization", "Subscriptions", "Creator Economy"],
    demoUrl: "/clones/patreon/index.html"
  },
  {
    id: "onlyfans-clone",
    title: "OnlyFans Clone",
    description: "A premium content subscription platform enabling creators to monetize exclusive content with tiered memberships and pay-per-view features.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop",
    tags: ["Content Platform", "Subscriptions", "Creator Economy"],
    demoUrl: "/clones/onlyfans/index.html"
  },
  {
    id: "celebrity-website",
    title: "Celebrity Website",
    description: "A stunning portfolio website for celebrities featuring image galleries, social links, booking system, event calendar, and fan engagement tools.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop",
    tags: ["Portfolio", "Booking", "Events"],
    demoUrl: "/clones/celebrity/index.html"
  },
  {
    id: "amazon-clone",
    title: "Amazon Clone",
    description: "A full-featured e-commerce platform with product listings, shopping cart, reviews, and integrated payment processing.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    tags: ["E-commerce", "Shopping", "Marketplace"],
    demoUrl: "/clones/amazon/index.html"
  },
  {
    id: "whatnot-clone",
    title: "Whatnot Clone",
    description: "A live shopping and auction platform where sellers can stream live shows and buyers can bid in real-time.",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop",
    tags: ["Live Shopping", "Auctions", "Streaming"],
    demoUrl: "/clones/whatnot/index.html"
  },
  {
    id: "reseller-clone",
    title: "Reseller Clone",
    description: "A marketplace for buying and selling authenticated sneakers, streetwear, electronics, and collectibles with buyer protection.",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&auto=format&fit=crop",
    tags: ["Resale", "Marketplace", "Authentication"],
    demoUrl: "/clones/reseller/index.html"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-border/50 h-full flex flex-col"
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Live Demo
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
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="text-muted-foreground mb-4 flex-1">
                  {project.description}
                </CardDescription>
                <div className="flex gap-2">
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold text-sm"
                  >
                    View Live Demo
                  </a>
                  <Link 
                    to={`/project/${project.id}`}
                    className="px-4 py-2 border-2 border-primary text-primary text-center rounded-lg hover:bg-primary hover:text-white transition-all font-semibold text-sm"
                  >
                    Details
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
