"use client";

import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import defaultResumeData from "@/data/resume.json";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { themes } from "@/lib/themes";

interface HeroProps {
    data?: typeof defaultResumeData;
}

export function Hero({ data = defaultResumeData }: HeroProps) {
    const { theme } = useTheme();
    const config = themes[theme];

    switch (config.layout) {
        case "split": return <HeroSplit data={data} />;
        case "centered": return <HeroCentered data={data} />;
        case "minimal": return <HeroMinimal data={data} />;
        case "grid": return <HeroGrid data={data} />;
        case "asymmetric": return <HeroAsymmetric data={data} />;
        default: return <HeroCentered data={data} />;
    }
}

// ----------------------------------------------------------------------
// 1. CENTERED LAYOUT (Executive, Photographer, Musician)
// ----------------------------------------------------------------------
function HeroCentered({ data }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 50 };
    const smoothMouseX = useSpring(mouseX, springConfig);

    function handleMouseMove(e: React.MouseEvent) {
        const { clientX } = e;
        const { innerWidth } = window;
        const x = (clientX / innerWidth) * 2 - 1;
        mouseX.set(x);
    }

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden px-8 md:px-16 text-center"
        >
            <div className="z-10 w-full max-w-[90vw]">
                <motion.h1
                    className="text-[10vw] leading-[0.9] font-bold tracking-tighter text-foreground select-none"
                    style={{
                        textShadow: useTransform(smoothMouseX, [-1, 1], ["-10px 10px 20px var(--border)", "10px 10px 20px var(--border)"]),
                    }}
                >
                    {data.name.split(" ").map((word, i) => (
                        <span key={i} className="block">{word}</span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-8 text-2xl md:text-3xl font-light text-muted max-w-2xl mx-auto"
                >
                    {data.tagline}
                </motion.p>
            </div>

            <BackgroundGrain />
        </section>
    );
}

// ----------------------------------------------------------------------
// 2. SPLIT LAYOUT (Engineer, Video Editor, Software Engineer)
// ----------------------------------------------------------------------
function HeroSplit({ data }: HeroProps) {
    const [text, setText] = useState("");
    const fullText = `> INIT SYSTEM_BOOT\n> LOAD MODULE: ${data.name.toUpperCase()}\n> STATUS: ${data.tagline}`;

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <section className="min-h-[100vh] grid grid-cols-1 md:grid-cols-2 bg-background relative overflow-hidden">
            <div className="flex flex-col justify-center p-8 md:p-16 border-r border-border relative z-10">
                <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter opacity-90 text-foreground">
                    {data.name}
                </h1>
                <div className="text-xl md:text-2xl whitespace-pre-line min-h-[120px] opacity-80 font-mono text-primary">
                    {text}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-3 h-6 bg-primary ml-1 align-middle"
                    />
                </div>
            </div>

            <div className="flex items-center justify-center relative overflow-hidden bg-muted/5">
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                    {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="border border-border/50" />
                    ))}
                </div>
                <div className="p-8">
                    <div className="aspect-square w-64 md:w-96 rounded-full border border-primary/20 flex items-center justify-center relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-t-2 border-primary rounded-full"
                        />
                        <span className="text-6xl">⌘</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ----------------------------------------------------------------------
// 3. ASYMMETRIC LAYOUT (Creative, Fashion)
// ----------------------------------------------------------------------
function HeroAsymmetric({ data }: HeroProps) {
    return (
        <section className="min-h-[100vh] flex flex-col justify-center items-center overflow-hidden bg-background relative">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] border-[3px] border-muted/20 rounded-full border-dashed"
            />

            <div className="relative z-10 text-center mix-blend-difference">
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[12vw] font-black leading-none text-foreground tracking-tighter"
                >
                    {data.name.split(" ")[0]}
                </motion.h1>
                <motion.h1
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[12vw] font-black leading-none text-muted -mt-[4vw] ml-[10vw]"
                >
                    {data.name.split(" ")[1]}
                </motion.h1>

                <motion.div
                    className="mt-12 bg-foreground text-background p-6 rotate-[-2deg] inline-block shadow-[8px_8px_0px_0px_var(--primary)] hover:rotate-2 transition-transform border border-background"
                >
                    <p className="text-2xl font-bold font-serif italic">{data.tagline}</p>
                </motion.div>
            </div>
        </section>
    )
}

// ----------------------------------------------------------------------
// 4. MINIMAL LAYOUT (Minimalist, Graphic Designer, Architect, Academic)
// ----------------------------------------------------------------------
function HeroMinimal({ data }: HeroProps) {
    return (
        <section className="min-h-screen bg-background text-foreground p-8 md:p-24 flex flex-col justify-between">
            <div className="flex justify-between border-b-2 border-foreground pb-4 uppercase tracking-tighter text-sm font-bold">
                <span>Portfolio 2026</span>
                <span>{new Date().toLocaleDateString()}</span>
                <span>Vol. 1</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-20">
                <div className="md:col-span-8">
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
                        {data.name.split(" ").map((w, i) => <span key={i} className="block">{w}</span>)}
                    </h1>
                </div>
                <div className="md:col-span-4 flex flex-col justify-end">
                    <p className="text-xl md:text-2xl leading-relaxed font-medium">
                        {data.tagline}
                    </p>
                    <div className="mt-8 pt-8 border-t border-foreground">
                        <ul className="space-y-2">
                            {data.ticker.slice(0, 3).map((item, i) => (
                                <li key={i} className="flex justify-between text-sm uppercase font-bold tracking-wide">
                                    <span>0{i + 1}</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-end">
                <div className="w-full h-[200px] border-t-2 border-foreground mt-20 grid grid-cols-3">
                    <div className="border-r border-foreground p-4">Fig A.</div>
                    <div className="border-r border-foreground p-4">Fig B.</div>
                    <div className="p-4 bg-foreground text-background flex items-center justify-center font-bold text-4xl">
                        ★
                    </div>
                </div>
            </div>
        </section>
    )
}

// ----------------------------------------------------------------------
// 5. GRID/NEON LAYOUT (Neon, Game Dev, 3D Artist)
// ----------------------------------------------------------------------
function HeroGrid({ data }: HeroProps) {
    return (
        <section className="min-h-screen bg-background text-foreground p-8 flex flex-col justify-center relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(var(--primary)_1px,transparent_1px),linear-gradient(90deg,var(--primary)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 perspective-[500px]" style={{ transform: "perspective(500px) rotateX(60deg) translateY(-100px) scale(2)" }} />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="mb-4 inline-block px-4 py-1 border border-primary text-primary text-xs font-bold tracking-[0.2rem] shadow-[0_0_10px_var(--primary)]">
                    SYSTEM_OVERRIDE // AUTHORIZED
                </div>

                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground via-muted to-primary drop-shadow-[0_0_10px_var(--primary)]">
                    {data.name.toUpperCase()}
                </h1>

                <div className="mt-8 flex items-center gap-6">
                    <div className="w-32 h-1 bg-muted shadow-[0_0_15px_var(--muted)]" />
                    <p className="text-2xl md:text-3xl font-bold text-foreground max-w-xl shadow-black drop-shadow-md">
                        {data.tagline}
                    </p>
                </div>

                <div className="mt-12 flex gap-4 flex-wrap">
                    {data.ticker.map((item, i) => (
                        <div key={i} className="bg-primary/10 border border-primary px-6 py-2 rounded-sm clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px]">
                            <span className="text-sm font-bold tracking-wider">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function BackgroundGrain() {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    )
}
