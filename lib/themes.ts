export type Theme =
    | "executive"
    | "engineer"
    | "creative"
    | "minimalist"
    | "neon"
    | "video_editor"
    | "3d_artist"
    | "graphic_designer"
    | "software_engineer"
    | "photographer"
    | "architect"
    | "fashion"
    | "musician"
    | "game_dev"
    | "academic";

export type LayoutType = "centered" | "split" | "asymmetric" | "grid" | "minimal" | "blueprint" | "print" | "journal" | "acoustic" | "darkroom" | "viewport" | "timeline";

export interface ThemeConfig {
    name: Theme;
    label: string;
    layout: LayoutType;
    colors: {
        background: string;
        foreground: string;
        muted: string;
        primary: string;
        border: string;
    };
    fonts: {
        sans: string;
        mono: string;
        heading: string;
    };
    physics: {
        stiffness: number;
        damping: number;
    };
    radius: string;
}

export const themes: Record<Theme, ThemeConfig> = {
    executive: {
        name: "executive",
        label: "Corporate Ethereal",
        layout: "centered",
        colors: {
            background: "#0a0a0a",
            foreground: "#fafafa",
            muted: "#a1a1aa",
            primary: "#ffffff",
            border: "rgba(255,255,255,0.08)",
        },
        fonts: {
            sans: "var(--font-inter)",
            mono: "var(--font-inter)",
            heading: "var(--font-inter)",
        },
        physics: { stiffness: 50, damping: 20 },
        radius: "0.75rem",
    },
    engineer: {
        name: "engineer",
        label: "Terminal Velocity",
        layout: "split",
        colors: {
            background: "#0c0c0c",
            foreground: "#22c55e",
            muted: "#15803d",
            primary: "#22c55e",
            border: "#14532d",
        },
        fonts: {
            sans: "monospace",
            mono: "monospace",
            heading: "monospace",
        },
        physics: { stiffness: 200, damping: 15 },
        radius: "0px",
    },
    creative: {
        name: "creative",
        label: "Chaos Theory",
        layout: "asymmetric",
        colors: {
            background: "#fff0f5",
            foreground: "#be185d",
            muted: "#831843",
            primary: "#be185d",
            border: "#fbcfe8",
        },
        fonts: {
            sans: "sans-serif",
            mono: "monospace",
            heading: "serif",
        },
        physics: { stiffness: 120, damping: 10 },
        radius: "1.5rem",
    },
    minimalist: {
        name: "minimalist",
        label: "Swiss Modern",
        layout: "minimal",
        colors: {
            background: "#ffffff",
            foreground: "#000000",
            muted: "#52525b",
            primary: "#ff0000", /* Red accent for Swiss Style */
            border: "#e4e4e7",
        },
        fonts: {
            sans: "var(--font-inter)",
            mono: "var(--font-inter)",
            heading: "var(--font-inter)",
        },
        physics: { stiffness: 80, damping: 25 },
        radius: "0px",
    },
    neon: {
        name: "neon",
        label: "Cyberpunk 2077",
        layout: "grid",
        colors: {
            background: "#050510",
            foreground: "#00f0ff",
            muted: "#b026ff",
            primary: "#fcee0a",
            border: "rgba(0, 240, 255, 0.2)",
        },
        fonts: {
            sans: "sans-serif",
            mono: "monospace",
            heading: "sans-serif",
        },
        physics: { stiffness: 300, damping: 20 },
        radius: "4px",
    },
    video_editor: {
        name: "video_editor",
        label: "Timeline Pro",
        layout: "timeline",
        colors: {
            background: "#1e1e1e",
            foreground: "#d4d4d4",
            muted: "#858585",
            primary: "#3b82f6", /* Blue for timeline selection */
            border: "#3f3f46",
        },
        fonts: {
            sans: "sans-serif",
            mono: "monospace",
            heading: "sans-serif",
        },
        physics: { stiffness: 90, damping: 15 },
        radius: "0.5rem",
    },
    "3d_artist": {
        name: "3d_artist",
        label: "Viewport Shading",
        layout: "viewport",
        colors: {
            background: "#2b2b2b", /* Blender dark gray */
            foreground: "#efefef",
            muted: "#9e9e9e",
            primary: "#ff8c00", /* Orange selection */
            border: "#444444",
        },
        fonts: {
            sans: "var(--font-inter)",
            mono: "monospace",
            heading: "var(--font-inter)",
        },
        physics: { stiffness: 70, damping: 18 },
        radius: "0.25rem",
    },
    graphic_designer: {
        name: "graphic_designer",
        label: "Print Ready",
        layout: "print",
        colors: {
            background: "#ffffff",
            foreground: "#000000",
            muted: "#9ca3af",
            primary: "#00ffff", /* Cyan */
            border: "#e5e7eb",
        },
        fonts: {
            sans: "sans-serif",
            mono: "sans-serif",
            heading: "sans-serif",
        },
        physics: { stiffness: 100, damping: 20 },
        radius: "0px",
    },
    software_engineer: {
        name: "software_engineer",
        label: "Dark IDE",
        layout: "split",
        colors: {
            background: "#282c34",
            foreground: "#abb2bf",
            muted: "#5c6370",
            primary: "#61afef",
            border: "#3e4451",
        },
        fonts: {
            sans: "var(--font-inter)",
            mono: "monospace",
            heading: "monospace",
        },
        physics: { stiffness: 150, damping: 18 },
        radius: "0.375rem",
    },
    photographer: {
        name: "photographer",
        label: "Darkroom",
        layout: "darkroom",
        colors: {
            background: "#000000",
            foreground: "#e5e5e5",
            muted: "#525252",
            primary: "#ef4444", /* Red light */
            border: "#262626",
        },
        fonts: {
            sans: "var(--font-inter)",
            mono: "var(--font-inter)",
            heading: "var(--font-inter)",
        },
        physics: { stiffness: 60, damping: 25 },
        radius: "0px",
    },
    architect: {
        name: "architect",
        label: "Blueprint",
        layout: "blueprint",
        colors: {
            background: "#0f3460", /* Blueprint blue */
            foreground: "#e2e2e2",
            muted: "#537895",
            primary: "#ffffff",
            border: "rgba(255,255,255,0.3)",
        },
        fonts: {
            sans: "sans-serif",
            mono: "monospace",
            heading: "sans-serif",
        },
        physics: { stiffness: 100, damping: 30 },
        radius: "0px",
    },
    fashion: {
        name: "fashion",
        label: "Editorial",
        layout: "asymmetric",
        colors: {
            background: "#171717",
            foreground: "#fafafa",
            muted: "#737373",
            primary: "#d4af37",
            border: "#404040",
        },
        fonts: {
            sans: "sans-serif",
            mono: "serif",
            heading: "serif",
        },
        physics: { stiffness: 60, damping: 40 },
        radius: "0px",
    },
    musician: {
        name: "musician",
        label: "Acoustic",
        layout: "acoustic",
        colors: {
            background: "#1a1a1a",
            foreground: "#e0e0e0",
            muted: "#666666",
            primary: "#1db954", /* Spotify-ish green or waveform color */
            border: "#333333",
        },
        fonts: {
            sans: "serif",
            mono: "monospace",
            heading: "serif",
        },
        physics: { stiffness: 80, damping: 25 },
        radius: "1rem",
    },
    game_dev: {
        name: "game_dev",
        label: "8-Bit Arcade",
        layout: "grid",
        colors: {
            background: "#201a30",
            foreground: "#00ff9f",
            muted: "#bd34fe",
            primary: "#ff0055",
            border: "#00ff9f",
        },
        fonts: {
            sans: "monospace",
            mono: "monospace",
            heading: "monospace",
        },
        physics: { stiffness: 200, damping: 10 },
        radius: "0px",
    },
    academic: {
        name: "academic",
        label: "Journal",
        layout: "journal",
        colors: {
            background: "#fdfbf7", /* Paper-like off-white */
            foreground: "#222222",
            muted: "#666666",
            primary: "#8b0000", /* Academic maroon */
            border: "#e0e0e0",
        },
        fonts: {
            sans: "serif",
            mono: "serif",
            heading: "serif",
        },
        physics: { stiffness: 60, damping: 35 },
        radius: "0.25rem",
    },
};
