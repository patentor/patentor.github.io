import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Bot, FileText, ExternalLink, Calendar, Users, Building2, Brain } from "lucide-react";

const samplePatents = [
  {
    id: "US10,123,456",
    title: "Machine Learning System for Autonomous Vehicle Navigation",
    inventors: ["Sarah Johnson", "Michael Chen"],
    assignee: "Tech Innovations Corp",
    date: "2023-08-15",
    relevance: 92,
    status: "Published",
    abstract: "A comprehensive machine learning system that enables autonomous vehicles to navigate complex environments using real-time sensor fusion and predictive algorithms.",
    citations: 24,
    family: 8
  },
  {
    id: "US10,098,765", 
    title: "AI-Powered Predictive Maintenance for Industrial Equipment",
    inventors: ["David Kim", "Lisa Wang", "Roberto Silva"],
    assignee: "Industrial AI Solutions LLC",
    date: "2023-06-22",
    relevance: 87,
    status: "Published",
    abstract: "An artificial intelligence system for predicting equipment failures in industrial settings using sensor data analysis and machine learning models.",
    citations: 18,
    family: 5
  },
  {
    id: "US10,087,321",
    title: "Neural Network Architecture for Real-Time Image Processing",
    inventors: ["Emma Thompson", "James Liu"],
    assignee: "Vision Tech Inc",
    date: "2023-04-10",
    relevance: 82,
    status: "Published",
    abstract: "A novel neural network architecture optimized for real-time image processing applications in resource-constrained environments.",
    citations: 31,
    family: 12
  }
];

export function AIResearchInterface() {
  const [searchQuery, setSearchQuery] = useState("autonomous navigation machine learning");
  const [selectedPatent, setSelectedPatent] = useState(samplePatents[0]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500);
  };

  return (
    <div className="flex h-full bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="patent-title flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                AI Patent Research
              </h1>
              <p className="text-sm text-muted-foreground">Discover prior art and analyze patent landscapes with AI</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button variant="default" size="sm" className="bg-gradient-primary">
                <Brain className="mr-2 h-4 w-4" />
                AI Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="p-6 border-b bg-muted/30">
          <div className="max-w-4xl">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search patents by keywords, inventors, assignees, or classification codes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isSearching}
                className="h-12 px-6 bg-gradient-primary"
              >
                <Search className="mr-2 h-4 w-4" />
                {isSearching ? "Searching..." : "AI Search"}
              </Button>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Badge variant="secondary">Machine Learning: 1,247 patents</Badge>
              <Badge variant="secondary">Autonomous Systems: 892 patents</Badge>
              <Badge variant="secondary">Navigation: 634 patents</Badge>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 flex">
          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="patent-section">Search Results (3 of 1,247)</h2>
                <div className="flex gap-2">
                  <Badge variant="outline">Relevance</Badge>
                  <Badge variant="outline">Date</Badge>
                  <Badge variant="outline">Citations</Badge>
                </div>
              </div>
              
              {samplePatents.map((patent) => (
                <Card 
                  key={patent.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedPatent?.id === patent.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedPatent(patent)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{patent.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-mono">{patent.id}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {patent.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {patent.inventors.length} inventors
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="default" className="bg-primary">
                          {patent.relevance}% match
                        </Badge>
                        <Badge variant="outline">
                          {patent.citations} citations
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {patent.abstract}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        {patent.assignee}
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Patent Details Panel */}
          <div className="w-96 border-l bg-muted/30 overflow-y-auto">
            <div className="p-4 border-b bg-card">
              <h3 className="font-semibold">Patent Details</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2">{selectedPatent.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedPatent.abstract}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Patent ID</span>
                  <p className="font-mono text-sm">{selectedPatent.id}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Inventors</span>
                  <div className="space-y-1">
                    {selectedPatent.inventors.map((inventor, idx) => (
                      <p key={idx} className="text-sm">{inventor}</p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Assignee</span>
                  <p className="text-sm">{selectedPatent.assignee}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Publication Date</span>
                  <p className="text-sm">{selectedPatent.date}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{selectedPatent.citations}</p>
                  <p className="text-xs text-muted-foreground">Citations</p>
                </div>
                <div className="text-center p-3 bg-secondary/20 rounded-lg">
                  <p className="text-2xl font-bold">{selectedPatent.family}</p>
                  <p className="text-xs text-muted-foreground">Family Size</p>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-primary">
                <FileText className="mr-2 h-4 w-4" />
                View Full Patent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}