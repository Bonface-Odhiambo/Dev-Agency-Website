import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Rocket, CheckCircle2, Clock, XCircle, ArrowRight, Sparkles, TrendingUp, Package, Calendar } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Request Submitted",
        description: "Your service request has been submitted successfully.",
      });
      setLoading(false);
      e.currentTarget.reset();
    }, 1000);
  };

  const userRequests = [
    { id: 1, service: "Web Application", budget: "$5,000 - $10,000", status: "pending", date: "2025-01-15", progress: 20 },
    { id: 2, service: "Mobile App", budget: "$10,000 - $20,000", status: "in-progress", date: "2025-01-10", progress: 65 },
    { id: 3, service: "E-commerce Platform", budget: "$20,000+", status: "completed", date: "2024-12-20", progress: 100 },
  ];

  const stats = [
    { title: "Total Projects", value: "12", icon: Package, gradient: "from-blue-500 to-cyan-500", change: "+2 this month" },
    { title: "In Progress", value: "3", icon: Clock, gradient: "from-purple-500 to-pink-500", change: "Active now" },
    { title: "Completed", value: "8", icon: CheckCircle2, gradient: "from-green-500 to-emerald-500", change: "Success rate 100%" },
    { title: "Total Invested", value: "$85K", icon: TrendingUp, gradient: "from-orange-500 to-red-500", change: "+12% growth" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "in-progress": return <Rocket className="w-4 h-4" />;
      case "completed": return <CheckCircle2 className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "in-progress": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "completed": return "bg-green-500/10 text-green-500 border-green-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        {/* Hero Section */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
          <div className="flex items-start justify-between">
            <div className="animate-fade-in">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
                Welcome Back!
              </h1>
              <p className="text-xl text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Let's build something amazing today
              </p>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover-scale">
              <Rocket className="w-5 h-5" />
              New Project
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12 animate-fade-in">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover-scale transition-all duration-300 hover:shadow-xl" style={{ animationDelay: `${index * 100}ms` }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold bg-gradient-to-br bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to bottom right, var(--foreground), var(--muted-foreground))` }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {/* New Service Request */}
          <Card className="lg:col-span-2 border-0 shadow-xl bg-card/80 backdrop-blur-sm animate-fade-in">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-purple-600">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Start New Project</CardTitle>
                  <CardDescription>Tell us about your next big idea</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="service-type" className="text-sm font-medium">Service Type</Label>
                    <Select required>
                      <SelectTrigger id="service-type" className="bg-background/50">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="web-app">🌐 Web Application</SelectItem>
                        <SelectItem value="mobile-app">📱 Mobile App</SelectItem>
                        <SelectItem value="ecommerce">🛒 E-commerce Platform</SelectItem>
                        <SelectItem value="custom">⚡ Custom Solution</SelectItem>
                        <SelectItem value="consulting">💡 Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm font-medium">Budget Range</Label>
                    <Select required>
                      <SelectTrigger id="budget" className="bg-background/50">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="small">💰 Under $5,000</SelectItem>
                        <SelectItem value="medium">💎 $5,000 - $10,000</SelectItem>
                        <SelectItem value="large">🚀 $10,000 - $20,000</SelectItem>
                        <SelectItem value="enterprise">⭐ $20,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-name" className="text-sm font-medium">Project Name</Label>
                  <Input id="project-name" placeholder="Give your project a name" className="bg-background/50" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Project Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your vision, goals, and key features..."
                    rows={4}
                    className="bg-background/50 resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-sm font-medium">Expected Timeline</Label>
                  <Input id="timeline" placeholder="e.g., 2-3 months" className="bg-background/50" required />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg text-base h-12"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Clock className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Rocket />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Account Overview */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-card/80 to-primary/5 backdrop-blur-sm animate-fade-in">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-lg">John Doe</p>
                  <p className="text-sm text-muted-foreground">Premium Member</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 space-y-1">
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <p className="font-medium">john.doe@example.com</p>
                </div>

                <div className="p-4 rounded-lg bg-background/50 space-y-1">
                  <Label className="text-xs text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Member Since
                  </Label>
                  <p className="font-medium">January 2025</p>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
                  <Label className="text-xs text-muted-foreground">Total Requests</Label>
                  <p className="font-bold text-3xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {userRequests.length}
                  </p>
                </div>
              </div>

              <Button variant="outline" className="w-full hover-scale">
                Edit Profile
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm animate-fade-in">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Your Projects</CardTitle>
                  <CardDescription>Track progress and milestones</CardDescription>
                </div>
              </div>
              <Button variant="outline" className="hover-scale">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {userRequests.map((request, index) => (
                <div 
                  key={request.id} 
                  className="p-5 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-all hover-scale group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{request.service}</h3>
                        <Badge className={`${getStatusColor(request.status)} border`}>
                          {getStatusIcon(request.status)}
                          {request.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {request.date}
                        </span>
                        <span className="font-medium text-foreground">{request.budget}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{request.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-500 rounded-full"
                        style={{ width: `${request.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
