import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ShoppingCart, 
  Search, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Heart,
  Calendar,
  Building2,
  Users,
  FileText,
  Filter,
  Star
} from "lucide-react";

// Import assets
const patentImage = "/lovable-uploads/86590c2f-993c-4f15-bca9-fff86c2b3ca0.png";

const marketplaceData = [
  {
    id: "1",
    title: "Advanced Machine Learning Algorithm for Fraud Detection",
    category: "AI/ML",
    price: 2500000,
    priceType: "fixed",
    seller: "TechSecure Innovations",
    rating: 4.8,
    views: 1247,
    favorites: 89,
    listedDate: "2024-01-15",
    patentNumber: "US11,234,567",
    description: "Proprietary ML algorithm with 99.2% accuracy in fraud detection. Includes full source code, documentation, and 2-year support.",
    tags: ["Machine Learning", "Fraud Detection", "Fintech", "Security"],
    license: "Exclusive",
    exclusions: ["Competitors in same market"],
    revenue: 850000,
    status: "available",
    image: patentImage
  },
  {
    id: "2", 
    title: "Biodegradable Smart Packaging Technology",
    category: "Green Tech",
    price: 1800000,
    priceType: "negotiable",
    seller: "EcoPack Solutions",
    rating: 4.9,
    views: 892,
    favorites: 156,
    listedDate: "2024-01-08",
    patentNumber: "US11,456,789",
    description: "Revolutionary biodegradable packaging with embedded sensors for food freshness monitoring. Proven commercial viability.",
    tags: ["Sustainability", "Packaging", "IoT", "Food Tech"],
    license: "Non-exclusive",
    exclusions: [],
    revenue: 2100000,
    status: "available",
    image: patentImage
  },
  {
    id: "3",
    title: "Quantum Error Correction Protocol",
    category: "Quantum Computing",
    price: 5200000,
    priceType: "auction",
    seller: "Quantum Dynamics Corp",
    rating: 4.7,
    views: 634,
    favorites: 203,
    listedDate: "2024-01-20",
    patentNumber: "US11,789,012",
    description: "Breakthrough quantum error correction method reducing error rates by 95%. Essential for practical quantum computing applications.",
    tags: ["Quantum Computing", "Error Correction", "Research"],
    license: "Exclusive",
    exclusions: ["Direct competitors"],
    revenue: 0,
    status: "auction",
    image: patentImage
  },
  {
    id: "4",
    title: "Neural Interface for Prosthetic Control",
    category: "Medical Devices",
    price: 3400000,
    priceType: "fixed",
    seller: "BioNeural Technologies",
    rating: 4.9,
    views: 1523,
    favorites: 278,
    listedDate: "2023-12-28",
    patentNumber: "US10,987,654",
    description: "Advanced neural interface enabling intuitive control of prosthetic limbs. FDA approved with strong clinical trial results.",
    tags: ["Medical Devices", "Neural Interface", "Prosthetics", "FDA Approved"],
    license: "Exclusive",
    exclusions: ["Medical device manufacturers"],
    revenue: 1200000,
    status: "featured",
    image: patentImage
  }
];

const categories = ["AI/ML", "Green Tech", "Quantum Computing", "Medical Devices", "Automotive", "Fintech", "IoT", "Biotech"];

export function MarketplaceInterface() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedPatent, setSelectedPatent] = useState(marketplaceData[0]);

  const filteredPatents = marketplaceData.filter(patent => {
    const matchesSearch = patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || patent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number, type: string) => {
    const formatted = `$${(price / 1000000).toFixed(1)}M`;
    return type === "negotiable" ? `${formatted} (Negotiable)` : 
           type === "auction" ? `${formatted} (Auction)` : formatted;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "featured": return <Badge className="bg-gradient-primary">Featured</Badge>;
      case "auction": return <Badge variant="destructive">Auction</Badge>;
      default: return <Badge variant="outline">Available</Badge>;
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
                <ShoppingCart className="h-6 w-6 text-primary" />
                Patent Marketplace
              </h1>
              <p className="text-sm text-muted-foreground">Buy, sell, and license intellectual property</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <TrendingUp className="mr-2 h-4 w-4" />
                Market Trends
              </Button>
              <Button className="bg-gradient-primary">
                <DollarSign className="mr-2 h-4 w-4" />
                List Patent
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
                placeholder="Search patents by title, category, or technology..."
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
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 flex">
          {/* Patent List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="patent-section">{filteredPatents.length} Patents Available</h2>
                <div className="flex gap-2">
                  <Badge variant="outline">Price</Badge>
                  <Badge variant="outline">Rating</Badge>
                  <Badge variant="outline">Views</Badge>
                </div>
              </div>
              
              {filteredPatents.map((patent) => (
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
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-20 h-16 rounded-lg overflow-hidden border bg-muted/30 flex-shrink-0">
                        <img 
                          src={patent.image} 
                          alt={`${patent.title} patent`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{patent.title}</h3>
                          {getStatusBadge(patent.status)}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="font-mono">{patent.patentNumber}</span>
                          <Badge variant="secondary">{patent.category}</Badge>
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {patent.seller}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {patent.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {patent.tags.slice(0, 4).map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="text-xl font-bold text-success">
                          {formatPrice(patent.price, patent.priceType)}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-warning text-warning" />
                          <span>{patent.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {patent.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {patent.favorites} favorites
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Listed {patent.listedDate}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        <Button size="sm" className="bg-gradient-primary">
                          {patent.priceType === "auction" ? "Place Bid" : "Contact Seller"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Patent Details Panel */}
          <div className="w-80 border-l bg-muted/30 overflow-y-auto">
            <div className="p-4 border-b bg-card">
              <h3 className="font-semibold">Patent Details</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2">{selectedPatent.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedPatent.description}</p>
              </div>
              
              <div className="text-center p-4 bg-success/10 rounded-lg border">
                <p className="text-2xl font-bold text-success">
                  {formatPrice(selectedPatent.price, selectedPatent.priceType)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedPatent.license} License
                </p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Patent Number</span>
                  <p className="font-mono text-sm">{selectedPatent.patentNumber}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Seller</span>
                  <p className="text-sm">{selectedPatent.seller}</p>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase">Category</span>
                  <Badge variant="secondary">{selectedPatent.category}</Badge>
                </div>
                
                {selectedPatent.revenue > 0 && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase">Proven Revenue</span>
                    <p className="text-sm font-medium text-success">
                      ${(selectedPatent.revenue / 1000000).toFixed(1)}M annually
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase">Technology Tags</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedPatent.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-lg font-bold text-primary">{selectedPatent.views}</p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
                <div className="text-center p-3 bg-secondary/20 rounded-lg">
                  <p className="text-lg font-bold">{selectedPatent.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-gradient-primary">
                  <DollarSign className="mr-2 h-4 w-4" />
                  {selectedPatent.priceType === "auction" ? "Place Bid" : "Make Offer"}
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Contact Seller
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Request Due Diligence
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}