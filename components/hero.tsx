"use client";

import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import defaultResumeData from "@/data/resume.json";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

interface HeroProps {
    data?: typeof defaultResumeData;
}

export function Hero({ data = defaultResumeData }: HeroProps) {
    const { theme } = useTheme();

    if (theme === "engineer") return <HeroEngineer data={data} />;
    if (theme === "creative") return <HeroCreative data={data} />;
    return <HeroExecutive data={data} />;
}

// ==========================================
// 1. EXECUTIVE THEME (Original)
// ==========================================
function HeroExecutive({ data }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 50 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    function handleMouseMove(e: React.MouseEvent) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth) * 2 - 1;
        const y = (clientY / innerHeight) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
    }

    const tickerVariants = {
        animate: {
            x: [0, -1000],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop" as const,
                    duration: 30,
                    ease: "linear" as const,
                },
            },
        },
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[90vh] flex flex-col justify-center items-start overflow-hidden px-8 md:px-16 pt-20"
        >
            <div className="z-10 w-full max-w-[90vw]">
                <motion.h1
                    className="text-[10vw] leading-[0.9] font-bold tracking-tighter text-foreground select-none"
                    style={{
                        textShadow: useTransform(
                            smoothMouseX,
                            [-1, 1],
                            ["-10px 10px 20px var(--border)", "10px 10px 20px var(--border)"]
                        ),
                    }}
                >
                    {data.name.split(" ").map((word, i) => (
                        <span key={i} className="block">
                            {word}
                        </span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-8 text-2xl md:text-3xl font-light text-muted max-w-2xl"
                >
                    {data.tagline}
                </motion.p>
            </div>

            <div className="absolute bottom-20 left-0 w-full overflow-hidden border-t border-b border-border py-4 bg-background/5 backdrop-blur-sm">
                <motion.div
                    className="flex whitespace-nowrap gap-16 items-center"
                    variants={tickerVariants}
                    animate="animate"
                >
                    {[...data.ticker, ...data.ticker, ...data.ticker].map((item, i) => (
                        <span key={i} className="text-lg font-medium tracking-wide text-muted uppercase">
                            {item}
                        </span>
                    ))}
                </motion.div>
            </div>
            <BackgroundGrain />
        </section>
    );
}

// ==========================================
// 2. ENGINEER THEME (Terminal)
// ==========================================
function HeroEngineer({ data }: HeroProps) {
    const [text, setText] = useState("");
    // Use data.tagline if checking for empty
    const fullText = `> INIT SYSTEM_BOOT\n> LOAD MODULE: ${data.name.toUpperCase()}\n> STATUS: ${data.tagline}`;

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <section className="min-h-[90vh] flex flex-col justify-center p-8 md:p-16 font-mono text-green-500 bg-black relative overflow-hidden">
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat" />

            <div className="z-30 border-l-2 border-green-500/50 pl-6 ml-4">
                <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter opacity-90">
                    {data.name}
                </h1>
                <div className="text-xl md:text-2xl whitespace-pre-line min-h-[120px] opacity-80">
                    {text}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-3 h-6 bg-green-500 ml-1 align-middle"
                    />
                </div>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
                {data.ticker.slice(0, 4).map((item, i) => (
                    <div key={i} className="border border-green-500/30 p-2 text-xs uppercase">
                        [SYS_VAR_{i}]: {item}
                    </div>
                ))}
            </div>
        </section>
    )
}

// ==========================================
// 3. CREATIVE THEME (Brutalist)
// ==========================================
function HeroCreative({ data }: HeroProps) {
    return (
        <section className="min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-[#fff0f5] relative">
            {/* Spinning Decoration */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] border-[2px] border-pink-300 rounded-full border-dashed opacity-50"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] border-[2px] border-pink-400 rounded-full border-dotted opacity-50"
            />

            <div className="relative z-10 text-center mix-blend-multiply">
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[12vw] font-black leading-none text-pink-600 tracking-tighter"
                    style={{ WebkitTextStroke: "2px #be185d", color: "transparent" }}
                >
                    {data.name.split(" ")[0]}
                </motion.h1>
                <motion.h1
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[12vw] font-black leading-none text-pink-700 -mt-[4vw] ml-[10vw]"
                >
                    {data.name.split(" ")[1]}
                </motion.h1>

                <motion.div
                    className="mt-12 bg-pink-500 text-white p-6 rotate-[-2deg] inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-2 transition-transform"
                >
                    <p className="text-2xl font-bold font-serif italic">{data.tagline}</p>
                </motion.div>
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
