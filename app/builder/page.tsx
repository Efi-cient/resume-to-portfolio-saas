"use client";

import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { themes, Theme } from "@/lib/themes";
import defaultResumeData from "@/data/resume.json";
import { Hero } from "@/components/hero";
import { SkillsBento } from "@/components/skills-bento";
import { ProjectDeck } from "@/components/project-deck";
import { Footer } from "@/components/footer";
import { DomainGuideModal } from "@/components/domain-guide-modal";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Palette, Type, Smartphone, Monitor, Save, Globe } from "lucide-react";

export default function BuilderPage() {
    const { theme, setTheme } = useTheme();
    // State for resume data
    const [resumeData, setResumeData] = useState(defaultResumeData);
    const [activeTab, setActiveTab] = useState<"content" | "style">("content");
    const [showDomainModal, setShowDomainModal] = useState(false);

    // Handle Input Changes
    const handleInputChange = (field: string, value: any) => {
        setResumeData((prev) => ({ ...prev, [field]: value }));
    };

    const handeArrayChange = (field: string, index: number, value: string) => {
        setResumeData(prev => {
            // @ts-ignore
            const newArray = [...prev[field]];
            newArray[index] = value;
            return { ...prev, [field]: newArray };
        });
    }

    return (
        <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-50">
            {/* SIDEBAR EDITOR */}
            <aside className="w-[400px] flex-shrink-0 border-r border-white/10 flex flex-col bg-zinc-900/50 backdrop-blur-xl">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold tracking-tight">Portfolio Engine</h1>
                    <p className="text-xs text-zinc-500 mt-1">v1.0.0 • Executive Build</p>
                </div>

                {/* TABS */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setActiveTab("content")}
                        className={cn(
                            "flex-1 py-3 text-sm font-medium transition-colors",
                            activeTab === "content" ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <Type className="w-4 h-4 inline-block mr-2" />
                        Content
                    </button>
                    <button
                        onClick={() => setActiveTab("style")}
                        className={cn(
                            "flex-1 py-3 text-sm font-medium transition-colors",
                            activeTab === "style" ? "bg-white/5 text-white" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <Palette className="w-4 h-4 inline-block mr-2" />
                        Aesthetic
                    </button>
                </div>

                {/* SCROLLABLE FORM AREA */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {activeTab === "content" ? (
                        <div className="space-y-6">
                            {/* FILE UPLOAD */}
                            <div className="p-4 border border-dashed border-white/20 rounded-lg bg-white/5 text-center transition-colors hover:bg-white/10 hover:border-white/40 group">
                                <label className="cursor-pointer block">
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-2 group-hover:text-white transition-colors">Import CV (PDF/DOCX)</span>
                                    <input
                                        type="file"
                                        accept=".pdf,.docx,.doc"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const formData = new FormData();
                                            formData.append("file", file);

                                            // Show loading state (optimistic UI)
                                            setResumeData(prev => ({ ...prev, tagline: "Parsing CV... please wait." }));

                                            try {
                                                const res = await fetch("/api/ingest", {
                                                    method: "POST",
                                                    body: formData
                                                });
                                                if (res.ok) {
                                                    const data = await res.json();
                                                    setResumeData(prev => ({ ...prev, ...data }));
                                                } else {
                                                    alert("Parsing failed. Please check the file format.");
                                                    setResumeData(prev => ({ ...prev, tagline: defaultResumeData.tagline }));
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                alert("Server error during parsing.");
                                                setResumeData(prev => ({ ...prev, tagline: defaultResumeData.tagline }));
                                            }
                                        }}
                                    />
                                    <span className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">Click to select file</span>
                                </label>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Identity</h3>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Full Name</label>
                                    <input
                                        type="text"
                                        value={resumeData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Tagline</label>
                                    <textarea
                                        value={resumeData.tagline}
                                        onChange={(e) => handleInputChange("tagline", e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30 h-20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Ticker Highlights</h3>
                                {resumeData.ticker.map((item, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        value={item}
                                        onChange={(e) => handeArrayChange("ticker", i, e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Theme Generator</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {Object.values(themes).map((t) => (
                                    <button
                                        key={t.name}
                                        onClick={() => setTheme(t.name)}
                                        className={cn(
                                            "relative p-4 rounded-xl border text-left transition-all",
                                            theme === t.name
                                                ? "border-white bg-white/10"
                                                : "border-white/5 hover:border-white/20 bg-black/20"
                                        )}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold">{t.label}</span>
                                            {theme === t.name && <div className="w-2 h-2 rounded-full bg-green-500" />}
                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            <div className="w-6 h-6 rounded-full" style={{ background: t.colors.background, border: "1px solid white" }} />
                                            <div className="w-6 h-6 rounded-full" style={{ background: t.colors.primary }} />
                                            <div className="w-6 h-6 rounded-full" style={{ background: t.colors.muted }} />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                                <div className="flex items-center gap-2 text-sky-400 mb-2">
                                    <Smartphone className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase">Mobile Responsive</span>
                                </div>
                                <p className="text-xs text-sky-200/70 leading-relaxed">
                                    All themes are automatically optimized for mobile devices. The preview on the right shows the desktop view.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER ACTIONS */}
                <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/20">
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
                                const downloadAnchorNode = document.createElement('a');
                                downloadAnchorNode.setAttribute("href", dataStr);
                                downloadAnchorNode.setAttribute("download", "resume.json");
                                document.body.appendChild(downloadAnchorNode);
                                downloadAnchorNode.click();
                                downloadAnchorNode.remove();
                            }}
                            className="text-xs text-zinc-400 hover:text-white flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded transition-colors"
                        >
                            <Save className="w-3 h-3" />
                            JSON
                        </button>
                        <button
                            onClick={() => setShowDomainModal(true)}
                            className="text-xs text-zinc-400 hover:text-purple-400 flex items-center gap-2 px-2 py-1 hover:bg-purple-500/10 rounded transition-colors"
                        >
                            <Globe className="w-3 h-3" />
                            Domain
                        </button>
                    </div>

                    <a
                        href="https://vercel.com/new"
                        target="_blank"
                        className="px-4 py-2 bg-white text-black text-sm font-bold rounded hover:bg-zinc-200 transition-colors flex items-center gap-2"
                    >
                        Deploy
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </aside>

            {/* PREVIEW AREA */}
            <main className="flex-1 relative overflow-y-auto bg-black">
                {showDomainModal && <DomainGuideModal onClose={() => setShowDomainModal(false)} />}
                <div className="absolute inset-4 rounded-xl overflow-hidden border border-white/5 shadow-2xl bg-background transition-colors duration-500">
                    {/* We scale the preview down slightly to fit a "viewport" vibe if needed, but full width is better for realism */}
                    <div className="h-full overflow-y-auto scrollbar-hide">
                        <Hero data={resumeData} />
                        <SkillsBento data={resumeData} />
                        <ProjectDeck data={resumeData} />
                        <Footer data={resumeData} />
                    </div>
                </div>
            </main>
        </div>
    );
}
