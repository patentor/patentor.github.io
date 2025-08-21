import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  FileText, 
  Search, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Briefcase,
  Zap,
  Shield,
  Brain,
  CheckCircle,
  Star
} from "lucide-react";
import heroImage from "@/assets/hero-patent.jpg";

export function PatentorLanding() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Patent Drafting",
      description: "Advanced AI assists with patent structure, claims writing, and language optimization",
      color: "text-primary"
    },
    {
      icon: Search,
      title: "Deep Research & Prior Art",
      description: "Comprehensive patent database search and academic research capabilities",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Attorney Directory",
      description: "Connect with registered IP attorneys for professional patent prosecution",
      color: "text-success"
    },
    {
      icon: ShoppingCart,
      title: "Patent Marketplace", 
      description: "Buy and sell patents directly with integrated valuation tools",
      color: "text-destructive"
    },
    {
      icon: Briefcase,
      title: "Commercialization Services",
      description: "Manufacturing, distribution, and investor connection services",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Investor Network",
      description: "Access to investors interested in patent licensing and acquisition",
      color: "text-accent"
    }
  ];

  const stats = [
    { number: "50K+", label: "Patents Processed" },
    { number: "2.5K+", label: "IP Attorneys" },
    { number: "$50M+", label: "Patent Values Tracked" },
    { number: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-2xl text-foreground">Patentor.ai</span>
              <Badge className="bg-gradient-primary border-0">Beta</Badge>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#attorneys" className="text-muted-foreground hover:text-foreground transition-colors">Attorneys</a>
              <a href="#marketplace" className="text-muted-foreground hover:text-foreground transition-colors">Marketplace</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline">Sign In</Button>
              <Button className="bg-gradient-primary hover:shadow-glow">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  AI-Powered Patent
                </span>
                <br />
                <span className="text-foreground">Innovation Platform</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Transform your ideas into protected intellectual property with AI assistance, 
                expert attorney network, and comprehensive commercialization services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6">
                Start Patent Draft
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <FileText className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up">
                  <div className="text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Complete Patent Ecosystem</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From initial idea to market success - everything you need in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-background to-muted flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Protect Your Innovation?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of inventors who trust Patentor.ai for their intellectual property needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                Start Free Trial
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="font-bold text-xl">Patentor.ai</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered patent platform for inventors, attorneys, and investors.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Patent Drafting</a></li>
                <li><a href="#" className="hover:text-foreground">AI Research</a></li>
                <li><a href="#" className="hover:text-foreground">Prior Art Search</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Attorney Directory</a></li>
                <li><a href="#" className="hover:text-foreground">Patent Marketplace</a></li>
                <li><a href="#" className="hover:text-foreground">Commercialization</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Patentor.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}