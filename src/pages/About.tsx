import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Code2, Users, Target, Zap, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const stats = [
    { label: "Projects Delivered", value: "150+", icon: Award },
    { label: "Happy Clients", value: "80+", icon: Users },
    { label: "Team Members", value: "25+", icon: Users },
    { label: "Countries Served", value: "15+", icon: Globe },
  ];

  const values = [
    {
      icon: Code2,
      title: "Innovation First",
      description: "We leverage cutting-edge technologies to build solutions that push boundaries and set new standards in the industry.",
    },
    {
      icon: Target,
      title: "Client-Centric",
      description: "Your success is our mission. We work closely with you to understand your needs and deliver tailored solutions.",
    },
    {
      icon: Zap,
      title: "Agile & Fast",
      description: "We embrace agile methodologies to deliver high-quality software quickly without compromising on excellence.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our diverse team of seasoned developers, designers, and strategists brings years of experience to every project.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop",
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-darker-bg via-dark-bg to-darker-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-pink/10"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border border-neon-purple/30 rounded-full mb-4">
              <span className="text-sm font-medium bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                About Kalocode
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Building the Future,
              <br />
              One Function at a Time
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We are a cutting-edge software development agency specializing in creating innovative, 
              scalable, and high-performance solutions that transform businesses and drive digital success.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/20 backdrop-blur-sm border-neon-purple/30 hover:border-neon-pink/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-neon-pink" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Our Story
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in 2018, <span className="text-neon-pink font-semibold">Kalocode</span> emerged from a simple yet powerful idea: 
                every great software solution begins with a single function call. We started as a small team of passionate developers 
                who believed that technology should be elegant, efficient, and transformative.
              </p>
              
              <p>
                Today, we've grown into a full-service software development agency with a diverse team of experts spanning 
                frontend development, backend architecture, cloud infrastructure, UI/UX design, and DevOps. Our mission remains 
                unchanged: to craft exceptional digital experiences that solve real-world problems.
              </p>
              
              <p>
                We've had the privilege of working with startups, enterprises, and everything in between—helping them bring 
                their visions to life through clean code, innovative design, and strategic thinking. From mobile apps to 
                enterprise systems, from AI-powered platforms to blockchain solutions, we've done it all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="bg-card/20 backdrop-blur-sm border-neon-purple/30 hover:border-neon-pink/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-pink/20 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-6 h-6 text-neon-pink" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                      <p className="text-gray-300">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Meet Our Leadership
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The visionaries driving Kalocode forward
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="bg-card/40 backdrop-blur-sm border-neon-purple/30 hover:border-neon-pink/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-pink/20 group overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold mb-1 text-foreground">{member.name}</h3>
                    <p className="text-sm text-neon-pink">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-transparent to-neon-pink/10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Card className="bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border-neon-purple/30 max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let's turn your vision into reality. Get in touch with our team and discover how Kalocode can elevate your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-pink/50 transition-all duration-300"
                >
                  Get Started
                </a>
                <a 
                  href="/projects" 
                  className="px-8 py-3 border border-neon-purple/50 rounded-lg font-semibold hover:bg-neon-purple/10 transition-all duration-300"
                >
                  View Our Work
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
