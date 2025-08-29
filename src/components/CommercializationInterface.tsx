import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Target,
  BarChart3,
  Lightbulb,
  Rocket,
  Shield,
  Building2,
  Award
} from "lucide-react";

// Import patent image
const patentImage = "/lovable-uploads/86590c2f-993c-4f15-bca9-fff86c2b3ca0.png";

const commercializationProjects = [
  {
    id: "1",
    patentTitle: "AI-Powered Autonomous Navigation",
    stage: "market-research",
    progress: 75,
    marketSize: 45000000000,
    revenue: 2500000,
    partnerships: 3,
    timeline: "18 months",
    nextMilestone: "Complete pilot program",
    riskLevel: "medium",
    fundingNeeded: 5000000,
    fundingRaised: 2000000
  },
  {
    id: "2",
    patentTitle: "Quantum Error Correction Protocol",
    stage: "partnership",
    progress: 45,
    marketSize: 12000000000,
    revenue: 0,
    partnerships: 1,
    timeline: "24 months", 
    nextMilestone: "Sign licensing agreement",
    riskLevel: "high",
    fundingNeeded: 15000000,
    fundingRaised: 8000000
  },
  {
    id: "3",
    patentTitle: "Biodegradable Smart Packaging",
    stage: "market-entry",
    progress: 90,
    marketSize: 8500000000,
    revenue: 1200000,
    partnerships: 5,
    timeline: "6 months",
    nextMilestone: "Scale manufacturing",
    riskLevel: "low",
    fundingNeeded: 3000000,
    fundingRaised: 3000000
  }
];

const marketOpportunities = [
  {
    industry: "Healthcare",
    marketSize: 125000000000,
    growthRate: 12.5,
    patents: 3,
    opportunity: "High demand for medical device innovations"
  },
  {
    industry: "Automotive", 
    marketSize: 98000000000,
    growthRate: 8.2,
    patents: 2,
    opportunity: "EV and autonomous vehicle market expansion"
  },
  {
    industry: "Fintech",
    marketSize: 76000000000,
    growthRate: 15.3,
    patents: 1,
    opportunity: "Digital payment and fraud prevention needs"
  }
];

const stages = [
  { id: "research", label: "Market Research", icon: BarChart3 },
  { id: "validation", label: "Concept Validation", icon: Target },
  { id: "partnership", label: "Strategic Partnerships", icon: Users },
  { id: "funding", label: "Funding & Investment", icon: DollarSign },
  { id: "market-entry", label: "Market Entry", icon: Rocket }
];

export function CommercializationInterface() {
  const [selectedProject, setSelectedProject] = useState(commercializationProjects[0]);
  const [activeStage, setActiveStage] = useState("research");

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStageProgress = (stage: string) => {
    const stageIndex = stages.findIndex(s => s.id === stage);
    return ((stageIndex + 1) / stages.length) * 100;
  };

  return (
    <div className="flex h-full bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="patent-title flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                Patent Commercialization Hub
              </h1>
              <p className="text-sm text-muted-foreground">Transform your patents into profitable ventures</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                Market Analysis
              </Button>
              <Button className="bg-gradient-primary">
                <Rocket className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="p-6 border-b bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-muted-foreground">Active Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold">$3.7M</p>
                    <p className="text-xs text-muted-foreground">Revenue Generated</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-xs text-muted-foreground">Active Partners</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold">68%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Projects List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Commercialization Pipeline */}
              <div>
                <h2 className="patent-section mb-4">Commercialization Pipeline</h2>
                <div className="space-y-4">
                  {commercializationProjects.map((project) => (
                    <Card 
                      key={project.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedProject?.id === project.id 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-12 rounded-lg overflow-hidden border bg-muted/30 flex-shrink-0">
                             <img 
                               src={patentImage} 
                               alt={`${project.patentTitle} patent`}
                               className="w-full h-full object-cover"
                             />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{project.patentTitle}</h3>
                            <div className="flex items-center gap-4 mb-3">
                              <Badge variant="secondary" className="capitalize">
                                {project.stage.replace('-', ' ')}
                              </Badge>
                              <span className={`text-sm font-medium ${getRiskColor(project.riskLevel)}`}>
                                {project.riskLevel.toUpperCase()} RISK
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {project.timeline} timeline
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-success">
                              ${(project.revenue / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-xs text-muted-foreground">Revenue</div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm text-muted-foreground">{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="font-medium">Market Size:</span> ${(project.marketSize / 1000000000).toFixed(1)}B
                            </div>
                            <div>
                              <span className="font-medium">Partners:</span> {project.partnerships}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="font-medium">Funding:</span> ${(project.fundingRaised / 1000000).toFixed(1)}M / ${(project.fundingNeeded / 1000000).toFixed(1)}M
                            </div>
                            <div>
                              <span className="font-medium">Next:</span> {project.nextMilestone}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Market Opportunities */}
              <div>
                <h2 className="patent-section mb-4">Market Opportunities</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketOpportunities.map((market, idx) => (
                    <Card key={idx}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{market.industry}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Market Size</span>
                            <span className="font-medium">${(market.marketSize / 1000000000).toFixed(1)}B</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Growth Rate</span>
                            <span className="font-medium text-success">{market.growthRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Your Patents</span>
                            <span className="font-medium">{market.patents}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {market.opportunity}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Details Panel */}
          <div className="w-80 border-l bg-muted/30 overflow-y-auto">
            <div className="p-4 border-b bg-card">
              <h3 className="font-semibold">Project Details</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2">{selectedProject.patentTitle}</h4>
                <Badge variant="secondary" className="capitalize">
                  {selectedProject.stage.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <p className="text-xl font-bold text-success">${(selectedProject.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-xl font-bold text-primary">{selectedProject.progress}%</p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>
              
              {/* Commercialization Stages */}
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase mb-2 block">Commercialization Stages</span>
                <div className="space-y-2">
                  {stages.map((stage, idx) => {
                    const StageIcon = stage.icon;
                    const isActive = selectedProject.stage === stage.id;
                    const isCompleted = stages.findIndex(s => s.id === selectedProject.stage) > idx;
                    
                    return (
                      <div key={stage.id} className={`flex items-center gap-2 p-2 rounded ${
                        isActive ? 'bg-primary/20 text-primary' : 
                        isCompleted ? 'bg-success/10 text-success' : 'text-muted-foreground'
                      }`}>
                        <StageIcon className="h-4 w-4" />
                        <span className="text-sm">{stage.label}</span>
                        {isCompleted && <Badge variant="outline" className="ml-auto text-xs">✓</Badge>}
                        {isActive && <Badge variant="default" className="ml-auto text-xs">Active</Badge>}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Market Size</span>
                  <p className="text-lg font-bold">${(selectedProject.marketSize / 1000000000).toFixed(1)}B</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Timeline</span>
                  <p className="text-sm">{selectedProject.timeline}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Next Milestone</span>
                  <p className="text-sm">{selectedProject.nextMilestone}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Funding Progress</span>
                  <Progress 
                    value={(selectedProject.fundingRaised / selectedProject.fundingNeeded) * 100} 
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    ${(selectedProject.fundingRaised / 1000000).toFixed(1)}M of ${(selectedProject.fundingNeeded / 1000000).toFixed(1)}M raised
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-gradient-primary">
                  <Target className="mr-2 h-4 w-4" />
                  Update Milestone
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Find Partners
                </Button>
                <Button variant="outline" className="w-full">
                  <Award className="mr-2 h-4 w-4" />
                  View Strategy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}