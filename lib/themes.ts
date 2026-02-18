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

export interface ThemeConfig {
    name: Theme;
    label: string;
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
        colors: {
            background: "#0a0a0a", // Zinc 950
            foreground: "#fafafa", // Zinc 50
            muted: "#a1a1aa",      // Zinc 400
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
        colors: {
            background: "#0c0c0c",
            foreground: "#22c55e", // Green 500
            muted: "#15803d",      // Green 700
            primary: "#22c55e",
            border: "#14532d",     // Green 900
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
        colors: {
            background: "#fff0f5", // Lavender Blush
            foreground: "#be185d", // Pink 700
            muted: "#831843",      // Pink 900
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
        colors: {
            background: "#ffffff",
            foreground: "#000000",
            muted: "#52525b", // Zinc 600
            primary: "#000000",
            border: "#e4e4e7", // Zinc 200
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
        colors: {
            background: "#1e1e1e",
            foreground: "#d4d4d4",
            muted: "#858585",
            primary: "#a855f7", // Purple
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
        colors: {
            background: "#2d2d2d",
            foreground: "#e0e0e0",
            muted: "#a3a3a3",
            primary: "#f97316", // Orange
            border: "#404040",
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
        colors: {
            background: "#ffffff",
            foreground: "#000000",
            muted: "#9ca3af",
            primary: "#06b6d4", // Cyan
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
        colors: {
            background: "#282c34",
            foreground: "#abb2bf",
            muted: "#5c6370",
            primary: "#61afef", // Blue
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
        colors: {
            background: "#000000",
            foreground: "#e5e5e5",
            muted: "#525252",
            primary: "#ef4444", // Red
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
        colors: {
            background: "#f0f4f8",
            foreground: "#1e293b",
            muted: "#64748b",
            primary: "#3b82f6", // Blue
            border: "#cbd5e1",
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
        colors: {
            background: "#171717",
            foreground: "#fafafa",
            muted: "#737373",
            primary: "#d4af37", // Gold
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
        colors: {
            background: "#2a2422",
            foreground: "#efeae5",
            muted: "#a8a29e",
            primary: "#d97706", // Amber
            border: "#57534e",
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
        colors: {
            background: "#fcfbf7",
            foreground: "#292524",
            muted: "#78716c",
            primary: "#78350f", // Brown
            border: "#e7e5e4",
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
