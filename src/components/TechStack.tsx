import { Card } from "@/components/ui/card";

const techCategories = [
  {
    title: "Frontend Development",
    technologies: [
      "JavaScript", "TypeScript", "React", "Vue.js", "Angular", "Svelte",
      "Next.js", "Nuxt.js", "HTML5", "CSS3", "Sass/SCSS",
      "Tailwind CSS", "Bootstrap", "Material UI", "Redux", "Zustand", "Pinia"
    ]
  },
  {
    title: "Backend Development",
    technologies: [
      "Node.js", "Express", "NestJS", "Fastify", "Python", "Django",
      "Flask", "FastAPI", "PHP", "Laravel", "Symfony", "Ruby on Rails",
      "Java", "Spring Boot", "C#", ".NET Core", "Go", "Gin", "Echo"
    ]
  },
  {
    title: "Mobile Development",
    technologies: [
      "React Native", "Flutter", "Swift", "Kotlin", "Ionic"
    ]
  },
  {
    title: "Database Technologies",
    technologies: [
      "PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis",
      "Firebase", "Firestore", "Supabase", "Elasticsearch"
    ]
  },
  {
    title: "Cloud & DevOps",
    technologies: [
      "AWS", "EC2", "S3", "Lambda", "RDS", "Google Cloud", "Azure",
      "Docker", "Kubernetes", "GitHub Actions", "GitLab CI", "Jenkins",
      "Terraform", "Ansible"
    ]
  },
  {
    title: "Design & Prototyping",
    technologies: [
      "Figma", "Adobe XD", "Sketch", "InVision"
    ]
  },
  {
    title: "Project Management",
    technologies: [
      "Jira", "Linear", "Asana", "Git", "GitHub", "GitLab",
      "Bitbucket", "Slack", "Teams", "Confluence", "Notion"
    ]
  },
  {
    title: "Testing & QA",
    technologies: [
      "Jest", "Vitest", "Cypress", "Selenium", "Playwright", "Postman", "Insomnia"
    ]
  }
];

const TechStack = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-darker-bg via-dark-bg to-darker-bg">
        <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 via-transparent to-neon-pink/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-pink via-neon-purple to-cyan-accent bg-clip-text text-transparent">
            Our Tech Stack
          </h2>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to build powerful, scalable solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {techCategories.map((category, idx) => (
            <Card 
              key={idx}
              className="bg-card/40 backdrop-blur-sm border-neon-purple/30 hover:border-neon-pink/50 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-neon-pink/20"
            >
              <h3 className="text-xl font-bold mb-4 text-neon-pink">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-3 py-1.5 text-sm bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border border-neon-purple/30 rounded-full text-foreground hover:border-neon-pink/50 hover:shadow-md hover:shadow-neon-pink/30 transition-all duration-300 cursor-default hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
