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
        case "blueprint": return <HeroBlueprint data={data} />;
        case "print": return <HeroPrint data={data} />;
        case "journal": return <HeroJournal data={data} />;
        case "acoustic": return <HeroAcoustic data={data} />;
        case "darkroom": return <HeroDarkroom data={data} />;
        case "viewport": return <HeroViewport data={data} />;
        case "timeline": return <HeroTimeline data={data} />;
        default: return <HeroCentered data={data} />;
    }
}

// ----------------------------------------------------------------------
// 1. CENTERED LAYOUT (Executive, Photographer, Musician)
// ----------------------------------------------------------------------
interface HeroInnerProps {
    data: typeof defaultResumeData;
}

function HeroCentered({ data }: HeroInnerProps) {
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
function HeroSplit({ data }: HeroInnerProps) {
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
function HeroAsymmetric({ data }: HeroInnerProps) {
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
// 4. MINIMAL LAYOUT / SWISS (Swiss Modern) - Grid Systems, Typography, Red Accent
// ----------------------------------------------------------------------
function HeroMinimal({ data }: HeroInnerProps) {
    return (
        <section className="min-h-screen bg-[#e8e8e8] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#e8e8e8] transition-colors duration-500 p-0 relative overflow-hidden group">
            {/* Grid Overlay */}
            <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none px-4 md:px-12 opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-full border-r border-current hidden md:block first:border-l" />
                ))}
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between px-4 md:px-12 py-12">
                {/* Header Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-3">
                        <div className="w-12 h-12 bg-[#ff0000] rounded-full mb-4 group-hover:bg-[#e8e8e8] transition-colors" />
                        <span className="font-bold text-sm tracking-tight block">International Typographic Style</span>
                        <span className="text-xs block opacity-70">Basel, 1950</span>
                    </div>
                    <div className="md:col-span-9">
                        <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter transition-colors">
                            {data.name.split(" ")[0]}
                        </h1>
                        <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-right transition-colors">
                            {data.name.split(" ")[1]}
                        </h1>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-12 md:mt-0">
                    <div className="md:col-span-4 md:col-start-2">
                        <p className="text-2xl md:text-4xl font-medium leading-tight">
                            {data.tagline}
                        </p>
                    </div>
                    <div className="md:col-span-3 md:col-start-9 md:self-end">
                        <ul className="border-t-4 border-current pt-4">
                            {data.ticker.slice(0, 3).map((item, i) => (
                                <li key={i} className="flex justify-between text-lg font-bold py-1 border-b border-current/20">
                                    <span>0{i + 1}</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ----------------------------------------------------------------------
// 6. BLUEPRINT LAYOUT (Architect) - Grid, measurements, technical
// ----------------------------------------------------------------------
function HeroBlueprint({ data }: HeroInnerProps) {
    return (
        <section className="min-h-screen bg-background text-foreground group hover:bg-foreground hover:text-background transition-colors duration-500 overflow-hidden relative font-mono">
            {/* Blueprint Grid Background */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none group-hover:opacity-[0.1] transition-opacity"
                style={{
                    backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}
            />
            {/* Major Grid Lines */}
            <div className="absolute inset-0 opacity-[0.2] pointer-events-none group-hover:opacity-[0.15] transition-opacity"
                style={{
                    backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            />

            <div className="p-8 md:p-16 h-screen flex flex-col relative z-10">
                {/* Top Technical Header */}
                <div className="flex justify-between items-start border-b border-muted pb-4 mb-12">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-widest text-muted group-hover:text-background/70">Project Ref</span>
                        <span className="text-sm font-bold">ARC-2026-X</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-xs uppercase tracking-widest text-muted group-hover:text-background/70">Scale</span>
                        <span className="text-sm font-bold">1:50</span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col justify-center relative">
                    {/* Measurement Lines (Decorative) */}
                    <div className="absolute left-[-20px] top-0 bottom-0 w-[1px] bg-muted/50 hidden md:block">
                        <div className="absolute top-0 left-[-4px] w-[9px] h-[1px] bg-muted/50" />
                        <div className="absolute bottom-0 left-[-4px] w-[9px] h-[1px] bg-muted/50" />
                        <span className="absolute top-[50%] left-[-30px] -rotate-90 text-[10px] text-muted origin-center">HEIGHT: 100VH</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-normal tracking-tight leading-[0.8] mb-8">
                        {data.name.toUpperCase()}
                    </h1>
                    <div className="w-[100px] h-[2px] bg-primary mb-8 ml-2" />
                    <p className="text-xl md:text-2xl font-light text-muted-foreground group-hover:text-background/80 max-w-2xl ml-2">
                        {data.tagline}
                    </p>
                </div>

                {/* Footer specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-muted pt-4 mt-auto">
                    {data.ticker.map((item, i) => (
                        <div key={i} className="flex flex-col">
                            <span className="text-[10px] uppercase text-muted group-hover:text-background/60">Spec 0{i + 1}</span>
                            <span className="text-sm font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 7. PRINT LAYOUT (Graphic Designer) - CMYK, Crop marks, Readable Text
// ----------------------------------------------------------------------
function HeroPrint({ data }: HeroInnerProps) {
    return (
        <section className="min-h-screen bg-white text-black group hover:bg-black hover:text-white transition-colors duration-300 overflow-hidden relative flex flex-col justify-center items-center">
            {/* Crop Marks - Fixed Contrast */}
            <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-current" />
            <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-current" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-current" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-current" />

            {/* Content */}
            <div className="max-w-4xl text-center relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block mb-6 px-4 py-1 border border-current rounded-full text-xs font-bold uppercase tracking-widest"
                >
                    Proof v.3
                </motion.div>
                {/* Mix blend removed for readability, using standard color inversion */}
                <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-6">
                    {data.name}
                </h1>
                <p className="text-2xl md:text-3xl font-medium tracking-tight opacity-80">
                    {data.tagline}
                </p>
            </div>

            {/* Color Bars (CMYK) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#00FFFF] mix-blend-multiply group-hover:mix-blend-normal" />
                <div className="w-6 h-6 rounded-full bg-[#FF00FF] mix-blend-multiply group-hover:mix-blend-normal" />
                <div className="w-6 h-6 rounded-full bg-[#FFFF00] mix-blend-multiply group-hover:mix-blend-normal" />
                <div className="w-6 h-6 rounded-full bg-black group-hover:bg-white border border-current" />
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 8. JOURNAL LAYOUT (Academic) - Serif, Footnotes, Paper Texture
// ----------------------------------------------------------------------
function HeroJournal({ data }: HeroInnerProps) {
    return (
        <section className="min-h-screen bg-[#fdfbf7] text-[#222] group py-16 px-8 md:px-24 flex flex-col font-serif relative">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-50 pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
            />

            {/* Header / Meta - Minimal Academic Style */}
            <div className="border-b-[1px] border-[#222] pb-2 mb-12 flex justify-between items-end">
                <div className="text-xs uppercase tracking-widest font-sans opacity-60">
                    PROCEEDINGS OF T.H.E. PORTFOLIO • VOL 26
                </div>
                <div className="text-right text-xs font-sans opacity-60">
                    doi:10.1038/nature{new Date().getFullYear()}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1">
                {/* Title Section */}
                <div className="md:col-span-12 mb-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 tracking-tight">
                        {data.tagline}
                    </h1>
                    <div className="text-lg italic text-[#555] mb-8 font-serif">
                        By {data.name}, Principal Researcher
                    </div>
                </div>

                {/* Left Column (Abstract) */}
                <div className="md:col-span-4 md:col-start-3 text-justify text-sm leading-relaxed border-t border-b border-[#eee] py-4">
                    <strong className="block text-xs font-sans uppercase mb-2 tracking-widest">Abstract</strong>
                    <p>
                        This portfolio illustrates the methodology and results of applying advanced {data.skills.technical?.[0] || "engineering"} principles to modern problems.
                        Results indicate a significant improvement in user engagement and system efficiency.
                    </p>
                </div>

                {/* Right Column (Intro) */}
                <div className="md:col-span-4 text-justify text-sm leading-relaxed border-t border-b border-[#eee] py-4">
                    <strong className="block text-xs font-sans uppercase mb-2 tracking-widest">Core Competencies</strong>
                    <p>
                        The study utilizes a multi-modal approach involving {data.ticker.slice(0, 3).join(", ")}.
                        These frameworks provide a robust foundation for scalable architecture and design systems.
                    </p>
                </div>
            </div>

            {/* Footnotes */}
            <div className="mt-auto border-t border-[#ccc] pt-4 text-[10px] text-[#666] grid grid-cols-2 gap-4">
                <div>1. Correspondence should be addressed to {data.name.split(" ")[0]} (2026).</div>
                <div className="text-right">Received {new Date().toLocaleDateString()}; Accepted for publication.</div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 9. ACOUSTIC LAYOUT (Musician) - Audio, Warm, Waveforms
// ----------------------------------------------------------------------
function HeroAcoustic({ data }: HeroInnerProps) {
    return (
        <section className="min-h-screen bg-[#1a1a1a] text-[#e0e0e0] flex flex-col justify-center items-center relative overflow-hidden font-mono">
            {/* Background Studio Noise/Texture */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {/* Center Dial / Visualizer */}
            <div className="relative z-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-[#333] flex items-center justify-center group cursor-pointer hover:border-[#1db954] transition-colors duration-500">
                <div className="absolute inset-0 border border-[#333] rounded-full transform scale-[0.8]" />
                <div className="absolute inset-0 border border-[#333] rounded-full transform scale-[1.2] opacity-30" />

                {/* Simulated Waveform Bars */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-50 group-hover:opacity-80 transition-opacity">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [20, 60 + Math.random() * 100, 20] }}
                            transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
                            className="w-1 md:w-2 bg-[#1db954] rounded-full"
                        />
                    ))}
                </div>

                <div className="text-center z-20 bg-[#1a1a1a]/80 backdrop-blur-md p-6 rounded-full w-[200px] h-[200px] flex flex-col justify-center items-center border border-[#333]">
                    <span className="text-[#1db954] text-xs uppercase tracking-widest mb-2">Now Recording</span>
                    <h1 className="text-2xl font-bold font-serif italic text-white">{data.name}</h1>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-12 w-full max-w-2xl px-8 flex flex-col gap-4">
                <div className="flex justify-between text-xs text-[#666] uppercase tracking-widest">
                    <span>L channel</span>
                    <span>02:43 / 04:00</span>
                    <span>R channel</span>
                </div>
                <div className="h-1 bg-[#333] rounded-full overflow-hidden w-full">
                    <div className="h-full bg-[#1db954] w-[65%]" />
                </div>
                <p className="text-center text-[#999] text-sm mt-4">{data.tagline}</p>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 10. DARKROOM LAYOUT (Photographer) - Film Strips, Red Light
// ----------------------------------------------------------------------
function HeroDarkroom({ data }: HeroInnerProps) {
    return (
        <section className="min-h-screen bg-black text-[#e5e5e5] flex flex-col justify-center overflow-hidden relative font-sans group">
            {/* Red "Safe Light" Overlay on Hover */}
            <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />

            {/* Film Strip Container */}
            <div className="flex gap-4 opacity-50 rotate-[-2deg] scale-110 blur-[2px] group-hover:blur-0 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-700 ease-out">
                {/* Repeating Film Frames */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-[300px] h-[200px] border-y-8 border-black bg-[#111] relative flex items-center justify-center shrink-0">
                        {/* Sprocket holes */}
                        <div className="absolute top-[-6px] left-2 w-2 h-3 bg-white/20 rounded-sm" />
                        <div className="absolute bottom-[-6px] left-2 w-2 h-3 bg-white/20 rounded-sm" />
                        <span className="text-[#333] font-bold text-4xl select-none">IMG_{i + 100}</span>
                    </div>
                ))}
            </div>

            <div className="relative z-30 mt-[-50px] ml-[10vw] mix-blend-difference">
                <h1 className="text-9xl font-black tracking-tighter text-white uppercase">{data.name.split(" ")[0]}</h1>
                <h1 className="text-9xl font-black tracking-tighter text-transparent stroke-white border-white bg-clip-text" style={{ WebkitTextStroke: "2px white" }}>
                    {data.name.split(" ")[1]}
                </h1>
                <div className="mt-8 flex items-center gap-4">
                    <span className="w-4 h-4 rounded-full bg-red-600 animate-pulse border border-red-400" />
                    <span className="text-xs uppercase tracking-[0.5em] text-red-500">Live Exposure</span>
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 11. VIEWPORT LAYOUT (3D Artist) - Gizmos, Wireframe, Blender-style
// ----------------------------------------------------------------------
function HeroViewport({ data }: HeroInnerProps) {
    return (
        <section className="min-h-screen bg-[#2b2b2b] text-[#efefef] flex flex-col relative font-sans overflow-hidden">
            {/* Tool Header */}
            <div className="h-8 bg-[#1f1f1f] border-b border-[#111] w-full flex items-center px-4 text-xs text-[#999] gap-4">
                <span>File</span><span>Edit</span><span>Render</span><span>Window</span><span>Help</span>
                <span className="ml-auto text-[#666]">Scene v2.4.1</span>
            </div>

            {/* Main Viewport */}
            <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-[#3a3a3a] to-[#282828] p-8">
                {/* 3D Grid Floor */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) scale(2)' }}
                />

                {/* Object Gizmo */}
                <div className="relative group cursor-move">
                    {/* Z-Axis */}
                    <div className="absolute bottom-1/2 left-1/2 w-1 h-32 bg-blue-500 -translate-x-1/2 origin-bottom" />
                    {/* Y-Axis */}
                    <div className="absolute bottom-1/2 left-1/2 w-32 h-1 bg-green-500 -translate-y-1/2 origin-left rotate-[-45deg]" />

                    <h1 className="text-6xl md:text-8xl font-bold relative z-10 text-[#ff8c00] drop-shadow-xl border-2 border-[#ff8c00] p-8 rounded-lg bg-[#2b2b2b]/50 backdrop-blur-sm">
                        {data.name}
                    </h1>
                    <div className="absolute -top-4 -left-4 text-[#ff8c00] text-xs">Selected (1)</div>
                </div>

                {/* Viewport Overlay UI */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="w-12 h-12 bg-[#333] rounded-full border border-[#444] shadow-lg flex items-center justify-center">X</div>
                    <div className="w-12 h-12 bg-[#333] rounded-full border border-[#444] shadow-lg flex items-center justify-center">Y</div>
                    <div className="w-12 h-12 bg-[#333] rounded-full border border-[#444] shadow-lg flex items-center justify-center">Z</div>
                </div>

                <div className="absolute bottom-8 left-8 text-xs font-mono text-[#888]">
                    Verts: 2,045,190 | Faces: 1,844,203 | Tris: 3,450,222
                </div>
            </div>

            {/* Timeline Bottom Strip */}
            <div className="h-32 bg-[#1f1f1f] border-t border-[#111] relative p-2 hidden md:block">
                <div className="w-full h-full bg-[#252525] rounded border border-[#333] relative overflow-hidden">
                    {/* Keyframes */}
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="absolute top-0 bottom-0 w-[1px] bg-[#333]" style={{ left: `${i * 2}%` }} />
                    ))}
                    <div className="absolute top-0 bottom-0 w-[2px] bg-[#ff8c00] left-[30%]" />
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 12. TIMELINE LAYOUT (Video Editor) - Non-linear editor style
// ----------------------------------------------------------------------
function HeroTimeline({ data }: HeroInnerProps) {
    return (
        <section className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] flex flex-col justify-center font-sans">
            {/* Preview Monitor */}
            <div className="flex-1 flex items-center justify-center p-8 bg-[#000]">
                <div className="aspect-video w-full max-w-4xl bg-[#111] flex flex-col items-center justify-center border border-[#333] relative overflow-hidden group">
                    <span className="absolute top-4 right-4 text-green-500 text-xs font-mono">REC [ ● ]</span>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                        {data.name}
                    </h1>
                    <p className="text-[#aaa] text-xl font-light tracking-wide">{data.tagline}</p>

                    {/* Safe Margins Overlay */}
                    <div className="absolute inset-8 border border-[#333] opacity-50 pointer-events-none" />
                    <div className="absolute inset-16 border border-[#333] opacity-30 pointer-events-none" />
                </div>
            </div>

            {/* Timeline Controls */}
            <div className="h-[40vh] bg-[#222] border-t border-[#333] flex flex-col">
                <div className="h-8 bg-[#2a2a2a] border-b border-[#333] flex items-center px-4 justify-between">
                    <div className="flex gap-1">
                        <span className="text-[#3b82f6]">00:00:14:23</span>
                        <span className="text-[#666]">/</span>
                        <span className="text-[#888]">00:01:00:00</span>
                    </div>
                </div>

                {/* Tracks */}
                <div className="flex-1 p-2 space-y-1 overflow-y-auto">
                    {/* Track V1 */}
                    <div className="h-16 bg-[#2a2a2a] relative flex items-center pl-24 border border-[#333]">
                        <span className="absolute left-2 text-xs font-bold text-[#666]">V1</span>
                        <div className="w-[40%] bg-[#3b82f6] h-[80%] rounded-sm border border-blue-400/30 flex items-center px-2 truncate text-xs text-white">
                            Intro_Sequence_Final.mp4
                        </div>
                        <div className="w-[30%] bg-[#3b82f6] h-[80%] rounded-sm border border-blue-400/30 ml-1 flex items-center px-2 truncate text-xs text-white opacity-80">
                            Montage.mp4
                        </div>
                    </div>
                    {/* Track A1 */}
                    <div className="h-16 bg-[#2a2a2a] relative flex items-center pl-24 border border-[#333]">
                        <span className="absolute left-2 text-xs font-bold text-[#666]">A1</span>
                        <div className="w-[80%] bg-[#10b981] h-[80%] rounded-sm border border-green-400/30 flex items-center px-2 truncate text-xs text-white">
                            Background_Music_v3.wav
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 5. GRID/NEON LAYOUT (Neon, Game Dev, 3D Artist)
// ----------------------------------------------------------------------
function HeroGrid({ data }: HeroInnerProps) {
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
