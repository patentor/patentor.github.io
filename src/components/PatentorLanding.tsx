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
  Shield,
  Brain,
  CheckCircle,
  Star
} from "lucide-react";
import heroImage from "@/assets/hero-patent.jpg";
import { Link } from "react-router-dom";

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
    { number: "3.3M", label: "Active US Patents" },
    { number: "17M", label: "Patents Worldwide" },
    { number: "USPTO", label: "Official Database" },
    { number: "WIPO", label: "Global Registry" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-2xl text-foreground">Patentor.ai</span>
              <Badge className="bg-primary text-white border-0">Beta</Badge>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#attorneys" className="text-muted-foreground hover:text-foreground transition-colors">Attorneys</a>
              <a href="#marketplace" className="text-muted-foreground hover:text-foreground transition-colors">Marketplace</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => alert('Sign in functionality coming soon')}>Sign In</Button>
              <Button asChild className="bg-primary hover:bg-primary/90"><Link to="/drafting">Get Started</Link></Button>
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
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                AI Patent Research & Drafting
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Draft, analyze, and refine patents side by side with an AI research companion. 
                From research to commercialization — all in one pipeline.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Link to="/drafting">
                  Start Patent Draft
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/drafting">
                  <FileText className="mr-2 h-5 w-5" />
                  View Demo
                </Link>
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
            <h2 className="text-4xl font-bold mb-4">What This Tool Does</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for patent and academic writing
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-3">
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Ready to Start Writing?
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started with professional patent and academic writing tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Link to="/drafting">
                  Start Writing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/drafting">View Templates</Link>
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
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
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