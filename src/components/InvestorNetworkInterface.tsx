import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  TrendingUp, 
  Search, 
  DollarSign, 
  Users, 
  Building2,
  Star,
  Calendar,
  Target,
  Briefcase,
  Award,
  Filter,
  MessageSquare,
  Phone
} from "lucide-react";

// Import investor photos  
import investorFemale from "@/assets/investor-female.jpg";
import investorMale from "@/assets/investor-male.jpg";

const investorData = [
  {
    id: "1",
    name: "Sarah Chen",
    firm: "Innovation Capital Partners",
    type: "VC Fund",
    focus: ["AI/ML", "Robotics", "Quantum Computing"],
    fundSize: 500000000,
    ticketSize: "5M-50M",
    stage: "Series A-B",
    portfolio: 47,
    exits: 12,
    rating: 4.8,
    location: "Palo Alto, CA",
    description: "Leading venture capital firm focused on deep tech innovations with proven track record in AI and quantum technologies.",
    recentInvestments: ["DeepMind acquisition", "Quantum Dynamics Series B", "RoboTech IPO"],
    expertise: "Technical due diligence, scaling operations",
    networkValue: "High",
    profileImage: investorFemale
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    firm: "Patent Capital Group",
    type: "IP Fund",
    focus: ["Biotech", "Medical Devices", "Pharmaceuticals"],
    fundSize: 250000000,
    ticketSize: "2M-25M",
    stage: "Seed-Series A",
    portfolio: 32,
    exits: 8,
    rating: 4.7,
    location: "Boston, MA",
    description: "Specialized intellectual property investment fund focusing on breakthrough medical and biotechnology patents.",
    recentInvestments: ["BioNano licensing deal", "MedTech patent acquisition", "PharmaCorp partnership"],
    expertise: "IP valuation, regulatory approval",
    networkValue: "Very High",
    profileImage: investorMale
  },
  {
    id: "3",
    name: "Dr. Emily Watson",
    firm: "GreenTech Ventures",
    type: "Corporate VC",
    focus: ["Clean Energy", "Sustainability", "Green Tech"],
    fundSize: 300000000,
    ticketSize: "1M-20M", 
    stage: "Pre-seed-Series A",
    portfolio: 28,
    exits: 5,
    rating: 4.9,
    location: "Austin, TX",
    description: "Corporate venture capital arm focused on sustainable technologies and environmental innovations.",
    recentInvestments: ["Solar efficiency breakthrough", "Carbon capture technology", "Sustainable packaging"],
    expertise: "Sustainability metrics, market adoption",
    networkValue: "High",
    profileImage: investorFemale
  },
  {
    id: "4",
    name: "James Liu",
    firm: "Strategic Patent Investors",
    type: "Family Office",
    focus: ["Enterprise Software", "Fintech", "Cybersecurity"],
    fundSize: 150000000,
    ticketSize: "500K-15M",
    stage: "Seed-Series B",
    portfolio: 41,
    exits: 15,
    rating: 4.6,
    location: "New York, NY", 
    description: "Family office with strong focus on enterprise technology patents and cybersecurity innovations.",
    recentInvestments: ["CyberShield acquisition", "FinTech patent portfolio", "Enterprise AI licensing"],
    expertise: "Enterprise sales, cybersecurity",
    networkValue: "Medium",
    profileImage: investorMale
  }
];

const investmentOpportunities = [
  {
    patentTitle: "Advanced Quantum Error Correction",
    fundingNeeded: 15000000,
    valuation: 75000000,
    stage: "Series A",
    category: "Quantum Computing",
    investors: 3,
    revenue: 2400000,
    growth: 285
  },
  {
    patentTitle: "AI-Powered Drug Discovery Platform",
    fundingNeeded: 25000000,
    valuation: 150000000,
    stage: "Series B", 
    category: "Biotech",
    investors: 7,
    revenue: 8900000,
    growth: 156
  },
  {
    patentTitle: "Renewable Energy Storage System",
    fundingNeeded: 8000000,
    valuation: 45000000,
    stage: "Seed",
    category: "Clean Energy",
    investors: 2,
    revenue: 1200000,
    growth: 423
  }
];

export function InvestorNetworkInterface() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFocus, setSelectedFocus] = useState("all");
  const [selectedInvestor, setSelectedInvestor] = useState(investorData[0]);

  const allFocus = ["AI/ML", "Biotech", "Clean Energy", "Fintech", "Robotics", "Medical Devices"];
  
  const filteredInvestors = investorData.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.focus.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFocus = selectedFocus === "all" || investor.focus.includes(selectedFocus);
    return matchesSearch && matchesFocus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "VC Fund": return "bg-primary text-primary-foreground";
      case "IP Fund": return "bg-success text-success-foreground";
      case "Corporate VC": return "bg-warning text-warning-foreground";
      case "Family Office": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
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
                <TrendingUp className="h-6 w-6 text-primary" />
                Investor Network
              </h1>
              <p className="text-sm text-muted-foreground">Connect with investors specializing in patent-backed ventures</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Target className="mr-2 h-4 w-4" />
                Matching Algorithm
              </Button>
              <Button className="bg-gradient-primary">
                <Briefcase className="mr-2 h-4 w-4" />
                Submit Pitch
              </Button>
            </div>
          </div>
        </div>

        {/* Investment Opportunities */}
        <div className="p-6 border-b bg-muted/30">
          <h2 className="patent-section mb-4">Active Investment Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {investmentOpportunities.map((opportunity, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{opportunity.patentTitle}</CardTitle>
                    <Badge variant="outline">{opportunity.stage}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Funding Needed</span>
                      <span className="font-medium">${(opportunity.fundingNeeded / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Valuation</span>
                      <span className="font-medium">${(opportunity.valuation / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Interested Investors</span>
                      <span className="font-medium text-success">{opportunity.investors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Growth Rate</span>
                      <span className="font-medium text-success">{opportunity.growth}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search investors by name, firm, or focus area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={selectedFocus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFocus("all")}
            >
              All Focus Areas
            </Button>
            {allFocus.map(focus => (
              <Button
                key={focus}
                variant={selectedFocus === focus ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFocus(focus)}
              >
                {focus}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 flex">
          {/* Investor List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="patent-section">{filteredInvestors.length} Investors Found</h2>
                <div className="flex gap-2">
                  <Badge variant="outline">Fund Size</Badge>
                  <Badge variant="outline">Stage</Badge>
                  <Badge variant="outline">Rating</Badge>
                </div>
              </div>
              
              {filteredInvestors.map((investor) => (
                <Card 
                  key={investor.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedInvestor?.id === investor.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedInvestor(investor)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <img src={investor.profileImage} alt={investor.name} className="w-full h-full object-cover" />
                        <AvatarFallback>{investor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{investor.name}</h3>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-warning text-warning" />
                              <span className="font-medium">{investor.rating}</span>
                            </div>
                            <Badge className={getTypeColor(investor.type)}>
                              {investor.type}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{investor.firm}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>${(investor.fundSize / 1000000).toFixed(0)}M Fund</span>
                          <span>{investor.ticketSize} Tickets</span>
                          <span>{investor.stage}</span>
                          <span>{investor.location}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {investor.focus.map((focus, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {focus}
                            </Badge>
                          ))}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {investor.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <span className="font-medium">{investor.portfolio}</span>
                              <span className="text-muted-foreground"> portfolio</span>
                            </div>
                            <div>
                              <span className="font-medium text-success">{investor.exits}</span>
                              <span className="text-muted-foreground"> exits</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button size="sm" className="bg-gradient-primary">
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Investor Details Panel */}
          <div className="w-80 border-l bg-muted/30 overflow-y-auto">
            <div className="p-4 border-b bg-card">
              <h3 className="font-semibold">Investor Profile</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-3">
                  <img src={selectedInvestor.profileImage} alt={selectedInvestor.name} className="w-full h-full object-cover" />
                  <AvatarFallback>{selectedInvestor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h4 className="font-semibold">{selectedInvestor.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedInvestor.firm}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-lg font-bold text-primary">${(selectedInvestor.fundSize / 1000000).toFixed(0)}M</p>
                  <p className="text-xs text-muted-foreground">Fund Size</p>
                </div>
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <p className="text-lg font-bold text-success">{selectedInvestor.exits}</p>
                  <p className="text-xs text-muted-foreground">Exits</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Investment Stage</span>
                  <p className="text-sm">{selectedInvestor.stage}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Ticket Size</span>
                  <p className="text-sm">{selectedInvestor.ticketSize}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Focus Areas</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedInvestor.focus.map((focus, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{focus}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Expertise</span>
                  <p className="text-sm">{selectedInvestor.expertise}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Network Value</span>
                  <Badge variant={selectedInvestor.networkValue === "Very High" ? "default" : "secondary"}>
                    {selectedInvestor.networkValue}
                  </Badge>
                </div>
              </div>
              
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase mb-2 block">Recent Investments</span>
                <div className="space-y-1">
                  {selectedInvestor.recentInvestments.map((investment, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">• {investment}</p>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-gradient-primary">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Pitch
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Request Meeting
                </Button>
                <Button variant="outline" className="w-full">
                  <Award className="mr-2 h-4 w-4" />
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}