import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  MapPin, 
  Star, 
  DollarSign, 
  Calendar,
  Phone,
  Mail,
  Building2,
  Award,
  Filter
} from "lucide-react";

// Import attorney photos
import attorneyFemale from "@/assets/attorney-female.jpg";
import attorneyMale from "@/assets/attorney-male.jpg";

const attorneyData = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    firm: "Mitchell & Associates IP Law",
    specialties: ["AI/ML Patents", "Software", "Biotech"],
    location: "San Francisco, CA",
    experience: 15,
    rating: 4.9,
    reviews: 127,
    hourlyRate: 750,
    profileImage: attorneyFemale,
    education: "Stanford Law School, Ph.D Computer Science",
    barAdmissions: ["California", "USPTO"],
    languages: ["English", "Mandarin"],
    successRate: 94,
    description: "Leading patent attorney specializing in AI and machine learning innovations. Former software engineer with 20+ years combined experience."
  },
  {
    id: "2",
    name: "Michael Chen, Esq.",
    firm: "Chen Patent Group",
    specialties: ["Mechanical", "Automotive", "Robotics"],
    location: "Detroit, MI", 
    experience: 12,
    rating: 4.8,
    reviews: 89,
    hourlyRate: 650,
    profileImage: attorneyMale,
    education: "University of Michigan Law, BS Mechanical Engineering",
    barAdmissions: ["Michigan", "USPTO", "Ohio"],
    languages: ["English", "Spanish"],
    successRate: 91,
    description: "Expert in mechanical and automotive patents with extensive experience in robotics and automation technologies."
  },
  {
    id: "3",
    name: "Jennifer Rodriguez",
    firm: "BioTech Patent Solutions",
    specialties: ["Biotechnology", "Pharmaceuticals", "Medical Devices"],
    location: "Boston, MA",
    experience: 18,
    rating: 4.9,
    reviews: 156,
    hourlyRate: 825,
    profileImage: attorneyFemale,
    education: "Harvard Law School, Ph.D Biochemistry",
    barAdmissions: ["Massachusetts", "USPTO", "New York"],
    languages: ["English", "French", "Portuguese"],
    successRate: 96,
    description: "Premier biotechnology patent attorney with deep scientific background and proven track record in pharmaceutical patent prosecution."
  },
  {
    id: "4",
    name: "David Kim, J.D.",
    firm: "Innovation IP Partners",
    specialties: ["Electronics", "Semiconductors", "Telecommunications"],
    location: "Austin, TX",
    experience: 10,
    rating: 4.7,
    reviews: 73,
    hourlyRate: 550,
    profileImage: attorneyMale,
    education: "UT Austin School of Law, BS Electrical Engineering",
    barAdmissions: ["Texas", "USPTO"],
    languages: ["English", "Korean"],
    successRate: 89,
    description: "Electronics and telecommunications patent specialist with strong technical background in semiconductor technologies."
  }
];

export function AttorneyDirectoryInterface() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedAttorney, setSelectedAttorney] = useState(attorneyData[0]);

  const allSpecialties = ["AI/ML Patents", "Software", "Biotech", "Mechanical", "Automotive", "Robotics", "Pharmaceuticals", "Medical Devices", "Electronics", "Semiconductors", "Telecommunications"];
  
  const filteredAttorneys = attorneyData.filter(attorney => {
    const matchesSearch = attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attorney.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attorney.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === "all" || attorney.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="flex h-full bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="patent-title flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Patent Attorney Directory
              </h1>
              <p className="text-sm text-muted-foreground">Find and connect with qualified patent attorneys</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Search
              </Button>
              <Button className="bg-gradient-primary">
                <Award className="mr-2 h-4 w-4" />
                Become Listed
              </Button>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-6 border-b bg-muted/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, firm, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Location
            </Button>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={selectedSpecialty === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpecialty("all")}
            >
              All Specialties
            </Button>
            {allSpecialties.slice(0, 6).map(specialty => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 flex">
          {/* Attorney List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="patent-section">{filteredAttorneys.length} Attorneys Found</h2>
                <div className="flex gap-2">
                  <Badge variant="outline">Rating</Badge>
                  <Badge variant="outline">Experience</Badge>
                  <Badge variant="outline">Rate</Badge>
                </div>
              </div>
              
              {filteredAttorneys.map((attorney) => (
                <Card 
                  key={attorney.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedAttorney?.id === attorney.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedAttorney(attorney)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={attorney.profileImage} />
                        <AvatarFallback>{attorney.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{attorney.name}</h3>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-warning text-warning" />
                              <span className="font-medium">{attorney.rating}</span>
                              <span className="text-muted-foreground">({attorney.reviews})</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{attorney.firm}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{attorney.location}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm">{attorney.experience} years experience</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {attorney.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {attorney.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm">
                              <DollarSign className="h-4 w-4 text-success" />
                              <span className="font-medium">${attorney.hourlyRate}/hr</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium text-success">{attorney.successRate}%</span>
                              <span className="text-muted-foreground"> success rate</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button size="sm" className="bg-gradient-primary">
                              Contact
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

          {/* Attorney Details Panel */}
          <div className="w-80 border-l bg-muted/30 overflow-y-auto">
            <div className="p-4 border-b bg-card">
              <h3 className="font-semibold">Attorney Details</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-3">
                  <AvatarImage src={selectedAttorney.profileImage} />
                  <AvatarFallback>{selectedAttorney.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h4 className="font-semibold">{selectedAttorney.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedAttorney.firm}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-xl font-bold text-primary">{selectedAttorney.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <p className="text-xl font-bold text-success">{selectedAttorney.successRate}%</p>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Education</span>
                  <p className="text-sm">{selectedAttorney.education}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Bar Admissions</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedAttorney.barAdmissions.map((bar, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{bar}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Languages</span>
                  <p className="text-sm">{selectedAttorney.languages.join(", ")}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Hourly Rate</span>
                  <p className="text-lg font-bold text-success">${selectedAttorney.hourlyRate}/hour</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-gradient-primary">
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}