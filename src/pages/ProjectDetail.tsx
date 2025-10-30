import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const projectsData = {
  "linktree-clone": {
    title: "LinkTree Clone",
    subtitle: "Bio Link Platform for Creators",
    description: "A fully customizable bio link platform that allows creators, influencers, and businesses to showcase all their important links in one beautiful, mobile-optimized page. Perfect for Instagram, TikTok, and other social media profiles.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop",
    demoUrl: "/clones/linktree/index.html",
    githubUrl: "#",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Customizable themes and colors",
      "Unlimited links with icons",
      "Analytics dashboard",
      "QR code generation",
      "Social media integration",
      "Mobile-first responsive design",
      "Custom domains support",
      "Email capture forms"
    ],
    techStack: [
      { name: "Frontend", tech: "React, TypeScript, Tailwind CSS" },
      { name: "Backend", tech: "Node.js, Express" },
      { name: "Database", tech: "MongoDB" },
      { name: "Authentication", tech: "JWT, OAuth" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop"
    ]
  },
  "youtube-clone": {
    title: "YouTube Clone",
    subtitle: "Video Streaming Platform",
    description: "A comprehensive video streaming platform with video uploads, subscriptions, comments, and personalized recommendations. Features a modern UI similar to YouTube with trending videos, categories, and user engagement.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&auto=format&fit=crop",
    demoUrl: "/clones/youtube/index.html",
    githubUrl: "#",
    tags: ["React", "Node.js", "AWS S3", "Stripe", "WebRTC"],
    features: [
      "Video upload and streaming",
      "Live streaming capabilities",
      "Tiered membership system",
      "Exclusive content for subscribers",
      "Comments and community features",
      "Creator analytics dashboard",
      "Payment processing with Stripe",
      "Video transcoding and CDN delivery"
    ],
    techStack: [
      { name: "Frontend", tech: "React, Next.js, Video.js" },
      { name: "Backend", tech: "Node.js, Express, Socket.io" },
      { name: "Storage", tech: "AWS S3, CloudFront CDN" },
      { name: "Payments", tech: "Stripe Connect" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop"
    ]
  },
  "onlyfans-clone": {
    title: "OnlyFans Clone",
    subtitle: "Premium Content Subscription Platform",
    description: "A secure and feature-rich premium content subscription platform enabling creators to monetize exclusive content. Includes tiered memberships, pay-per-view content, direct messaging, and comprehensive creator tools.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&auto=format&fit=crop",
    demoUrl: "/clones/onlyfans/index.html",
    githubUrl: "#",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    features: [
      "Subscription tiers and pricing",
      "Pay-per-view content",
      "Direct messaging system",
      "Content scheduling",
      "Automated payouts",
      "Age verification",
      "Content moderation tools",
      "Advanced analytics"
    ],
    techStack: [
      { name: "Frontend", tech: "React, TypeScript, Redux" },
      { name: "Backend", tech: "Node.js, Express, Socket.io" },
      { name: "Database", tech: "PostgreSQL, Redis" },
      { name: "Payments", tech: "Stripe, PayPal" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop"
    ]
  },
  "celebrity-website": {
    title: "Celebrity Website",
    subtitle: "Professional Portfolio & Booking Platform",
    description: "A stunning, fully-featured website for celebrities, artists, and public figures. Includes image galleries, social media integration, event calendar, booking system, merchandise store, and fan engagement tools.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop",
    demoUrl: "/clones/celebrity/index.html",
    githubUrl: "#",
    tags: ["React", "Node.js", "Stripe", "Calendar API"],
    features: [
      "Professional photo galleries",
      "Event calendar and ticketing",
      "Booking system for appearances",
      "Merchandise e-commerce",
      "Fan club membership",
      "News and blog section",
      "Social media feed integration",
      "Email newsletter system"
    ],
    techStack: [
      { name: "Frontend", tech: "React, Next.js, Framer Motion" },
      { name: "Backend", tech: "Node.js, Express" },
      { name: "CMS", tech: "Strapi, Contentful" },
      { name: "E-commerce", tech: "Stripe, Shopify API" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&auto=format&fit=crop"
    ]
  },
  "amazon-clone": {
    title: "Amazon Clone",
    subtitle: "E-commerce Marketplace Platform",
    description: "A comprehensive e-commerce platform with product listings, shopping cart, reviews, and integrated payment processing. Features include product search, categories, deals, and a complete shopping experience.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop",
    demoUrl: "/clones/amazon/index.html",
    githubUrl: "#",
    tags: ["React", "Node.js", "PostgreSQL", "WebRTC", "Stripe"],
    features: [
      "Product listings and search",
      "Live streaming auctions",
      "Real-time bidding system",
      "Seller dashboard",
      "Inventory management",
      "Order tracking",
      "Payment processing",
      "Review and rating system"
    ],
    techStack: [
      { name: "Frontend", tech: "React, Next.js, WebRTC" },
      { name: "Backend", tech: "Node.js, Express, Socket.io" },
      { name: "Database", tech: "PostgreSQL, Elasticsearch" },
      { name: "Payments", tech: "Stripe Connect" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop"
    ]
  },
  "patreon-clone": {
    title: "Patreon Clone",
    subtitle: "Creator Monetization Platform",
    description: "A creator monetization platform with tiered memberships, exclusive content, and community features. Enables creators to build sustainable income through supporter subscriptions and exclusive perks.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop",
    demoUrl: "/clones/patreon/index.html",
    githubUrl: "#",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    features: [
      "Tiered membership system",
      "Exclusive content for patrons",
      "Monthly subscription billing",
      "Creator analytics dashboard",
      "Community posts and updates",
      "Direct messaging",
      "Payment processing with Stripe",
      "Automated payouts"
    ],
    techStack: [
      { name: "Frontend", tech: "React, TypeScript, Tailwind CSS" },
      { name: "Backend", tech: "Node.js, Express" },
      { name: "Database", tech: "PostgreSQL" },
      { name: "Payments", tech: "Stripe Connect" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop"
    ]
  },
  "whatnot-clone": {
    title: "Whatnot Clone",
    subtitle: "Live Shopping & Auction Platform",
    description: "A live shopping and auction platform where sellers can stream live shows and buyers can bid in real-time. Features live streaming, real-time bidding, seller dashboards, and integrated payments.",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&auto=format&fit=crop",
    demoUrl: "/clones/whatnot/index.html",
    githubUrl: "#",
    tags: ["React", "Node.js", "WebRTC", "Socket.io"],
    features: [
      "Live streaming capabilities",
      "Real-time bidding system",
      "Seller dashboards",
      "Category browsing",
      "Upcoming show reminders",
      "Live viewer count",
      "Chat functionality",
      "Payment processing"
    ],
    techStack: [
      { name: "Frontend", tech: "React, WebRTC, Socket.io" },
      { name: "Backend", tech: "Node.js, Express" },
      { name: "Streaming", tech: "WebRTC, Media Servers" },
      { name: "Payments", tech: "Stripe" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop"
    ]
  },
  "reseller-clone": {
    title: "Reseller Clone",
    subtitle: "Authenticated Resale Marketplace",
    description: "A marketplace for buying and selling authenticated sneakers, streetwear, electronics, and collectibles. Features authentication verification, buyer protection, and secure transactions.",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&auto=format&fit=crop",
    demoUrl: "/clones/reseller/index.html",
    githubUrl: "#",
    tags: ["React", "Python", "OpenAI", "TensorFlow"],
    features: [
      "Natural language processing",
      "Smart task scheduling",
      "Voice commands",
      "Calendar integration",
      "Email automation",
      "Smart reminders",
      "Workflow automation",
      "Learning user preferences"
    ],
    techStack: [
      { name: "Frontend", tech: "React, TypeScript" },
      { name: "Backend", tech: "Python, FastAPI" },
      { name: "AI/ML", tech: "OpenAI GPT, TensorFlow" },
      { name: "Database", tech: "PostgreSQL, Vector DB" }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop"
    ]
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-darker-bg via-dark-bg to-darker-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link to="/#projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-darker-bg via-dark-bg to-darker-bg">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/10 via-transparent to-neon-pink/10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/#projects" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                Clone Project
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">{project.title}</h1>
              <p className="text-xl text-gray-400 mb-6">{project.subtitle}</p>
              <p className="text-gray-300 mb-8">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Demo
                  </Button>
                </a>
                <Button variant="outline">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20"></div>
              <img 
                src={project.image} 
                alt={project.title}
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.features.map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                <Star className="w-6 h-6 text-primary mb-3" />
                <p className="text-white">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.techStack.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-primary font-bold mb-2">{item.name}</h3>
                <p className="text-gray-300 text-sm">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="py-16 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.screenshots.map((screenshot, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <img 
                  src={screenshot} 
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in a Similar Project?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We can build a custom solution tailored to your specific needs. Contact us to discuss your project requirements.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
