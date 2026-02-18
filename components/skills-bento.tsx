"use client";

import { motion, LayoutGroup } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import defaultResumeData from "@/data/resume.json";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { Cpu, Globe, Users, Zap, BarChart, Terminal, Code, Database } from "lucide-react";

interface SkillsBentoProps {
    data?: typeof defaultResumeData;
}

export function SkillsBento({ data = defaultResumeData }: SkillsBentoProps) {
    const { theme } = useTheme();

    if (theme === "engineer") return <SkillsEngineer data={data} />;
    if (theme === "creative") return <SkillsCreative data={data} />;
    if (theme === "minimalist") return <SkillsMinimalist data={data} />;
    if (theme === "neon") return <SkillsNeon data={data} />;
    return <SkillsExecutive data={data} />;
}

// ----------------------------------------------------------------------
// 1. EXECUTIVE THEME (Bento Grid)
// ----------------------------------------------------------------------
function SkillsExecutive({ data }: SkillsBentoProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const categories = Object.keys(data.skills) as Array<keyof typeof data.skills>;

    const icons: any = { strategic: BarChart, technical: Cpu, leadership: Users };

    return (
        <section className="min-h-screen py-24 px-8 md:px-16 flex flex-col justify-center">
            <div className="mb-16">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">
                    Capability <span className="text-muted">Matrix</span>
                </h2>
                <p className="max-w-xl text-lg text-muted/80 leading-relaxed">
                    A comprehensive overview of technical proficiency, strategic leadership, and core competencies cultivated over a decade of professional experience.
                </p>
            </div>
            <LayoutGroup>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {categories.map((cat, i) => {
                        const isSelected = selected === cat;
                        const Icon = icons[cat] || Zap;
                        return (
                            <motion.div
                                key={cat}
                                layout
                                onClick={() => setSelected(isSelected ? null : cat)}
                                className={cn(
                                    "cursor-pointer relative",
                                    isSelected ? "md:col-span-2 md:row-span-2 z-20" : "md:col-span-1"
                                )}
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                            >
                                <GlassCard className="h-full w-full p-8 flex flex-col justify-between group hover:border-primary/30 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <Icon strokeWidth={1} className="w-10 h-10 text-foreground" />
                                        <div className="text-xs uppercase tracking-widest text-muted font-medium">0{i + 1}</div>
                                    </div>
                                    <div>
                                        <motion.h3 layout="position" className="text-2xl font-semibold mb-2 capitalize text-foreground">
                                            {cat}
                                        </motion.h3>
                                        {isSelected && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                                <ul className="grid grid-cols-2 gap-4 mt-8">
                                                    {data.skills[cat].map((skill: string) => (
                                                        <li key={skill} className="flex items-center gap-2 text-muted">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-muted" />
                                                            {skill}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>
            </LayoutGroup>
        </section>
    );
}

// ----------------------------------------------------------------------
// 2. ENGINEER THEME (Dashboard / Matrix)
// ----------------------------------------------------------------------
function SkillsEngineer({ data }: SkillsBentoProps) {
    const categories = Object.keys(data.skills) as Array<keyof typeof data.skills>;

    return (
        <section className="min-h-screen py-24 px-8 md:px-16 bg-black text-green-500 font-mono">
            <div className="border border-green-900 p-2 mb-8 inline-block">
                <h2 className="text-xl tracking-widest uppercase">
                    [SYSTEM_CAPABILITIES]
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {categories.map((cat) => (
                    <div key={cat} className="border border-green-500/30 bg-green-900/10 p-6">
                        <div className="flex items-center gap-4 mb-6 border-b border-green-500/30 pb-4">
                            <Terminal className="w-6 h-6" />
                            <h3 className="text-xl font-bold uppercase">{cat}</h3>
                            <div className="flex-1 h-px bg-green-500/20" />
                            <span className="text-xs">STATUS: ONLINE</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.skills[cat].map((skill: string) => (
                                <div key={skill} className="flex items-center justify-between group cursor-crosshair hover:bg-green-500/10 p-2">
                                    <span className="text-sm">&gt; {skill}</span>
                                    <div className="w-24 h-2 bg-green-900/50 overflow-hidden relative">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 1, delay: Math.random() }}
                                            className="h-full bg-green-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 3. CREATIVE THEME (Sticky Notes / Masonry)
// ----------------------------------------------------------------------
function SkillsCreative({ data }: SkillsBentoProps) {
    const categories = Object.keys(data.skills) as Array<keyof typeof data.skills>;
    const colors = ["bg-yellow-200", "bg-pink-200", "bg-blue-200"];
    const rotations = ["rotate-[-2deg]", "rotate-[3deg]", "rotate-[-1deg]"];

    return (
        <section className="min-h-screen py-24 px-8 md:px-16 bg-[#fff0f5] flex flex-col items-center text-black">
            <h2 className="text-6xl md:text-8xl font-black text-pink-600 mb-20 text-center tracking-tighter" style={{ WebkitTextStroke: "1px black" }}>
                MY TOOLKIT
            </h2>

            <div className="flex flex-wrap justify-center gap-12 max-w-6xl">
                {categories.map((cat, i) => (
                    <motion.div
                        key={cat}
                        whileHover={{ scale: 1.05, rotate: 0 }}
                        className={cn(
                            "w-[300px] aspect-square p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-2 border-black flex flex-col",
                            colors[i % colors.length],
                            rotations[i % rotations.length]
                        )}
                    >
                        <div className="w-12 h-12 bg-black rounded-full text-white flex items-center justify-center font-bold text-xl mb-4">
                            {i + 1}
                        </div>
                        <h3 className="text-3xl font-bold mb-6 font-serif underline decoration-wavy decoration-pink-500">{cat}</h3>
                        <ul className="space-y-2">
                            {data.skills[cat].map((skill: string) => (
                                <li key={skill} className="font-bold text-sm bg-white/50 px-2 py-1 inline-block mr-2 mb-2 rounded border border-black/10">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 4. MINIMALIST THEME (Swiss)
// ----------------------------------------------------------------------
function SkillsMinimalist({ data }: SkillsBentoProps) {
    const categories = Object.keys(data.skills) as Array<keyof typeof data.skills>;
    return (
        <section className="min-h-screen py-24 px-8 md:px-24 bg-white text-black">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-black border-2 border-black">
                {categories.map((cat, i) => (
                    <div key={cat} className="bg-white p-12 min-h-[400px] flex flex-col justify-between hover:bg-zinc-50 transition-colors">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest bg-black text-white px-2 py-1">Section 0{i + 1}</span>
                            <h3 className="text-4xl font-bold mt-8 mb-8 tracking-tight">{cat}</h3>
                        </div>
                        <ul className="space-y-4">
                            {data.skills[cat].map(skill => (
                                <li key={skill} className="text-lg font-medium border-b border-black/10 pb-2">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ----------------------------------------------------------------------
// 5. NEON THEME (Cyberpunk)
// ----------------------------------------------------------------------
function SkillsNeon({ data }: SkillsBentoProps) {
    const categories = Object.keys(data.skills) as Array<keyof typeof data.skills>;
    return (
        <section className="min-h-screen py-24 px-8 md:px-16 bg-[#050510] text-[#00f0ff]">
            <h2 className="text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#fcee0a]">
                NEURAL_LINKS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat) => (
                    <div key={cat} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f0ff] to-[#fcee0a] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                        <div className="relative p-6 bg-black rounded-lg ring-1 ring-gray-900/5 leading-none flex items-top justify-start space-x-6 h-full">
                            <div className="space-y-4 w-full">
                                <h3 className="text-xl font-bold text-[#b026ff]">{cat}</h3>
                                <div className="space-y-2">
                                    {data.skills[cat].map(skill => (
                                        <div key={skill} className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-[#fcee0a] rounded-full shadow-[0_0_5px_#fcee0a]" />
                                            <span className="text-zinc-100">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
