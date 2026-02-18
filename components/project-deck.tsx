"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import defaultResumeData from "@/data/resume.json";
import { ArrowUpRight } from "lucide-react";

interface ProjectDeckProps {
    data?: typeof defaultResumeData;
}

export function ProjectDeck({ data = defaultResumeData }: ProjectDeckProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="h-[300vh] relative bg-background">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <h2 className="absolute top-12 left-8 md:left-16 text-xs uppercase tracking-[0.3em] text-muted">
                    Selected Case Studies
                </h2>

                <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
                    {data.projects.map((project, i) => {
                        // Calculate range for each card based on total projects
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
    // Only fade out if it's not the last one
    const opacity = useTransform(progress, [range[1] - 0.1, range[1]], [1, i === total - 1 ? 1 : 0]);

    // Slide up effect for entrance
    const y = useTransform(progress, [range[0], range[0] + 0.1], [50, 0]);

    return (
        <motion.div
            style={{
                scale,
                top: `calc(-10% + ${i * 25}px)`,
                zIndex: i
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
