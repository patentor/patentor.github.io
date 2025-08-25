import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Bot, 
  Save, 
  Download, 
  Share2, 
  Lightbulb,
  Search,
  PenTool,
  Brain
} from "lucide-react";

export function PatentDraftingInterface() {
  const [patentData, setPatentData] = useState({
    title: "AI-Powered Autonomous Navigation System",
    inventors: "John Doe, Jane Smith",
    assignee: "Tech Innovations Inc.",
    abstract: "",
    background: "",
    summary: "",
    briefDescription: "",
    detailedDescription: "",
    claims: ""
  });

  const [activeSection, setActiveSection] = useState("title");

  const sections = [
    { id: "title", label: "Title & Info", icon: FileText },
    { id: "abstract", label: "Abstract", icon: FileText },
    { id: "background", label: "Background", icon: Lightbulb },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "briefDescription", label: "Brief Description", icon: PenTool },
    { id: "detailedDescription", label: "Detailed Description", icon: FileText },
    { id: "claims", label: "Claims", icon: FileText }
  ];

  return (
    <div className="flex h-full bg-background">
      {/* Main Drafting Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="patent-title">Patent Drafting Workspace</h1>
              <p className="text-sm text-muted-foreground">Draft • Last saved 2 minutes ago</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="default" size="sm" className="bg-gradient-primary">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Left: Form Sections */}
          <div className="flex-1 overflow-y-auto p-6 pr-2">
            <div className="max-w-3xl space-y-8">
              
              {/* Title & Basic Info */}
              <Card className="patent-form-section">
                <CardHeader>
                  <CardTitle className="patent-section flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Title & Inventors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Patent Title</Label>
                    <Input 
                      id="title"
                      value={patentData.title}
                      onChange={(e) => setPatentData({...patentData, title: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inventors">Inventors</Label>
                      <Input 
                        id="inventors"
                        value={patentData.inventors}
                        onChange={(e) => setPatentData({...patentData, inventors: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="assignee">Assignee</Label>
                      <Input 
                        id="assignee"
                        value={patentData.assignee}
                        onChange={(e) => setPatentData({...patentData, assignee: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Abstract */}
              <Card className="patent-form-section">
                <CardHeader>
                  <CardTitle className="patent-section flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Abstract
                    <Badge variant="secondary" className="ml-auto">
                      0/150 words
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="A concise technical summary of the invention, typically 150 words or less..."
                    className="min-h-[120px] patent-content"
                    value={patentData.abstract}
                    onChange={(e) => setPatentData({...patentData, abstract: e.target.value})}
                  />
                </CardContent>
              </Card>

              {/* Background */}
              <Card className="patent-form-section">
                <CardHeader>
                  <CardTitle className="patent-section flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Background of the Invention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe the context and prior art related to your invention..."
                    className="min-h-[150px] patent-content"
                    value={patentData.background}
                    onChange={(e) => setPatentData({...patentData, background: e.target.value})}
                  />
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="patent-form-section">
                <CardHeader>
                  <CardTitle className="patent-section flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Summary of the Invention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Provide a comprehensive overview of the invention's objectives and advantages..."
                    className="min-h-[150px] patent-content"
                    value={patentData.summary}
                    onChange={(e) => setPatentData({...patentData, summary: e.target.value})}
                  />
                </CardContent>
              </Card>

              {/* Claims */}
              <Card className="patent-form-section">
                <CardHeader>
                  <CardTitle className="patent-section flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Claims
                    <Badge variant="secondary" className="ml-auto">
                      Independent: 3 • Dependent: 17
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="1. A method for autonomous navigation comprising:
   a) receiving sensor data from multiple sources;
   b) processing said data using machine learning algorithms;
   c) generating navigation commands based on processed data..."
                    className="min-h-[200px] patent-content font-mono text-sm"
                    value={patentData.claims}
                    onChange={(e) => setPatentData({...patentData, claims: e.target.value})}
                  />
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Right: AI Assistant Panel */}
          <div className="w-96 border-l bg-muted/30 flex-shrink-0">
            <div className="p-4 border-b bg-card">
              <h3 className="font-semibold flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                AI Research Assistant
              </h3>
            </div>
            
            <div className="p-4 space-y-4">
              {/* AI Suggestions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Patent Language AI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Brain className="mr-2 h-4 w-4" />
                    Improve Claims Language
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <PenTool className="mr-2 h-4 w-4" />
                    Generate Abstract
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4" />
                    Prior Art Search
                  </Button>
                </CardContent>
              </Card>

              {/* Research Suggestions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Research Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-xs font-medium text-primary">Similar Patents Found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      3 related patents in autonomous navigation. Review for differentiation.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <p className="text-xs font-medium text-success">Patentability Score</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      85% - Strong novelty indicators found in claims 1-3.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Tracker */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Completion Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <div key={section.id} className="flex items-center justify-between">
                        <span className="text-xs">{section.label}</span>
                        <Badge variant={patentData[section.id as keyof typeof patentData] ? "default" : "outline"} className="text-xs">
                          {patentData[section.id as keyof typeof patentData] ? "✓" : "○"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}