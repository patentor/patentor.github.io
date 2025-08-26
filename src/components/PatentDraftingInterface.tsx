import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Timer,
  Check,
  X,
  ChevronDown,
  Plus,
  Bot,
  Save,
  Download,
  Share2,
  PenTool,
  Brain,
  Send,
  MessageSquare,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
// Using the uploaded USPTO template image
const usptoTemplate = "/lovable-uploads/016de9c6-6c47-4343-94e6-20a5d6af0906.png";

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
  const [patentData, setPatentData] = useState({
    title: "Adaptive Cathode Sintering System",
    inventors: "John Doe, Jane Smith, Michael Chen",
    assignee: "Tech Innovations Inc.",
    abstract: "Systems and methods for optimizing battery cathode microstructure via agentic feedback using in-situ impedance during thermal processing.",
    background: "Traditional sintering uses static schedules that fail to account for impedance drift, leading to suboptimal grain boundary properties and reduced battery performance.",
    summary: "The system measures impedance continuously, updates a thermal schedule agentically, and records parameters for repeatable manufacturing processes.",
    briefDescription: "Figure 1 shows the system architecture with impedance sensors and thermal control loops.",
    detailedDescription: "The invention comprises a sintering system with real-time impedance monitoring capabilities...",
    claims: [
      "A method comprising: measuring impedance in real time; adjusting sintering temperature based on measured impedance; recording optimized parameters; and producing a cathode with improved cycle life.",
      "The method of claim 1, wherein the impedance measurements are taken at frequencies between 1 Hz and 1 MHz.",
      "The method of claim 1, further comprising machine learning algorithms to predict optimal temperature profiles."
    ]
  });

  const [chatMessages, setChatMessages] = useState<Array<{
    id: number;
    type: "ai" | "user";
    content: string;
  }>>([
    {
      id: 1,
      type: "ai" as const,
      content: "I'm your patent research assistant. I can help you research prior art, improve claims language, and suggest technical improvements. What would you like to work on?"
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    title: true,
    abstract: true,
    claims: true,
    background: false,
    summary: false,
    briefDescription: false,
    detailedDescription: false
  });

  const provisionalDeadline = "2025-12-31T23:59:59Z";
  const { days, hours, minutes, seconds } = useCountdown(provisionalDeadline);

  const addClaim = (text: string) => {
    setPatentData(prev => ({
      ...prev,
      claims: [...prev.claims, text]
    }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      type: "user" as const,
      content: currentMessage
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setCurrentMessage("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai" as const,
        content: "I'll help you research that topic. Based on your query, I found several relevant prior art references and can suggest improvements to your claims language."
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-6">
        {/* Workspace Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center flex-1">
            <h1 className="patent-title">Patent Drafting Workspace</h1>
            <p className="text-sm text-muted-foreground">Draft • Last saved 2 minutes ago</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm bg-muted border rounded-lg px-3 py-1.5">
              <Clock className="w-4 h-4" />
              <span>Patent Filing Deadline:</span>
              <span className="font-mono text-destructive">
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
          </div>
        </div>

        {/* Main Two-Panel Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: AI Chat Assistant */}
          <div className="bg-card border rounded-lg shadow-card h-[700px] flex flex-col">
            <div className="border-b p-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AI Research & Drafting Assistant</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Research prior art, improve claims, generate content
              </p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-muted text-foreground px-3 py-2 rounded-lg text-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="border-t p-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Brain className="mr-1 h-3 w-3" />
                  Improve Claims
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <PenTool className="mr-1 h-3 w-3" />
                  Generate Abstract
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Search className="mr-1 h-3 w-3" />
                  Prior Art Search
                </Button>
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask me to research, improve, or generate patent content..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  className="flex-1 min-h-[60px] text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button onClick={sendMessage} size="sm" className="bg-gradient-primary">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="border-t p-4 space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                AI Suggestions
              </h4>
              {SAMPLE_SUGGESTIONS.map((s) => (
                <div key={s.id} className="border rounded-lg p-3 text-sm">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    {s.section}
                  </div>
                  <div className="text-sm mb-2">{s.text}</div>
                  <div className="flex gap-2">
                    <button
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-success text-success-foreground text-xs hover:bg-success/90"
                      onClick={() => replaceSection(s.section, s.text)}
                    >
                      <Check className="w-3 h-3" /> Accept
                    </button>
                    <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-destructive text-destructive-foreground text-xs hover:bg-destructive/90">
                      <X className="w-3 h-3" /> Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: USPTO-Style Patent Preview */}
          <div className="bg-white border rounded-lg shadow-card overflow-hidden">
            {/* USPTO Header */}
            <div className="border-b bg-gray-50 p-4">
              <div className="flex justify-between items-start">
                <div className="text-xs text-gray-600">
                  <div className="font-mono">US 20240123456 A1</div>
                  <div className="mt-1">United States Patent Application Publication</div>
                  <div className="mt-1">Pub. No.: US 20240123456 A1</div>
                  <div>Pub. Date: Mar 28, 2024</div>
                </div>
                <div className="w-24 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500 border">
                  BARCODE
                </div>
              </div>
            </div>

            {/* Patent Content */}
            <div className="p-6 h-[600px] overflow-y-auto text-sm leading-relaxed font-serif">
              <div className="space-y-6">
                {/* Title */}
                <div className="text-center">
                  <h1 className="text-lg font-bold uppercase tracking-wide">
                    {patentData.title || "(Patent Title)"}
                  </h1>
                </div>

                {/* Inventor Information */}
                <div className="space-y-2">
                  <div className="font-semibold">(75) Inventors:</div>
                  <div className="pl-4">{patentData.inventors}</div>
                  
                  <div className="font-semibold">(73) Assignee:</div>
                  <div className="pl-4">{patentData.assignee}</div>
                </div>

                {/* Abstract */}
                <div>
                  <div className="font-semibold">ABSTRACT</div>
                  <div className="mt-2 text-justify">
                    {patentData.abstract || "(Abstract to be provided)"}
                  </div>
                </div>

                {/* Background */}
                <div>
                  <div className="font-semibold">BACKGROUND OF THE INVENTION</div>
                  <div className="mt-2 text-justify">
                    <div className="font-semibold">[0001]</div>
                    {patentData.background || "(Background to be provided)"}
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <div className="font-semibold">SUMMARY OF THE INVENTION</div>
                  <div className="mt-2 text-justify">
                    <div className="font-semibold">[0002]</div>
                    {patentData.summary || "(Summary to be provided)"}
                  </div>
                </div>

                {/* Claims */}
                <div>
                  <div className="font-semibold">CLAIMS</div>
                  <div className="mt-2">
                    {patentData.claims.map((claim, i) => (
                      <div key={i} className="mb-3">
                        <span className="font-semibold">{i + 1}. </span>
                        <span className="text-justify">
                          {claim || "(Claim to be provided)"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Patent Sections */}
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold">Patent Sections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(expandedSections).map(([section, expanded]) => (
              <div key={section} className="border rounded-lg">
                <button
                  onClick={() => toggleSection(section as keyof typeof expandedSections)}
                  className="w-full flex justify-between items-center p-4 hover:bg-muted/50"
                >
                  <span className="font-medium capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      {section === 'title' && (
                        <Input 
                          value={patentData.title}
                          onChange={(e) => setPatentData({...patentData, title: e.target.value})}
                          placeholder="Enter patent title"
                        />
                      )}
                      
                      {section === 'inventors' && (
                        <Input 
                          value={patentData.inventors}
                          onChange={(e) => setPatentData({...patentData, inventors: e.target.value})}
                          placeholder="Enter inventors"
                        />
                      )}
                      
                      {['abstract', 'background', 'summary', 'briefDescription', 'detailedDescription'].includes(section) && (
                        <Textarea
                          className="min-h-[100px]"
                          value={patentData[section as keyof typeof patentData] as string}
                          onChange={(e) => setPatentData({
                            ...patentData, 
                            [section]: e.target.value
                          })}
                          placeholder={`Enter ${section}`}
                        />
                      )}
                      
                      {section === 'claims' && (
                        <div className="space-y-2">
                          {patentData.claims.map((claim, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="text-sm font-mono mt-2">{i + 1}.</div>
                              <Textarea
                                className="flex-1"
                                value={claim}
                                onChange={(e) => {
                                  const newClaims = [...patentData.claims];
                                  newClaims[i] = e.target.value;
                                  setPatentData({...patentData, claims: newClaims});
                                }}
                                placeholder={`Enter claim ${i + 1}`}
                              />
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addClaim("")}
                            className="mt-2"
                          >
                            <Plus className="w-4 h-4 mr-2" /> Add Claim
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}