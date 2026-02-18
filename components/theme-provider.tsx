"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme, themes, ThemeConfig } from "@/lib/themes";

interface ThemeContextType {
    theme: Theme;
    config: ThemeConfig;
    setTheme: (theme: Theme) => void;
    toggleMode: () => void;
    isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("executive");
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleMode = () => setIsDarkMode(!isDarkMode);

    useEffect(() => {
        const root = document.documentElement;
        const config = themes[theme];

        // Determine colors based on mode override
        // If IS DARK (default), use config. If LIGHT, swap bg/fg roughly

        // For specific themes like Creative (light default), if we toggle "Dark Mode" (isDarkMode=true),
        // we effectively want the DEFAULT functionality.
        // Actually, "Creative" IS light. So isDarkMode = false should match default Creative.
        // Let's rely on the theme's default nature + simple swap if user requests inversion.

        // BETTER APPROACH: Just set properties. If toggle is pressed, invert.
        // We assume "isDarkMode" state tracks the *intended* brightness relative to the theme?
        // No, let's just make it a toggle that swaps BG and FG.

        if (isDarkMode) {
            root.style.setProperty("--background", config.colors.background);
            root.style.setProperty("--foreground", config.colors.foreground);
        } else {
            // Inverted Mode
            root.style.setProperty("--background", config.colors.foreground);
            root.style.setProperty("--foreground", config.colors.background);
        }

        root.style.setProperty("--muted", config.colors.muted);
        root.style.setProperty("--primary", config.colors.primary);
        root.style.setProperty("--border", config.colors.border);
        root.style.setProperty("--radius", config.radius);

        // Apply Fonts (simplified for demo, usually done via classes)
        root.style.setProperty("--font-sans", config.fonts.sans);
        root.style.setProperty("--font-mono", config.fonts.mono);

    }, [theme, isDarkMode]);

    return (
        <ThemeContext.Provider value={{ theme, config: themes[theme], setTheme, toggleMode, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}
