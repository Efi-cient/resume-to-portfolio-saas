export type Theme = "executive" | "engineer" | "creative" | "minimalist" | "neon";

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
            mono: "var(--font-inter)", // Executive uses sans mainly
            heading: "var(--font-inter)",
        },
        physics: { stiffness: 50, damping: 20 },
        radius: "0.75rem", // rounded-xl
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
        physics: { stiffness: 200, damping: 15 }, // Snappy
        radius: "0px", // sharp
    },
    creative: {
        name: "creative",
        label: "Chaos Theory",
        colors: {
            background: "#fff0f5", // Lavender Blush
            foreground: "#be185d", // Pink 700
            muted: "#831843",      // Pink 900 (Darker for contrast)
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
            background: "#050510", // Deep Blue/Black
            foreground: "#00f0ff", // Neon Cyan
            muted: "#b026ff",      // Neon Purple
            primary: "#fcee0a",    // Neon Yellow
            border: "rgba(0, 240, 255, 0.2)",
        },
        fonts: {
            sans: "sans-serif",
            mono: "monospace",
            heading: "sans-serif",
        },
        physics: { stiffness: 300, damping: 20 },
        radius: "4px",
    }
};
