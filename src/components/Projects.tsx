import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "linktree-clone",
    title: "LinkTree Clone",
    description: "A customizable bio link platform that allows creators to showcase all their important links in one beautiful page. Perfect for social media profiles.",
    image: "https://cdn.dribbble.com/userupload/3007782/file/original-8f257cba713a7493c7fb30c5cbcb9e45.png",
    tags: ["Social Media", "Creator Tools", "Landing Page"],
    demoUrl: "/clones/linktree/index.html"
  },
  {
    id: "youtube-clone",
    title: "YouTube Clone",
    description: "A complete video streaming platform with video uploads, subscriptions, comments, and personalized recommendations.",
    image: "https://cdn.sologo.ai/2025/0305/20250305072449146.png",
    tags: ["Video Streaming", "Social Media", "Content Platform"],
    demoUrl: "/clones/youtube/index.html"
  },
  {
    id: "patreon-clone",
    title: "Patreon Clone",
    description: "A creator monetization platform with tiered memberships, exclusive content, and community features for supporters.",
    image: "https://logos-world.net/wp-content/uploads/2020/02/Patreon-Logo.jpg",
    tags: ["Monetization", "Subscriptions", "Creator Economy"],
    demoUrl: "/clones/patreon/index.html"
  },
  {
    id: "onlyfans-clone",
    title: "OnlyFans Clone",
    description: "A premium content subscription platform enabling creators to monetize exclusive content with tiered memberships and pay-per-view features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpWMWyS3XTMW_PsTT1lFT_EYZ1boYGwrqZg&s",
    tags: ["Content Platform", "Subscriptions", "Creator Economy"],
    demoUrl: "/clones/onlyfans/index.html"
  },
  {
    id: "celebrity-website",
    title: "Celebrity Website",
    description: "A stunning portfolio website for celebrities featuring image galleries, social links, booking system, event calendar, and fan engagement tools.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=80",
    tags: ["Portfolio", "Booking", "Events"],
    demoUrl: "/clones/celebrity/index.html"
  },
  {
    id: "amazon-clone",
    title: "Amazon Clone",
    description: "A full-featured e-commerce platform with product listings, shopping cart, reviews, and integrated payment processing.",
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&auto=format&fit=crop&q=80",
    tags: ["E-commerce", "Shopping", "Marketplace"],
    demoUrl: "/clones/amazon/index.html"
  },
  {
    id: "whatnot-clone",
    title: "Whatnot Clone",
    description: "A live shopping and auction platform where sellers can stream live shows and buyers can bid in real-time.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-DklitYffyGcF-FzrVnTOlMk8mFPgaP9Y5g&s",
    tags: ["Live Shopping", "Auctions", "Streaming"],
    demoUrl: "/clones/whatnot/index.html"
  },
  {
    id: "reseller-clone",
    title: "Reseller Clone",
    description: "A marketplace for buying and selling authenticated sneakers, streetwear, electronics, and collectibles with buyer protection.",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&auto=format&fit=crop&q=80",
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
