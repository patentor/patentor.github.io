import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  TrendingUp,
  DollarSign,
  Shield,
  Clock
} from "lucide-react";

const portfolioData = [
  {
    id: "1",
    title: "AI-Powered Autonomous Navigation System",
    status: "published",
    filingDate: "2023-01-15",
    publicationNumber: "US11,234,567",
    inventors: ["John Doe", "Jane Smith"],
    estimatedValue: 2500000,
    maintenanceDue: "2024-01-15",
    progress: 100,
    category: "AI/ML"
  },
  {
    id: "2", 
    title: "Quantum Computing Error Correction Method",
    status: "pending",
    filingDate: "2023-08-22",
    applicationNumber: "17/456,789",
    inventors: ["Dr. Sarah Chen", "Michael Johnson", "Lisa Wong"],
    estimatedValue: 5200000,
    maintenanceDue: "2024-08-22",
    progress: 75,
    category: "Quantum Tech"
  },
  {
    id: "3",
    title: "Biodegradable Smart Packaging System",
    status: "draft",
    filingDate: null,
    inventors: ["Emma Rodriguez", "James Liu"],
    estimatedValue: 850000,
    maintenanceDue: null,
    progress: 45,
    category: "Green Tech"
  },
  {
    id: "4",
    title: "Neural Interface for Prosthetic Control", 
    status: "published",
    filingDate: "2022-03-10",
    publicationNumber: "US10,987,654",
    inventors: ["Dr. Robert Kim", "Anna Petrov"],
    estimatedValue: 4100000,
    maintenanceDue: "2025-03-10",
    progress: 100,
    category: "BioTech"
  }
];

const stats = {
  totalPatents: 15,
  published: 8,
  pending: 4,
  drafts: 3,
  totalValue: 18500000,
  avgProcessingTime: 18
};

export function PatentPortfolioInterface() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredPatents = portfolioData.filter(patent => {
    const matchesSearch = patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patent.inventors.some(inv => inv.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || patent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "draft": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="flex h-full bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="patent-title flex items-center gap-2">
                <FolderOpen className="h-6 w-6 text-primary" />
                Patent Portfolio
              </h1>
              <p className="text-sm text-muted-foreground">Manage your intellectual property portfolio</p>
            </div>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              New Patent
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 border-b bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalPatents}</p>
                    <p className="text-xs text-muted-foreground">Total Patents</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold">${(stats.totalValue / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-muted-foreground">Portfolio Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{stats.published}</p>
                    <p className="text-xs text-muted-foreground">Published</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-8 w-8 text-warning" />
                  <div>
                    <p className="text-2xl font-bold">{stats.avgProcessingTime}mo</p>
                    <p className="text-xs text-muted-foreground">Avg Processing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search patents by title, inventor, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "published", "pending", "draft"].map(status => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Patent List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {filteredPatents.map((patent) => (
              <Card key={patent.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{patent.title}</h3>
                        <Badge className={getStatusColor(patent.status)}>
                          {patent.status}
                        </Badge>
                        <Badge variant="outline">{patent.category}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        {patent.publicationNumber && (
                          <span className="font-mono">{patent.publicationNumber}</span>
                        )}
                        {patent.applicationNumber && (
                          <span className="font-mono">App: {patent.applicationNumber}</span>
                        )}
                        {patent.filingDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Filed: {patent.filingDate}
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Inventors:</span> {patent.inventors.join(", ")}
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="text-lg font-bold text-success">
                        ${(patent.estimatedValue / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-muted-foreground">Est. Value</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Progress:</span>
                        <Progress value={patent.progress} className="w-24" />
                        <span className="text-sm text-muted-foreground">{patent.progress}%</span>
                      </div>
                      
                      {patent.maintenanceDue && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Maintenance due:</span> {patent.maintenanceDue}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}