import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, FileText, TrendingUp, Clock, Search, Bell, User, Code, Eye, Edit, CheckCircle, AlertCircle, XCircle, Download, DollarSign, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { serviceRequestsApi, usersApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminPanelContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch service requests and users from backend
  useEffect(() => {
    fetchServiceRequests();
    fetchUsers();
  }, []);

  const fetchServiceRequests = async () => {
    setLoading(true);
    try {
      const response = await serviceRequestsApi.getAll();
      
      if (response.success && response.data) {
        // Transform data to match component expectations
        const transformedRequests = response.data.map((req: any) => ({
          id: req.id,
          user: req.user?.name || 'Unknown User',
          email: req.user?.email || 'N/A',
          service: req.serviceType,
          budget: req.budgetRange || 'Not specified',
          status: req.status,
          date: new Date(req.createdAt).toISOString().split('T')[0],
          description: req.description,
          projectName: req.projectName,
          progress: req.progress || 0,
        }));
        setServiceRequests(transformedRequests);
      }
    } catch (error) {
      console.error('Error fetching service requests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load service requests',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await usersApi.getAll({ limit: 100 });
      
      if (response.success && response.data) {
        const transformedUsers = response.data.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          joined: new Date(u.createdAt).toISOString().split('T')[0],
          requests: 0, // Will be calculated
          status: u.status,
          role: u.role,
          phone: u.phone,
          totalSpent: 0
        }));
        setUsers(transformedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleExport = async () => {
    try {
      toast({
        title: 'Exporting...',
        description: 'Preparing Excel file...',
      });

      const response = await usersApi.exportExcel();
      
      if (response.success && response.data) {
        // Convert JSON to Excel using SheetJS approach
        const data = response.data;
        const filename = (response as any).filename || 'export.xlsx';
        
        // Create CSV content
        const headers = Object.keys(data[0]);
        const csvContent = [
          headers.join(','),
          ...data.map((row: any) => 
            headers.map(header => {
              const value = row[header];
              // Escape commas and quotes
              return typeof value === 'string' && (value.includes(',') || value.includes('"'))
                ? `"${value.replace(/"/g, '""')}"`
                : value;
            }).join(',')
          )
        ].join('\n');

        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename.replace('.xlsx', '.csv'));
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
          title: 'Export Successful',
          description: 'Data has been exported to CSV file',
        });
      }
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Export Failed',
        description: 'Failed to export data',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Filter data based on search term
  const filteredRequests = serviceRequests.filter(request => 
    searchTerm === '' || 
    request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    searchTerm === '' ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Users', value: users.length.toString(), trend: '+2', icon: Users, color: 'text-blue-500' },
    { label: 'Total Requests', value: serviceRequests.length.toString(), trend: '+4', icon: FileText, color: 'text-green-500' },
    { label: 'Pending', value: serviceRequests.filter(r => r.status === "pending").length.toString(), trend: '=', icon: Clock, color: 'text-yellow-500' },
    { label: 'Completed', value: serviceRequests.filter(r => r.status === "completed").length.toString(), trend: '+1', icon: CheckCircle, color: 'text-purple-500' },
  ];

  const renderOverview = () => (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <StatIcon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-xs text-green-400 font-medium">{stat.trend}</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {serviceRequests.slice(0, 3).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">{request.user}</p>
                  <p className="text-xs text-gray-400">{request.service}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                  request.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Top Clients</h3>
          <div className="space-y-3">
            {users.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.requests} projects</p>
                </div>
                <p className="text-sm font-bold text-purple-400">${user.totalSpent.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Service Requests</h2>
        <button 
          onClick={handleExport}
          className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-all flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">User</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Email</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Service</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Budget</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{request.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{request.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{request.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                      request.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{request.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedRequest(request)}
                        className="text-purple-400 hover:text-pink-400 transition-colors flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1">
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <button 
          onClick={handleExport}
          className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-all flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Name</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Email</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Joined</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Requests</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Total Spent</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.requests}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-400">
                    ${user.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      user.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <button className="text-purple-400 hover:text-pink-400 transition-colors flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1">
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

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
                <p className="text-xs text-gray-400">Admin Panel - {user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search users, requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  <p className="text-xs text-gray-400">{user?.role}</p>
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

      {/* Navigation Tabs */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'overview'
                  ? 'text-white border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'requests'
                  ? 'text-white border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Service Requests
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'users'
                  ? 'text-white border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Users
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'requests' && renderRequests()}
        {activeTab === 'users' && renderUsers()}
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedRequest(null)}>
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Request Details</h3>
                <p className="text-gray-400 text-sm">#{selectedRequest.id.toString().padStart(4, '0')}</p>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-1">Client</p>
                <p className="text-lg font-semibold text-white">{selectedRequest.user}</p>
                <p className="text-sm text-gray-400">{selectedRequest.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Service Type</p>
                  <p className="text-sm font-semibold text-white">{selectedRequest.service}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Budget</p>
                  <p className="text-sm font-semibold text-white">{selectedRequest.budget}</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-1">Description</p>
                <p className="text-sm text-white">{selectedRequest.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                    selectedRequest.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                    selectedRequest.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {selectedRequest.status}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Date Submitted</p>
                  <p className="text-sm font-semibold text-white">{selectedRequest.date}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300">
                Update Status
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                Assign Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminPanel = () => {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminPanelContent />
    </ProtectedRoute>
  );
};

export default AdminPanel;
