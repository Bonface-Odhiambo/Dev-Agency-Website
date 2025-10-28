import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { serviceRequestsApi } from "@/services/api";
import { Code, Globe, Smartphone, Database, Cloud, Zap, Plus, Search, Bell, User, TrendingUp, Clock, CheckCircle, AlertCircle, LogOut } from 'lucide-react';
import ProtectedRoute from "@/components/ProtectedRoute";
import Footer from "@/components/Footer";

const DashboardContent = () => {
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("$500 - $1,000");
  const [timeline, setTimeline] = useState("");

  const services = [
    { 
      id: 1, 
      icon: Globe, 
      title: 'Web Development', 
      description: 'Custom websites & web applications',
      color: 'from-blue-500 to-cyan-500',
      projects: 12
    },
    { 
      id: 2, 
      icon: Smartphone, 
      title: 'Mobile Apps', 
      description: 'iOS & Android native apps',
      color: 'from-purple-500 to-pink-500',
      projects: 8
    },
    { 
      id: 3, 
      icon: Database, 
      title: 'Backend Systems', 
      description: 'Scalable server infrastructure',
      color: 'from-green-500 to-emerald-500',
      projects: 15
    },
    { 
      id: 4, 
      icon: Cloud, 
      title: 'Cloud Solutions', 
      description: 'AWS, Azure & GCP deployment',
      color: 'from-orange-500 to-red-500',
      projects: 10
    },
    { 
      id: 5, 
      icon: Code, 
      title: 'API Development', 
      description: 'RESTful & GraphQL APIs',
      color: 'from-indigo-500 to-blue-500',
      projects: 20
    },
    { 
      id: 6, 
      icon: Zap, 
      title: 'Performance Optimization', 
      description: 'Speed & efficiency improvements',
      color: 'from-yellow-500 to-orange-500',
      projects: 6
    }
  ];

  const [myRequests, setMyRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's service requests
  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    setLoading(true);
    try {
      const response = await serviceRequestsApi.getAll();
      if (response.success && response.data) {
        setMyRequests(response.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from real data
  const stats = [
    { 
      label: 'Total Requests', 
      value: myRequests.length.toString(), 
      icon: AlertCircle, 
      color: 'text-purple-500',
      bgColor: 'from-purple-500/20 to-pink-500/20'
    },
    { 
      label: 'In Progress', 
      value: myRequests.filter(r => r.status === 'in-progress').length.toString(), 
      icon: TrendingUp, 
      color: 'text-blue-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20'
    },
    { 
      label: 'Pending', 
      value: myRequests.filter(r => r.status === 'pending').length.toString(), 
      icon: Clock, 
      color: 'text-yellow-500',
      bgColor: 'from-yellow-500/20 to-orange-500/20'
    },
    { 
      label: 'Completed', 
      value: myRequests.filter(r => r.status === 'completed').length.toString(), 
      icon: CheckCircle, 
      color: 'text-green-500',
      bgColor: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  const handleSubmit = async () => {
    if (!projectName || !description || !timeline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await serviceRequestsApi.create({
        projectName: projectName,
        serviceType: selectedService?.title || 'General',
        description: description,
        budgetRange: budget,
        expectedTimeline: timeline,
      });

      if (response.success) {
        toast({
          title: "Request Submitted",
          description: "Your service request has been submitted successfully.",
        });
        
        setShowRequestModal(false);
        setProjectName("");
        setDescription("");
        setTimeline("");
        setSelectedService(null);
        
        // Refresh the requests list
        fetchMyRequests();
      } else {
        toast({
          title: "Submission Failed",
          description: response.error || "Could not submit request",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Function Call</h1>
                <p className="text-xs text-gray-400">Welcome, {user?.name || 'Client'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search projects..."
                  className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="text-right hidden md:block">
                  <p className="text-sm text-white font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div key={idx} className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <StatIcon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-xs text-gray-300">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Request a Service</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => {
                const ServiceIcon = service.icon;
                return (
                  <div 
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setShowRequestModal(true);
                    }}
                    className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <ServiceIcon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{service.projects} projects completed</span>
                      <span className="text-purple-400 group-hover:text-pink-400 transition-colors">Request →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* My Requests Sidebar */}
          <div>
            {/* New Request Button */}
            <button 
              onClick={() => setShowRequestModal(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center space-x-2 mb-6"
            >
              <Plus className="w-5 h-5" />
              <span>New Request</span>
            </button>

            <h2 className="text-xl font-bold text-white mb-4">My Requests</h2>
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
              ) : myRequests.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-2">No requests yet</p>
                  <p className="text-gray-500 text-xs">Click on a service to get started</p>
                </div>
              ) : (
                myRequests.slice(0, 5).map((request) => (
                  <div key={request.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white mb-1">{request.projectName}</h3>
                        <p className="text-xs text-gray-400">{request.serviceType}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                        request.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                        request.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                        request.status === 'review' ? 'bg-yellow-500/20 text-yellow-300' :
                        request.status === 'cancelled' ? 'bg-red-500/20 text-red-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    {request.progress !== undefined && request.progress !== null && (
                      <div className="mb-2">
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${request.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
              
              {myRequests.length > 5 && (
                <button className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300">
                  View All ({myRequests.length}) →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowRequestModal(false)}>
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-8 max-w-2xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-1">
              {selectedService ? selectedService.title : 'New Service Request'}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {selectedService ? selectedService.description : 'Select a service to get started'}
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Project Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., E-commerce Platform"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-2">Description</label>
                <textarea 
                  placeholder="Tell us about your project..."
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                ></textarea>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-2">Budget Range</label>
                <select 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option className="bg-slate-800 text-white">$500 - $1,000</option>
                  <option className="bg-slate-800 text-white">$1,000 - $2,500</option>
                  <option className="bg-slate-800 text-white">$2,500 - $5,000</option>
                  <option className="bg-slate-800 text-white">$5,000 - $10,000</option>
                  <option className="bg-slate-800 text-white">$10,000 - $25,000</option>
                  <option className="bg-slate-800 text-white">$25,000 - $50,000</option>
                  <option className="bg-slate-800 text-white">$50,000+</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-2">Expected Timeline</label>
                <input 
                  type="text" 
                  placeholder="e.g., 2-3 weeks, 1 month, 3 months"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-5">
              <button 
                onClick={() => setShowRequestModal(false)}
                className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
};

export default Dashboard;
