import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell, 
  Search, 
  Settings, 
  User,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
  FileText,
  Users,
  ShoppingCart,
  Briefcase,
  TrendingUp,
  FolderOpen
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PatentorLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { title: "Draft", url: "/drafting", icon: FileText },
  { title: "Research", url: "/research", icon: Search },
  { title: "Patents", url: "/patents", icon: FolderOpen },
  { title: "Attorneys", url: "/attorneys", icon: Users },
  { title: "Marketplace", url: "/marketplace", icon: ShoppingCart },
  { title: "Commercialization", url: "/commercialization", icon: Briefcase },
  { title: "Investors", url: "/investors", icon: TrendingUp },
];

export function PatentorLayout({ children }: PatentorLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95 shadow-card">
        <div className="container mx-auto px-6">
          {/* Top row */}
          <div className="flex items-center justify-between py-4">
            <NavLink to="/" className="flex items-center gap-2 group cursor-pointer" aria-label="Go to home">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground group-hover:text-foreground">Patentor.ai</h1>
                <p className="text-xs text-muted-foreground">AI agentic tool for patent & academic deep research, drafting, and commercialization</p>
              </div>
            </NavLink>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-auto pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search patents, research, attorneys, marketplace..." 
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center justify-center gap-1 bg-muted/30 rounded-lg p-1 mb-4">
            {navigationItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-background text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-background">
        {children}
      </main>
    </div>
  );
}