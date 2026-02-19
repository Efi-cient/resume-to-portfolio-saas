"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import defaultResumeData from "@/data/resume.json";

interface FooterProps {
    data?: typeof defaultResumeData;
}

export function Footer({ data = defaultResumeData }: FooterProps) {
    return (
        <div
            className="relative h-[800px]"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
                <div className="sticky top-[calc(100vh-800px)] h-[800px]">
                    <footer className="h-full bg-background flex flex-col justify-between p-12 md:p-24 text-foreground">
                        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
                            <div className="max-w-2xl mt-24 md:mt-32">
                                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl">
                                    Ready to scale your vision?
                                </h2>
                                <button className="group flex items-center gap-4 text-2xl border-b border-foreground pb-2 hover:border-muted transition-colors">
                                    Schedule Consultation
                                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between md:items-end border-t border-border pt-12 gap-12 md:gap-0">
                            {/* Contact Email */}
                            {data.contact?.email && (
                                <div className="flex flex-col gap-2">
                                    <span className="text-muted text-sm uppercase tracking-widest">Contact</span>
                                    <a href={`mailto:${data.contact.email}`} className="text-xl md:text-2xl hover:text-muted transition-colors break-all">
                                        {data.contact.email}
                                    </a>
                                </div>
                            )}

                            {/* Phone & Address */}
                            <div className="flex flex-col gap-6">
                                {data.contact?.phone && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-muted text-sm uppercase tracking-widest">Phone</span>
                                        <span className="text-xl">{data.contact.phone}</span>
                                    </div>
                                )}
                                {data.contact?.address && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-muted text-sm uppercase tracking-widest">Location</span>
                                        <span className="text-xl">{data.contact.address}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-row md:flex-col gap-8 md:gap-8 justify-between md:justify-end">
                                {/* Social Links */}
                                {data.contact?.socials && data.contact.socials.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-muted text-sm uppercase tracking-widest">Socials</span>
                                        <div className="flex flex-wrap gap-4">
                                            {data.contact.socials.map((social: any, index: number) => (
                                                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-muted transition-colors text-lg">
                                                    {social.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="md:text-right self-end md:self-auto">
                                    <p className="text-muted text-sm">
                                        © {new Date().getFullYear()} {data.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
