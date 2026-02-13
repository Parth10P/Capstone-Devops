import React, { createContext, useContext, useState, ReactNode } from "react";
import { translations } from "@/data/products";

export type UIMode = "simple" | "visual" | "pro";
export type Language = "en" | "hi";

interface AppContextType {
  mode: UIMode;
  setMode: (mode: UIMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<UIMode>("pro");
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <AppContext.Provider value={{ mode, setMode, language, setLanguage, t }}>
      <div className={`mode-${mode}`}>{children}</div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
