import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  FileText,
  Search,
  Timer,
  Check,
  X,
  ChevronDown,
  PanelLeftClose,
  PanelRightClose,
  Plus,
  Bot,
  Save,
  Download,
  Share2,
  Lightbulb,
  PenTool,
  Brain,
  FolderOpen,
  Users,
  ShoppingCart,
  Briefcase,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Mock Data
const SAMPLE_SUGGESTIONS = [
  {
    id: 1,
    section: "Claims",
    text: "A method for optimizing lithium-ion battery cathode composition by dynamically adjusting sintering temperature profiles based on in-situ impedance measurements.",
  },
  {
    id: 2,
    section: "Background",
    text: "Conventional cathode fabrication relies on fixed thermal schedules that ignore microstructure drift, which reduces cycle life and increases cost.",
  },
  {
    id: 3,
    section: "Abstract",
    text: "An agentic research system that iteratively proposes, tests, and documents patentable variants using structured prompts and literature evidence.",
  },
];

// Utilities
function useCountdown(targetDateStr: string) {
  const [now, setNow] = useState<Date>(new Date());
  const target = useMemo(() => new Date(targetDateStr), [targetDateStr]);
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

// Resizable Sidebar Hook
function useResizable(initial = 380, min = 300, max = 600) {
  const [width, setWidth] = useState(initial);
  const dragging = useRef(false);
  const onMouseDown = () => (dragging.current = true);
  const onMouseUp = () => (dragging.current = false);
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const next = Math.min(max, Math.max(min, e.clientX));
    setWidth(next);
  };
  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  return { width, setWidth, onMouseDown } as const;
}

// Accordion Component
function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-lg overflow-hidden mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center px-4 py-3 hover:bg-muted"
      >
        <span className="font-medium text-left">{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PatentDraftingInterface() {
  const [collapsed, setCollapsed] = useState(false);
  const { width, onMouseDown } = useResizable();

  const [patentData, setPatentData] = useState({
    title: "Adaptive Cathode Sintering for Long-Life Batteries",
    inventors: "John Doe, Jane Smith",
    assignee: "Tech Innovations Inc.",
    abstract: "Systems and methods for optimizing battery cathode microstructure via agentic feedback using in-situ impedance during thermal processing.",
    background: "Traditional sintering uses static schedules that fail to account for impedance drift, leading to suboptimal grain boundary properties.",
    summary: "The system measures impedance continuously, updates a thermal schedule agentically, and records parameters for repeatable manufacturing.",
    briefDescription: "",
    detailedDescription: "",
    claims: [
      "A method comprising: measuring impedance in real time; adjusting sintering temperature; recording a recipe; and producing a cathode with improved cycle life."
    ]
  });

  const [notes, setNotes] = useState("");
  const provisionalDeadline = "2025-12-31T23:59:59Z";
  const { days, hours, minutes, seconds } = useCountdown(provisionalDeadline);

  const addClaim = (text: string) => {
    setPatentData(prev => ({
      ...prev,
      claims: [...prev.claims, text]
    }));
  };

  const replaceSection = (section: string, text: string) => {
    if (section === "Abstract") {
      setPatentData(prev => ({ ...prev, abstract: text }));
    } else if (section === "Background") {
      setPatentData(prev => ({ ...prev, background: text }));
    } else if (section === "Claims") {
      addClaim(text);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="patent-title">Patent Drafting Workspace</h1>
              <p className="text-sm text-muted-foreground">Draft • Last saved 2 minutes ago</p>
            </div>
            
            {/* Horizontal Navigation Bar */}
            <nav className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              <NavLink 
                to="/drafting" 
                className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Draft</span>
              </NavLink>
              
              <NavLink 
                to="/research" 
                className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                <Search className="h-4 w-4" />
                <span>Research</span>
              </NavLink>
              
              <NavLink 
                to="/patents" 
                className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                <FolderOpen className="h-4 w-4" />
                <span>Patents</span>
              </NavLink>
              
              <NavLink 
                to="/attorneys" 
                className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Attorneys</span>
              </NavLink>
              
              <NavLink 
                to="/marketplace" 
                className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Market</span>
              </NavLink>
              
              <NavLink 
                to="/commercialization" 
                className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                <Briefcase className="h-4 w-4" />
                <span>Commercialize</span>
              </NavLink>
              
              <NavLink 
                to="/investors" 
                className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Investors</span>
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm bg-muted border rounded-lg px-3 py-1.5">
              <Timer className="w-4 h-4" />
              <span>Provisional:</span>
              <span className="font-mono">
                {String(days).padStart(2, "0")}d:{String(hours).padStart(2, "0")}h:{String(minutes).padStart(2, "0")}m:{String(seconds).padStart(2, "0")}s
              </span>
            </div>
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

      {/* Main Layout */}
      <div className="flex w-full pt-20">
        {/* Sidebar / Research Panel */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.aside
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              style={{ width }}
              className="shrink-0 border-r bg-muted/30 relative"
            >
              <div className="p-4 border-b bg-card">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Research Assistant
                  </h3>
                  <button
                    onClick={() => setCollapsed(true)}
                    className="p-1.5 rounded hover:bg-muted"
                    title="Collapse"
                  >
                    <PanelLeftClose className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto h-full">
                <div className="text-xs text-muted-foreground mb-3">
                  Explore papers, prior art, and variants. Accept findings into the draft.
                </div>

                {/* Chat Interface */}
                <div className="space-y-2">
                  <textarea
                    placeholder="Ask the agent to research prior art around impedance-based thermal schedules..."
                    className="w-full h-28 rounded border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-gradient-primary">
                      <Search className="w-4 h-4 mr-1" />
                      Run Agent
                    </Button>
                    <Button variant="outline" size="sm">Save Note</Button>
                  </div>
                </div>

                {/* Patent Language AI */}
                <div className="border rounded-lg p-3">
                  <h4 className="text-sm font-medium mb-2">Patent Language AI</h4>
                  <div className="space-y-2">
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
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">AI Suggestions</h4>
                  {SAMPLE_SUGGESTIONS.map((s) => (
                    <div key={s.id} className="border rounded-lg p-3">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{s.section}</div>
                      <div className="text-sm mb-2">{s.text}</div>
                      <div className="flex gap-2">
                        <button
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-600 text-white text-xs hover:bg-green-700"
                          onClick={() => replaceSection(s.section, s.text)}
                        >
                          <Check className="w-3 h-3" /> Accept
                        </button>
                        <button className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-600 text-white text-xs hover:bg-red-700">
                          <X className="w-3 h-3" /> Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drag Handle */}
              <div
                onMouseDown={onMouseDown}
                className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-border hover:bg-primary/50 transition-colors"
                title="Drag to resize"
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Workspace */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <h3 className="font-semibold">Workspace</h3>
            </div>
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="p-1.5 rounded hover:bg-muted"
              title={collapsed ? "Expand panel" : "Collapse panel"}
            >
              {collapsed ? <PanelRightClose className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid lg:grid-cols-5 gap-6 p-6 min-h-full">
              {/* Left: Form Sections */}
              <div className="lg:col-span-2 space-y-4">
                <Accordion title="Title & Inventors" defaultOpen>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="title">Patent Title</Label>
                      <Input 
                        id="title"
                        value={patentData.title}
                        onChange={(e) => setPatentData({...patentData, title: e.target.value})}
                        className="mt-1"
                      />
                    </div>
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
                </Accordion>

                <Accordion title="Abstract" defaultOpen>
                  <textarea
                    className="w-full h-28 px-3 py-2 rounded border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    value={patentData.abstract}
                    onChange={(e) => setPatentData({...patentData, abstract: e.target.value})}
                    placeholder="A concise technical summary of the invention..."
                  />
                </Accordion>

                <Accordion title="Background">
                  <textarea
                    className="w-full h-28 px-3 py-2 rounded border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    value={patentData.background}
                    onChange={(e) => setPatentData({...patentData, background: e.target.value})}
                    placeholder="Describe the context and prior art..."
                  />
                </Accordion>

                <Accordion title="Summary">
                  <textarea
                    className="w-full h-28 px-3 py-2 rounded border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    value={patentData.summary}
                    onChange={(e) => setPatentData({...patentData, summary: e.target.value})}
                    placeholder="Provide a comprehensive overview..."
                  />
                </Accordion>

                <Accordion title="Claims" defaultOpen>
                  <div className="space-y-2">
                    {patentData.claims.map((claim, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="text-xs opacity-60 mt-1 font-mono">{i + 1}.</div>
                        <textarea
                          className="flex-1 h-20 px-3 py-2 rounded border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                          value={claim}
                          onChange={(e) => {
                            const newClaims = [...patentData.claims];
                            newClaims[i] = e.target.value;
                            setPatentData({...patentData, claims: newClaims});
                          }}
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addClaim("")}
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Claim
                    </Button>
                  </div>
                </Accordion>
              </div>

              {/* Right: Live Patent Preview */}
              <div className="lg:col-span-3">
                <div className="rounded-lg bg-card border p-6 shadow-sm min-h-[600px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-muted-foreground">Live Patent Preview</div>
                    <div className="text-xs text-muted-foreground">Auto-updates as you type</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-sm leading-relaxed">
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Title</div>
                        <div className="font-semibold">{patentData.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Inventors: {patentData.inventors}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Assignee: {patentData.assignee}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Abstract</div>
                        <p className="text-justify">{patentData.abstract || <span className="opacity-50">(Not yet written)</span>}</p>
                      </div>

                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Background</div>
                        <p className="text-justify">{patentData.background || <span className="opacity-50">(Not yet written)</span>}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Summary</div>
                        <p className="text-justify">{patentData.summary || <span className="opacity-50">(Not yet written)</span>}</p>
                      </div>
                      
                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Claims</div>
                        <ol className="list-decimal pl-5 space-y-2">
                          {patentData.claims.map((c, i) => (
                            <li key={i} className="text-justify">
                              {c || <span className="opacity-50">(Empty claim)</span>}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}