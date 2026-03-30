"use client";

import { useState, useEffect, useCallback } from "react";

type UIMode = "simple" | "visual" | "pro";

interface ModeSwitcherProps {
  onModeChange?: (mode: UIMode) => void;
}

export default function ModeSwitcher({ onModeChange }: ModeSwitcherProps) {
  const [currentMode, setCurrentMode] = useState<UIMode>("pro");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("apnabazaar-ui-mode") as UIMode;
    if (savedMode && savedMode !== currentMode) {
      setCurrentMode(savedMode);
    }
  }, []);

  const handleModeChange = useCallback((mode: UIMode) => {
    setCurrentMode(mode);
    localStorage.setItem("apnabazaar-ui-mode", mode);
    onModeChange?.(mode);
    setIsOpen(false);
  }, [onModeChange]);

  const modeConfig = {
    simple: {
      label: "Simple",
      icon: "👴",
      description: "Large buttons, high contrast",
      color: "bg-green-500",
    },
    visual: {
      label: "Visual",
      icon: "🖼️",
      description: "Image-focused navigation",
      color: "bg-blue-500",
    },
    pro: {
      label: "Pro",
      icon: "⚡",
      description: "Full-featured interface",
      color: "bg-indigo-600",
    },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90 ${modeConfig[currentMode].color}`}
        aria-label="Change UI mode"
      >
        <span className="text-lg">{modeConfig[currentMode].icon}</span>
        <span className="hidden sm:inline">{modeConfig[currentMode].label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">Choose Your Mode</h3>
              <p className="text-xs text-slate-500 mt-1">
                Select the interface that works best for you
              </p>
            </div>
            <div className="p-2">
              {(Object.keys(modeConfig) as UIMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeChange(mode)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all text-left ${
                    currentMode === mode
                      ? "bg-indigo-50 border-2 border-indigo-500"
                      : "hover:bg-slate-50 border-2 border-transparent"
                  }`}
                >
                  <span className="text-2xl">{modeConfig[mode].icon}</span>
                  <div>
                    <div className="font-semibold text-slate-800">
                      {modeConfig[mode].label}
                    </div>
                    <div className="text-xs text-slate-500">
                      {modeConfig[mode].description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
