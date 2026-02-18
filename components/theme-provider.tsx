"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
    const searchParams = useSearchParams();
    const [theme, setTheme] = useState<Theme>("executive");
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleMode = () => setIsDarkMode(!isDarkMode);

    // Sync theme from URL query param on mount/update
    useEffect(() => {
        const themeParam = searchParams.get("theme");
        if (themeParam && themeParam in themes) {
            setTheme(themeParam as Theme);
        }
    }, [searchParams]);

    useEffect(() => {
        const root = document.documentElement;
        const config = themes[theme];

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
