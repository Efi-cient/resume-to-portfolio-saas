"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import defaultResumeData from "@/data/resume.json";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface ProjectDeckProps {
    data?: typeof defaultResumeData;
    scrollContainerRef?: React.RefObject<HTMLElement>;
}

export function ProjectDeck({ data = defaultResumeData, scrollContainerRef }: ProjectDeckProps) {
    const { theme } = useTheme();
    const config = themes[theme];

    switch (config.layout) {
        case "split": return <ProjectList data={data} />;
        case "minimal": return <ProjectMinimal data={data} />;
        case "grid": return <ProjectGrid data={data} />;
        case "asymmetric": return <ProjectAsymmetric data={data} />;
        case "centered": return <ProjectDeckCentered data={data} scrollContainerRef={scrollContainerRef} />;
        // New mappings
        case "blueprint": return <ProjectGrid data={data} />;
        case "print": return <ProjectMinimal data={data} />;
        case "journal": return <ProjectList data={data} />;
        case "acoustic": return <ProjectList data={data} />;
        case "darkroom": return <ProjectGrid data={data} />;
        case "viewport": return <ProjectAsymmetric data={data} />;
        case "timeline": return <ProjectList data={data} />;
        default: return <ProjectDeckCentered data={data} scrollContainerRef={scrollContainerRef} />;
    }
}

// ----------------------------------------------------------------------
// 1. CENTERED / DECK LAYOUT (Original)
// ----------------------------------------------------------------------
function ProjectDeckCentered({ data, scrollContainerRef }: ProjectDeckProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollContainerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="h-[300vh] relative bg-background">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <h2 className="absolute top-12 left-8 md:left-16 text-xs uppercase tracking-[0.3em] text-muted">
                    Selected Case Studies
                </h2>

                <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
                    {data?.projects.map((project, i) => {
                        const rangeStep = 1 / data.projects.length;
                        const start = i * rangeStep;
                        const end = start + rangeStep;

                        return (
                            <Card
                                key={project.id}
                                project={project}
                                progress={scrollYProgress}
                                range={[start, end]}
                                targetScale={1 - (data.projects.length - 1 - i) * 0.05}
                                i={i}
                                total={data.projects.length}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

interface CardProps {
    project: typeof defaultResumeData.projects[0];
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    i: number;
    total: number;
}

function Card({ project, progress, range, targetScale, i, total }: CardProps) {
    const scale = useTransform(progress, range, [1, targetScale]);
    const opacity = useTransform(progress, [range[1] - 0.1, range[1]], [1, i === total - 1 ? 1 : 0]);

    return (
        <motion.div
            style={{
                scale,
                opacity,
                top: `calc(-10% + ${i * 25}px)`,
                zIndex: total - i
            }}
            className="absolute top-0 w-full md:w-[800px] h-[500px] origin-top"
        >
            <GlassCard className="h-full w-full bg-background p-12 flex flex-col justify-between border-border shadow-2xl shadow-primary/5">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-mono text-muted mb-2 block">{project.role}</span>
                        <h3 className="text-4xl font-bold text-foreground">{project.title}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-muted" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-muted mb-4">Challenge</h4>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-muted mb-4">Impact</h4>
                        <div className="text-5xl font-light text-foreground tracking-tight">
                            {project.metric}
                        </div>
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    )
}

// ----------------------------------------------------------------------
// 2. SPLIT / LIST LAYOUT
// ----------------------------------------------------------------------
function ProjectList({ data }: ProjectDeckProps) {
    return (
        <section className="min-h-screen py-24 px-8 md:px-16 bg-background font-mono">
            <div className="border-b border-primary/30 pb-4 mb-16">
                <h2 className="text-xl tracking-widest uppercase text-primary">
                    [PROJECT_LOGS]
                </h2>
            </div>

            <div className="space-y-32">
                {data?.projects.map((project, i) => (
                    <div key={project.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start group">
                        <div className="md:col-span-2 text-primary/50 text-xs uppercase tracking-widest pt-2">
                            Log_0{i + 1}
                        </div>
                        <div className="md:col-span-10 border-l border-primary/20 pl-8 relative">
                            {/* Hover indicator */}
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />

                            <div className="mb-4">
                                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">{project.title}</h3>
                                <span className="text-sm bg-primary/10 text-primary px-2 py-1">{project.role}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                <div>
                                    <p className="text-primary/80 leading-relaxed">{project.description}</p>
                                </div>
                                <div className="bg-primary/5 p-6 border border-primary/10">
                                    <span className="text-xs uppercase text-primary/50 block mb-2">Outcome Metric</span>
                                    <span className="text-3xl font-bold text-primary">{project.metric}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ----------------------------------------------------------------------
// 3. MINIMAL LAYOUT
// ----------------------------------------------------------------------
function ProjectMinimal({ data }: ProjectDeckProps) {
    return (
        <section className="min-h-screen py-24 px-8 md:px-24 bg-background text-foreground">
            {data?.projects.map((project, i) => (
                <div key={project.id} className="border-t border-foreground py-16 group hover:bg-muted/5 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8">
                        <span className="text-xs font-bold uppercase w-32">Case 0{i + 1}</span>
                        <h3 className="text-5xl md:text-7xl font-bold flex-1 group-hover:translate-x-4 transition-transform duration-500">
                            {project.title}
                        </h3>
                        <div className="text-right">
                            <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
                        <div className="md:col-span-4 md:col-start-3">
                            <p className="text-xl leading-relaxed">{project.description}</p>
                        </div>
                        <div className="md:col-span-3 md:col-start-9">
                            <div className="text-sm uppercase tracking-widest mb-1 opacity-50">Result</div>
                            <div className="text-3xl font-medium">{project.metric}</div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="border-t border-foreground" />
        </section>
    )
}

// ----------------------------------------------------------------------
// 4. GRID LAYOUT
// ----------------------------------------------------------------------
function ProjectGrid({ data }: ProjectDeckProps) {
    return (
        <section className="min-h-screen py-24 px-8 md:px-16 bg-background">
            <h2 className="text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary">
                DEPLOYED_UNITS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data?.projects.map((project) => (
                    <div key={project.id} className="relative group bg-muted/5 border border-primary/20 p-8 rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <span className="text-xs font-bold text-primary border border-primary px-2 py-1 rounded">
                                    {project.role}
                                </span>
                                <ArrowUpRight className="text-primary w-5 h-5" />
                            </div>

                            <h3 className="text-3xl font-bold text-foreground mb-4">{project.title}</h3>
                            <p className="text-muted-foreground mb-8">{project.description}</p>

                            <div className="pt-8 border-t border-primary/10">
                                <span className="text-2xl font-bold text-primary">{project.metric}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ----------------------------------------------------------------------
// 5. ASYMMETRIC / MASONRY LAYOUT
// ----------------------------------------------------------------------
function ProjectAsymmetric({ data }: ProjectDeckProps) {
    return (
        <section className="min-h-screen py-24 px-8 md:px-16 bg-background overflow-x-hidden">
            {data?.projects.map((project, i) => (
                <div
                    key={project.id}
                    className={cn(
                        "flex flex-col md:flex-row gap-12 items-center mb-32",
                        i % 2 === 1 ? "md:flex-row-reverse" : ""
                    )}
                >
                    <div className="w-full md:w-1/2 relative">
                        <div className={cn(
                            "absolute inset-0 bg-primary/20",
                            i % 2 === 0 ? "-left-4 -top-4 rounded-tl-[3rem]" : "-right-4 -bottom-4 rounded-br-[3rem]"
                        )} />
                        <div className="relative bg-muted/10 p-12 backdrop-blur-sm border border-muted/20">
                            <div className="text-6xl font-black text-muted/20 absolute -top-8 -left-8 select-none">
                                0{i + 1}
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6 uppercase italic">
                                {project.title}
                            </h3>
                            <div className="text-3xl font-serif italic text-primary">
                                {project.metric}
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 md:px-12">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">{project.role}</h4>
                        <p className="text-xl md:text-2xl font-medium text-foreground/80 leading-relaxed">
                            {project.description}
                        </p>
                        <button className="mt-8 text-sm font-bold underline decoration-primary underline-offset-4 hover:text-primary transition-colors">
                            VIEW CASE STUDY
                        </button>
                    </div>
                </div>
            ))}
        </section>
    )
}
