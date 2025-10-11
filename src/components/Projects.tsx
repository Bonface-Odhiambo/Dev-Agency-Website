import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    title: "FitTrack App",
    description: "A fitness tracking app that helps you monitor your daily activities and health goals.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop"
  },
  {
    title: "DataViz Dashboard",
    description: "An analytics dashboard for visualizing complex data in a user-friendly interface.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
  },
  {
    title: "TeamSync Platform",
    description: "An innovative platform that enhances team collaboration and project management efficiency.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop"
  },
  {
    title: "VR Adventure",
    description: "A groundbreaking virtual reality game that takes players on an immersive journey through fantastical worlds.",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&auto=format&fit=crop"
  },
  {
    title: "AR Shopping Experience",
    description: "Revolutionary shopping app using augmented reality for a unique customer experience.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop"
  },
  {
    title: "EduLearn Portal",
    description: "A comprehensive learning portal offering interactive and resourceful courses for students.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop"
  },
  {
    title: "Wellness Tracker",
    description: "Track your wellness journey with personalized insights and health tracking features.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop"
  },
  {
    title: "RemoteWork Hub",
    description: "A comprehensive platform for remote work, focusing on task management and team collaboration.",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&auto=format&fit=crop"
  },
  {
    title: "AI Assistant",
    description: "An AI-powered personal assistant app that helps manage daily tasks with ease and efficiency.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop"
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
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-border/50"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
