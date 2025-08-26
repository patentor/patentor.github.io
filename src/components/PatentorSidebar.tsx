import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FileText,
  Search,
  Users,
  ShoppingCart,
  Briefcase,
  TrendingUp,
  Plus,
  FolderOpen,
  Star,
  Building2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "Patent Drafting", url: "/drafting", icon: FileText },
  { title: "AI Research", url: "/research", icon: Search },
  { title: "My Patents", url: "/patents", icon: FolderOpen },
];

const servicesItems = [
  { title: "Attorney Directory", url: "/attorneys", icon: Users },
  { title: "Patent Marketplace", url: "/marketplace", icon: ShoppingCart },
  { title: "Commercialization", url: "/commercialization", icon: Briefcase },
  { title: "Investor Network", url: "/investors", icon: TrendingUp },
];

const patentProjects = [
  { name: "AI Vision System", status: "draft", progress: 65 },
  { name: "Quantum Algorithm", status: "published", progress: 100 },
  { name: "Biotech Device", status: "pending", progress: 80 },
];

export function PatentorSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar 
      className="border-r"
      collapsible="icon" 
      variant="sidebar"
    >
      <SidebarContent className="bg-card">
        {/* New Patent Button */}
        <div className="p-4">
          <Button 
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            {!collapsed && "New Patent"}
          </Button>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {!collapsed && "Main Tools"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Services */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {!collapsed && "Services"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {servicesItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Projects */}
        {!collapsed && (
          <SidebarGroup className="flex-1">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Recent Projects
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-2">
                {patentProjects.map((project, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${
                      project.status === 'draft' ? 'patent-status-draft' :
                      project.status === 'published' ? 'patent-status-published' :
                      'patent-status-pending'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{project.name}</span>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-xs text-muted-foreground capitalize mb-2">
                      {project.status}
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}