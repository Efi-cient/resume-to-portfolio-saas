"use client";

import { X, Globe, Server, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface DomainGuideModalProps {
    onClose: () => void;
}

export function DomainGuideModal({ onClose }: DomainGuideModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <GlassCard className="w-full max-w-2xl bg-[#0a0a0a] border-zinc-800 text-zinc-50 relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-zinc-400" />
                </button>

                <div className="p-8">
                    <h2 className="text-3xl font-bold tracking-tighter mb-2">Connect Custom Domain</h2>
                    <p className="text-zinc-400 mb-8">Follow these steps to link your own URL (e.g., alexsterling.com) via Vercel.</p>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                <Server className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">1. Deploy Project</h3>
                                <p className="text-sm text-zinc-400">
                                    Click the <span className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">Deploy</span> button in this builder. This creates a live project on Vercel (free).
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                                <Globe className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">2. Add Domain in Vercel</h3>
                                <p className="text-sm text-zinc-400 mb-2">
                                    Go to your Vercel Dashboard → Select Project → Settings → Domains.
                                </p>
                                <div className="bg-black border border-zinc-800 rounded p-3 text-xs font-mono text-zinc-300">
                                    Input: yourname.com
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">3. Update DNS</h3>
                                <p className="text-sm text-zinc-400">
                                    Log in to your domain provider (GoDaddy, Namecheap) and add the A Record / CNAME provided by Vercel.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
