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

                        <div className="flex justify-between items-end border-t border-border pt-12">
                            {/* Contact Email */}
                            {data.contact?.email && (
                                <div className="flex flex-col gap-2">
                                    <span className="text-muted text-sm">Contact</span>
                                    <a href={`mailto:${data.contact.email}`} className="text-xl hover:text-muted transition-colors">
                                        {data.contact.email}
                                    </a>
                                </div>
                            )}

                            {/* Phone & Address */}
                            <div className="flex flex-col gap-2">
                                {data.contact?.phone && (
                                    <>
                                        <span className="text-muted text-sm">Phone</span>
                                        <span className="text-xl">{data.contact.phone}</span>
                                    </>
                                )}
                                {data.contact?.address && (
                                    <>
                                        <span className="text-muted text-sm mt-2">Location</span>
                                        <span className="text-xl">{data.contact.address}</span>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-8">
                                {/* Social Links */}
                                {data.contact?.socials && data.contact.socials.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-muted text-sm">Socials</span>
                                        <div className="flex gap-4">
                                            {data.contact.socials.map((social: any, index: number) => (
                                                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-muted transition-colors">
                                                    {social.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="text-right">
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
