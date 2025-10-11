import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, TrendingUp, Clock } from "lucide-react";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for service requests
  const serviceRequests = [
    { 
      id: 1, 
      user: "John Doe", 
      email: "john@example.com",
      service: "Web Application", 
      budget: "$5,000 - $10,000", 
      status: "pending", 
      date: "2025-01-15",
      description: "E-commerce platform with payment integration"
    },
    { 
      id: 2, 
      user: "Jane Smith", 
      email: "jane@example.com",
      service: "Mobile App", 
      budget: "$10,000 - $20,000", 
      status: "in-progress", 
      date: "2025-01-10",
      description: "Fitness tracking mobile application"
    },
    { 
      id: 3, 
      user: "Mike Johnson", 
      email: "mike@example.com",
      service: "E-commerce Platform", 
      budget: "$20,000+", 
      status: "completed", 
      date: "2024-12-20",
      description: "Multi-vendor marketplace platform"
    },
    { 
      id: 4, 
      user: "Sarah Williams", 
      email: "sarah@example.com",
      service: "Custom Solution", 
      budget: "$5,000 - $10,000", 
      status: "pending", 
      date: "2025-01-12",
      description: "CRM system for small business"
    },
  ];

  // Mock data for users
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", joined: "2025-01-15", requests: 3, status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", joined: "2025-01-10", requests: 2, status: "active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", joined: "2024-12-20", requests: 5, status: "active" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", joined: "2025-01-12", requests: 1, status: "active" },
    { id: 5, name: "Tom Brown", email: "tom@example.com", joined: "2024-11-05", requests: 4, status: "inactive" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "in-progress": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "active": return "bg-green-500";
      case "inactive": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const stats = [
    { title: "Total Users", value: users.length, icon: Users, color: "text-blue-500" },
    { title: "Total Requests", value: serviceRequests.length, icon: FileText, color: "text-green-500" },
    { title: "Pending", value: serviceRequests.filter(r => r.status === "pending").length, icon: Clock, color: "text-yellow-500" },
    { title: "Completed", value: serviceRequests.filter(r => r.status === "completed").length, icon: TrendingUp, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage service requests and user accounts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input 
            placeholder="Search by user name, email, or service type..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="requests">Service Requests</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Service Requests Tab */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Service Requests</CardTitle>
                <CardDescription>View and manage all service requests from users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.user}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.service}</TableCell>
                        <TableCell>{request.budget}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Total Requests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell>{user.requests}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
