"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme, themes, ThemeConfig } from "@/lib/themes";

interface ThemeContextType {
    theme: Theme;
    config: ThemeConfig;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("executive");

    useEffect(() => {
        const root = document.documentElement;
        const config = themes[theme];

        // Apply CSS Variables
        root.style.setProperty("--background", config.colors.background);
        root.style.setProperty("--foreground", config.colors.foreground);
        root.style.setProperty("--muted", config.colors.muted);
        root.style.setProperty("--primary", config.colors.primary);
        root.style.setProperty("--border", config.colors.border);
        root.style.setProperty("--radius", config.radius);

        // Apply Fonts (simplified for demo, usually done via classes)
        root.style.setProperty("--font-sans", config.fonts.sans);
        root.style.setProperty("--font-mono", config.fonts.mono);

    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, config: themes[theme], setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}
